import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";

import { Formik } from "formik";
import InputField from "../../components/InputField";
import Alert from "../../components/Alert";
import { useRef } from "react";
import ProgressIndicator from "../../components/ProgressIndicator";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const LogInSchema = Yup.object().shape({
  password: Yup.string().required("Password is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address Required"),
});

const Login = () => {
  const alert = useRef();
  const navigate = useNavigate();

  return (
    <div className="bg-center bg-no-repeat bg-cover w-full h-screen flex bg-login-image">
      <Card className="m-auto w-96">
        <CardHeader color="indigo" className="relative h-20 flex">
          <h2 className="text-white text-2xl m-auto">Login</h2>
        </CardHeader>
        <CardBody>
          <Alert ref={alert} />
          <ProgressIndicator
            initialPosition={-200}
            endPosition={400}
            speed={30}
          />
          <Formik
            initialValues={{ email: "", password: "" }}
            // validate={(values) => {
            //   const errors = {};

            //   if (!values.email) {
            //     errors.email = "Email is Required";
            //   } else if (
            //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //   ) {
            //     errors.email = "Invalid email address";
            //   }

            //   if (!values.password) {
            //     errors.password = "Password is Required";
            //   }

            //   return errors;
            // }}
            validationSchema={LogInSchema}
            onSubmit={(values, { setSubmitting }) => {
              alert.current.showSuccess(
                "Successfully Logged In, Redirecting.....",
                3000
              );
              setTimeout(() => {
                navigate("/private/hotel");
                setSubmitting(false);
              }, 1500);
            }}
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
                      type="email"
                      name="email"
                      color="indigo"
                      label="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      errors={errors}
                    />
                  </div>
                  <div className="w-full  mb-5 font-light">
                    <InputField
                      type="password"
                      color="indigo"
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors}
                      value={values.password}
                    />
                  </div>
                  <div className="w-full  mb-5 font-light">
                    <Checkbox color="indigo" label="Rember Me" />
                  </div>
                  <div className="w-full font-light flex">
                    <Button
                      variant="gradient"
                      color="indigo"
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
    </div>
  );
};

export default Login;
