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

  const steps = Object.entries(data)

  let initialValues = {}

  data.forEach((field) => {
    field.id = convertToSlug(field.name)
    initialValues[field.id] = field.initialValue
  })

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


            { steps.map(([key, field]) => (
<>
                  <div key={ key } className="form-item mb-2">
                    <label htmlFor={ field.id }>{ parse(field.label) }</label>
                    <Field type="checkbox" name={ field.id } />
                    <ErrorMessage name={ field.id } component="div" />
                  </div>
                  <Box sx={{ mb: 2 }}>
                  <div>
  

                    
                  </div>
                </Box>
                </>
            ))}

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