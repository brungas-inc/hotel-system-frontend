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
import { BASE_URL } from "../../utils/constants";
import { reportErrors } from "../../utils/helpers";
import Modal from "../../components/Modal";
import ChangePassword from "./ChangePassword";

const LogInSchema = Yup.object().shape({
  password: Yup.string().required("Password is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address Required"),
});

const Login = () => {
  const alert = useRef();
  const modal = useRef();
  const navigate = useNavigate();

  const getLocation = (role) => {
    if (role == "Root") return "/hms/admin/dashboard";
    if (role == "Reception") return "/hms/reception";
  };

  const openModal = () => {
    let component = <ChangePassword hide={() => modal.current.hide()} />;
    modal && modal.current.openModal(component, "Change Password");
  };
  const submitLogin = (setSubmitting, values) => {
    axios
      .post(`${BASE_URL}auth/login`, values)
      .then((response) => {
        localStorage.setItem("user_token", response.data?.data?.token);
        localStorage.setItem("user_id", response.data?.data?.user?._id);
        alert.current.showSuccess(response.data.message, 3000);
        if (response.data?.success == false) {
          setTimeout(() => {
            openModal();
          }, 1000);
        } else {
          setTimeout(() => {
            setSubmitting(false);
            navigate(getLocation(response.data?.data?.user?.role?.name));
          }, [2000]);
        }
      })
      .catch((error) => {
        reportErrors(alert.current, error);
      });
  };
  return (
    <div className="bg-center bg-no-repeat bg-cover w-full h-screen flex bg-login-image">
      <Card className="m-auto w-96">
        <CardHeader color="indigo" className="relative h-20 flex">
          <h2 className="text-white text-2xl m-auto">Login</h2>
        </CardHeader>
        <CardBody>
          <Alert ref={alert} />

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
            onSubmit={(values, { setSubmitting }) =>
              submitLogin(setSubmitting, values)
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
      <Modal ref={modal} />
    </div>
  );
};

export default Login;
