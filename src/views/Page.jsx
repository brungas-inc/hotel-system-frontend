import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Page = (props) => {
  const [menu, setMenu] = React.useState([]);
  return (
    <>
      <Sidebar {...props} menu={menu} />
      <div className="md:ml-64 bg-grey-100 flex flex-col justify-between min-h-screen">
        <Outlet context={[setMenu]} />
      </div>
    </>
  );
};

export default Page;
