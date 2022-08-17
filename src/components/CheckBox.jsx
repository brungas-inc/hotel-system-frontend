import React from "react";

const CheckBox = ({ label, ...rest }) => {
  return (
    <div className="inline-flex items-center cursor-pointer">
      <label
        className="relative flex items-center cursor-pointer p-3 rounded-full"
        htmlFor="checkbox"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <input
          {...rest}
          type="checkbox"
          color="indigo"
          className="peer relative appearance-none w-5 h-5 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-indigo-500 checked:border-indigo-500 checked:before:bg-indigo-500"
        />
      </label>
      <label
        className="text-gray-700 font-light select-none cursor-pointer mt-px"
        htmlFor="checkbox"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
