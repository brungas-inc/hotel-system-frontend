import React from "react";

const CardFooter = (props) => {
  return (
    <div
      className={`flex items-center p-4 space-x-2 rounded-b border-t border-gray-200 ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default CardFooter;
