import React, { useState, useEffect, useRef } from "react";

const FormSubtitle = (props) => {
  return (
    <h6 className={"text-sm mt-3 mb-6 font-light uppercase " + props.className}>
      {props.title}
    </h6>
  );
};

FormSubtitle.defaultProps = {
  className: "text-accent",
};

export default FormSubtitle;
