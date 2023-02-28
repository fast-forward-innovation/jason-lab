import React from "react";
import PropTypes from "prop-types";
import { useFormikContext, Formik, Form, Field, ErrorMessage } from "formik";
import "./calc.css";
import data from "../../data/calc.yml"
import { Bmi } from "./bmi";
import parse from 'html-react-parser';
import { StepLabel, Stepper, Step, StepContent, Box, Button, Typography } from "@mui/material";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

console.log(data)
export const Calc = () => {
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  data.forEach((field) => {
    field.id = convertToSlug(field.name)
    initialValues[field.id] = field.initialValue
  })
  
  const groups = ((data) => {
    let groups = [];
    Object.entries(data).forEach((value, index) => {
      const groupId = value.group
      groups[groupId] = groups[groupId] || []
      groups[groupId].push(value)
    })
    return groups
  })()

  let initialValues = {}

  function convertToSlug(Text) {
    return Text.toLowerCase()
               .replace(/[^\w ]+/g, '')
               .replace(/ +/g, '-')
  }

  console.log(initialValues)


  return (
    <>

    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors = {};
        // if (!values.valueOne) {
        //   errors.valueOne = "Required";
        // }
        return errors;
      }}
      onSubmit={async (values) => {
        await sleep(500);
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ isSubmitting }) => (

        <Form>

          <div className="flex">
            <div className="flex-1">

            <Stepper nonlinear activeStep={activeStep} orientation="vertical">
            { steps.map(([key, field]) => (
              <Step key={key} completed={completed[key]}>
                <StepLabel>{parse(field.name)}</StepLabel>
                <StepContent>
                  <div key={ key } className="form-item mb-2">
                    <label htmlFor={ field.id }>{ parse(field.label) }</label>
                    <Field type="checkbox" name={ field.id } />
                    <ErrorMessage name={ field.id } component="div" />
                  </div>
                  <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {key === data.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={key === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button onClick={handleComplete}>
                          {completedSteps() === totalSteps() - 1
                            ? 'Finish'
                            : 'Complete Step'}
                        </Button>
                      ))}
                  </div>
                </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>

            <Bmi></Bmi>
            <div className="form-item">
              <button type="submit">
                Submit
              </button>
            </div>
          </div>
          <div className="flex-1">
            <Results />
          </div>
          </div>

        </Form>
        )}

    </Formik>


    </>


)}

const Results = () => {
  const { values, submitForm } = useFormikContext();


  return (
    <code><pre>
    Values
    { JSON.stringify(values, null, 2) }  
  </pre></code>
  )
}