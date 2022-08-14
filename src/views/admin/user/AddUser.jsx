import React, { useRef } from "react";
import { Formik } from "formik";
import { Button, Card, CardBody, RadioButton } from "@material-tailwind/react";
import Container from "../../../components/Container";
import InputField from "../../../components/InputField";
import { TAILWIND_COLORS } from "../../../utils/constants";
import * as Yup from "yup";
import Select from "../../../components/SelectField";
import Alert from "../../../components/Alert";
import CardFooter from "../../../components/CardFooter";

const AddUserSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is Required")
    .min(8, "Password should be 8 chars minimum.")
    .matches(/.*\W+.*/, "You Need at least one special character"),
  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .matches(/^0\d{9}$/, "Invalid Phone Number"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email address Required"),
});

const AddUser = (props) => {
  const alert = useRef();
  const submit = () => {};
  return (
    <div className="">
      <Alert ref={alert} />
      <Formik
        initialValues={{
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          gender: "",
          password: "",
          confirmPassword: "",
          lastLocation: "",
          status: 1,
          role: "",
        }}
        validationSchema={AddUserSchema}
        onSubmit={(values, { setSubmitting }) => submit(setSubmitting, values)}
      >
        {({
          values,

          errors,

          handleChange,

          handleBlur,

          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-x-6 mt-5 ">
              <InputField
                name="firstName"
                size="md"
                className="w-full font-light"
                color={TAILWIND_COLORS.primary}
                label="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                errors={errors}
              />
              <InputField
                name="middleName"
                className="w-full font-light"
                size="md"
                color={TAILWIND_COLORS.primary}
                label="Middle Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.middleName}
                errors={errors}
              />
              <InputField
                name="lastName"
                className="w-full font-light"
                color={TAILWIND_COLORS.primary}
                label="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                errors={errors}
              />
              <InputField
                name="phoneNumber"
                className="w-full font-light"
                color={TAILWIND_COLORS.primary}
                label="Phone Number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                errors={errors}
              />

              <InputField
                type="password"
                color={TAILWIND_COLORS.primary}
                label="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors}
                className="w-full font-light"
                value={values.password}
              />
              <InputField
                type="password"
                color={TAILWIND_COLORS.primary}
                label="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                success={!errors["confirmPassword"] && values.confirmPassword}
                errors={errors}
                value={values.confirmPassword}
              />
              <Select
                label="Gender"
                name="gender"
                options={[
                  { label: "Male", value: "M" },
                  { label: "Female", value: "F" },
                ]}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full font-light"
                value={values.gender}
                errors={errors}
              />
            </div>
            <CardFooter className="justify-center">
              <Button
                variant="outlined"
                color="blue-gray"
                onClick={props.cancel}
              >
                Close
              </Button>
              <Button
                variant="gradient"
                color={TAILWIND_COLORS.primary}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </CardFooter>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddUser;
