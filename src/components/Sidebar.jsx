import { Button } from "@material-tailwind/react";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";
import { getMenu } from "../rtk/MenuSlice";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState("-left-64");
  const menu = useSelector(getMenu);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  console.log(menu);

  let currentClassName =
    "flex items-center gap-4 text-sm text-textLight font-light px-4 py-3 rounded-lg";
  let activeClassName =
    "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-primaryDark to-primary text-white shadow-md";

  return (
    <>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64  py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <h6 className="text-primary text-xl py-4 w-full text-center font-bold">
            Hotel <span className="text-accentColor">+</span>
          </h6>

          <div className="flex flex-col">
            <hr className="my-4 min-w-full text-divider" />

            <ul className="flex-col min-w-full flex list-none">
              {menu.map((item, index) => (
                <li className="rounded-lg mb-4" key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? activeClassName : currentClassName
                    }
                  >
                    <i className="material-icons">{item.icon || "dashboard"}</i>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <ul className="flex-col min-w-full flex list-none absolute bottom-0">
              <li className="px-4 rounded-lg text-white">
                <Button
                  className="w-full bg-gradient-to-tr from-primaryDark to-primary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
