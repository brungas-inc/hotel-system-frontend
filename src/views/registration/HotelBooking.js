import React from "react";
import { useOutletContext } from "react-router-dom";

const HotelBooking = () => {
  const [setMenu] = useOutletContext();
  return <div>HotelBooking</div>;
};

export default HotelBooking;
