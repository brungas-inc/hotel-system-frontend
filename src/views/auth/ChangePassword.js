import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Button,
} from "@material-tailwind/react";

import { Formik } from "formik";
import InputField from "../../components/InputField";
import Alert from "../../components/Alert";
import { useRef } from "react";
import ProgressIndicator from "../../components/ProgressIndicator";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, TAILWIND_COLORS } from "../../utils/constants";
import { reportErrors } from "../../utils/helpers";

const ChangePassword = ({ hide }) => {
  const alert = useRef();
  const submitPasswordChange = (isSubmitting, data) => {
    isSubmitting(true);
    window.axios
      .post(`${BASE_URL}auth/change-password`, data)
      .then((response) => {
        alert.current.showSuccess("Password Changed Successfully..");
        setTimeout(() => {
          hide();
        }, 1000);
      })
      .catch((error) => reportErrors(alert.current, error));
  };
  return (
    <Card className="m-auto w-100">
      <CardBody>
        <Alert ref={alert} />
        <Formik
          initialValues={{ oldPassword: "", password: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.oldPassword) {
              errors.oldPassword = "Old Password is Required";
            }
            if (!values.password) {
              errors.password = "Password is Required";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) =>
            submitPasswordChange(setSubmitting, values)
          }
        >
          {({
            values,

            errors,

            handleChange,

            handleBlur,

            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="block mt-5">
                <div className="w-full mb-5 font-light">
                  <InputField
                    type="oldPassword"
                    name="oldPassword"
                    color={TAILWIND_COLORS.primary}
                    label="Previous Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.oldPassword}
                    errors={errors}
                  />
                </div>
                <div className="w-full  mb-5 font-light">
                  <InputField
                    type="password"
                    color={TAILWIND_COLORS.primary}
                    label="New Password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    value={values.password}
                  />
                </div>
                <div className="w-full  mb-5 font-light">
                  <Checkbox color={TAILWIND_COLORS.primary} label="Rember Me" />
                </div>
                <div className="w-full font-light flex">
                  <Button
                    variant="gradient"
                    color={TAILWIND_COLORS.primary}
                    className="mx-auto"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default ChangePassword;
