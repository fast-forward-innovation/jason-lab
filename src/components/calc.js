import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./calc.css";

export const Calc = () => (
  <div>
    <Formik
      initialValues={{
        valueOne: "",
        valueTwo: "",
      }}
      validate={values => {
        const errors = {};
        if (!values.valueOne) {
          errors.valueOne = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-item mb-2">
            <label htmlFor="valueOne">Value One</label>
            <Field type="text" name="valueOne" label="Value One" />
            <ErrorMessage name="valueOne" component="div" />
          </div>
          <div className="form-item mb-2">
            <label htmlFor="valueTwo">Value Two</label>
            <Field type="text" name="valueTwo" />
            <ErrorMessage name="text" component="div" />
          </div>
          <div className="form-item mb-2">
            <label htmlFor="valueThree">Value Three</label>
            <Field type="text" name="valueThree" />
            <ErrorMessage name="text" component="div"/>
          </div>
          <div className="form-item mb-2">
            <label htmlFor="valueThree">Value Three</label>
            <Field type="text" name="valueThree" />
            <ErrorMessage name="text" component="div" />
          </div>
          <div className="form-item">
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);
