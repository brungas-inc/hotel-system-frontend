import { Input } from "@material-tailwind/react";
import React, { forwardRef, useImperativeHandle } from "react";

import { useField } from "formik";

const InputField = ({ ...props }, ref) => {
  const [field, meta, helpers] = useField(props);

  useImperativeHandle(ref, () => ({
    setValue: (value, shouldValidate = true) =>
      helpers.setValue(value, shouldValidate),
    setTouched: (value, shouldValidate = true) =>
      helpers.setTouched(value, shouldValidate),
    setError: (value, shouldValidate = true) =>
      helpers.setError(value, shouldValidate),
    getInput: () => field,
  }));

  return (
    <div className={`mb-8 relative ${props.className}`}>
      <Input
        error={meta.touched && meta.error}
        variant="outlined"
        size={props.size || "lg"}
        autoComplete="off"
        {...props}
      />
      {meta.touched && meta.error ? (
        <span className="text-xs text-red-400 shadow-sm absolute -bottom-5 left-3">
          {meta.error}
        </span>
      ) : null}
    </div>
  );
};

export default forwardRef(InputField);
