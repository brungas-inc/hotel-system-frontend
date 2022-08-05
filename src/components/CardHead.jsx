import React from "react";
import { Typography, CardHeader } from "@material-tailwind/react";
import PropTypes from "prop-types";
const CardHead = (props) => {
  return (
    <CardHeader className="relative h-12 flex px-6 bg-gradient-to-tr from-primaryDark to-primary">
      <div className="w-full flex items-center justify-between">
        <Typography
          variant="h5"
          color="white"
          className="text-white text-lg font-semibold"
        >
          {props.children}
        </Typography>
      </div>
    </CardHeader>
  );
};

CardHead.propTypes = {
  children: PropTypes.string,
};

export default CardHead;
