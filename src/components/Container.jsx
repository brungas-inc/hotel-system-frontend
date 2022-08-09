import React from "react";
import { Card } from "@material-tailwind/react";

const Container = (props) => {
  return (
    <div
      className={
        "container mx-auto max-w-full " +
        (props.className ? props.className : "")
      }
    >
      <Card className="mb-10">{props.children}</Card>
    </div>
  );
};

export default Container;
