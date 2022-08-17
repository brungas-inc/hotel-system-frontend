import React, { useState, useRef, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { Checkbox, Button, CardBody } from "@material-tailwind/react";
import CheckBox from "../../../components/CheckBox";
import { BASE_URL, TAILWIND_COLORS } from "../../../utils/constants";
import Alert from "../../../components/Alert";
import { Formik } from "formik";
import Table from "../../../components/Table";
import * as Yup from "yup";
import InputField from "../../../components/InputField";
import CardFooter from "../../../components/CardFooter";
import { reportErrors } from "../../../utils/helpers";

const AddRoleSchema = Yup.object().shape({
  description: Yup.string()
    .required("Description is Required")
    .matches(/^[aA-zZ\s]+$/, "Invalid Role Description"),
  name: Yup.string()
    .required("Role Name is Required")
    .matches(/^[aA-zZ\s]+$/, "Invalid Role Name"),
});

const AddRole = (props) => {
  const alert = useRef();
  const [checked, setChecked] = useState([]);
  const {
    data: permissions,
    loading,
    error,
    loadData,
  } = useFetch("access-control/permissions", { limit: 1000 }, true, {
    data: [],
    pagination: { totalPages: 0 },
  });

  const submit = (setSubmitting, values) => {
    setSubmitting(true);
    if (!checked.length)
      return alert.current.showError("Select at least one Permission");
    window.axios
      .post(
        `${BASE_URL}access-control/roles`,
        {
          ...values,
          permissions: [...checked],
        },
        { headers: { Authorization: `Bearer ${window.$api_token}` } }
      )
      .then((response) => {
        alert.current.showSuccess("Saved successfully.");
        setTimeout(() => {
          props.cancel();
          props.loadData();
        }, 1000);
      })
      .catch((error) => reportErrors(alert.current, error));
  };

  return (
    <>
      <Formik
        initialValues={{
          description: "",
          name: "",
        }}
        validationSchema={AddRoleSchema}
        onSubmit={(values, { setSubmitting }) => submit(setSubmitting, values)}
      >
        {({
          values,

          errors,

          handleChange,

          handleBlur,

          handleSubmit,
        }) => (
          <form>
            <CardBody>
              <Alert ref={alert} />
              <div className="mb-3" />
              <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 mt-5 ">
                <div className="flex flex-col gap-2">
                  <h1>Select Permissions</h1>
                  <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-primaryDark scrollbar-track-gray-300 h-64 flex flex-col">
                    {permissions?.data?.map((item, index) => {
                      return (
                        <Checkbox
                          key={item._id}
                          label={item.displayName}
                          color={TAILWIND_COLORS.primary}
                          checked={checked.indexOf(item._id) !== -1}
                          onChange={(event) => {
                            let isCheck = event.target.checked;
                            setChecked((prevState) =>
                              isCheck
                                ? [...prevState, item._id]
                                : [
                                    ...prevState.filter(
                                      (val) => val != item._id
                                    ),
                                  ]
                            );
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mt-10" />
                  <InputField
                    name="name"
                    size="md"
                    className="w-full font-light"
                    color={TAILWIND_COLORS.primary}
                    label="Role Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    errors={errors}
                  />
                  <InputField
                    name="description"
                    className="w-full font-light"
                    size="md"
                    color={TAILWIND_COLORS.primary}
                    label="Role Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    errors={errors}
                  />
                </div>
              </div>
            </CardBody>
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
                Save
              </Button>
            </CardFooter>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddRole;
