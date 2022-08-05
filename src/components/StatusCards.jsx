import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
export default function StatusCard({
  color,
  icon,
  title,
  amount,
  percentage,

  date,
}) {
  const percentageClass = "text-thin text-sm ml-2 text-green-500";
  var percentageIcon = "north";
  var percentageColor = "green";

  function getPercentageClass() {
    return percentage > 0
      ? percentageClass + " text-green-500"
      : percentageClass + " text-red-500";
  }
  function getPercentageIcon() {
    return percentage > 0 ? "north" : " south";
  }
  function getPercentageColor() {
    return percentage > 0 ? "text-green-500" : " text-red-500";
  }

  return (
    <div className="px-4 mb-10">
      <Card className="px-2">
        <div className="">
          <CardHeader
            color={color}
            variant="gradient"
            className="mb-0 w-24 h-24 flex"
          >
            <i className="material-icons text-white text-7xl m-auto">{icon}</i>
          </CardHeader>

          {/* <Card title={title} amount={amount} /> */}
          <CardBody className="flex mb-0 flex-col text-right">
            <Typography variant="h6" className="font-thin text-sm mb-3">
              {title}
            </Typography>
            <Typography
              variant="lead"
              className="font-bold w-full md:text-xl -mb-3 font-mono tracking-tight"
            >
              {amount}
            </Typography>
          </CardBody>
        </div>
        <hr className="w-50 text-divider mx-5" />
        <CardFooter
          amount={percentage}
          color={percentageColor}
          date={date}
          className="flex w-full align-center -mt-0"
        >
          <i className={`material-icons text-sm ${getPercentageColor()}`}>
            {getPercentageIcon()}
          </i>
          <span className={getPercentageClass()}>{Math.abs(percentage)}%</span>
          <span className={`ml-3 text-sm`}>{date}</span>
        </CardFooter>
      </Card>
    </div>
  );
}
