import React, { useState, useEffect, useRef } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { BASE_URL } from "../utils/constants";

const Page = (props) => {
  const [appReady, setAppReady] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Sidebar {...props} />
      <div className="md:ml-64 bg-grey-100 flex flex-col justify-between min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Page;
