import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Option, Select } from "@material-tailwind/react";
import { TAILWIND_COLORS } from "../utils/constants";
import { useField } from "formik";

const SelectField = ({ ...props }, ref) => {
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

  const clear = () => helpers?.setValue();

  return (
    <div className="mb-8 relative">
      <Select
        variant="outlined"
        size="lg"
        label={props.label}
        onBlur={props.onBlur}
        onChange={props.onChange}
        error={meta.touched && meta.error}
        color={TAILWIND_COLORS.primary}
      >
        {/* <Option value="">Select {props.label}</Option> */}
        {props.options.map((item, index) => (
          <Option value={item.value} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
      {meta.touched && meta.error ? (
        <span className="text-xs text-red-400 shadow-sm absolute -bottom-5 left-3">
          {meta.error}
        </span>
      ) : null}
    </div>
  );
};

export default forwardRef(SelectField);
