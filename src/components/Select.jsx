import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Select } from "@material-tailwind/react";

const Select = ({ options, name, ...rest }) => {
  return (
    <div className="mb-8 relative">
      <Select
        variant="outlined"
        label="Select Version"
        size="lg"
        {...rest}
        error={errors[name]}
        color="indigo"
      >
        <Option value=""></Option>
        {options.map((item) => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>
      {errors[name] ? (
        <span className="text-xs text-red-400 shadow-sm absolute -bottom-5 left-3">
          {errors[name]}
        </span>
      ) : null}
    </div>
  );
};

export default Select;
