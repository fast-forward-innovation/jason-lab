import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./calc.css";
import data from "../../data/bmi.yml";

export const Bmi = () => {
  return (
    <>
      <div className="form-item mb-2">
        <label htmlFor="height">Height</label>
        <Field type="textbox" name="height" />
        <ErrorMessage name="height" component="div" />
      </div>

      <div className="form-item mb-2">
        <label htmlFor="weight">Weight</label>
        <Field type="textbox" name="weight" />
        <ErrorMessage name="weight" component="div" />
      </div>
    </>
  );
};
