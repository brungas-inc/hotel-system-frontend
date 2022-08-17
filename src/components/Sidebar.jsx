import { Button } from "@material-tailwind/react";
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
        className={`h-screen fixed z-40 top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64  py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <h6 className="text-primary text-xl py-4 w-full text-center font-bold">
            Hotel <span className="text-accentColor">+</span>
          </h6>

          <div className="flex flex-col">
            <hr className="my-4 min-w-full text-divider" />

            <ul className="flex-col min-w-full flex list-none">
              {menu.map((item, index) => (
                <li className="rounded-lg mb-4 flex flex-col" key={index}>
                  <SideBarItems
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    subItems={item.items}
                  />
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

const SideBarItems = (props) => {
  const [toggle, settoggle] = useState(false);
  const navigateAway = () => {
    console.log("Change Page");
  };

  let currentClassName =
    "flex items-center gap-4 text-sm text-textLight hover:bg-zinc-300 font-light px-4 py-3 rounded-lg";
  let activeClassName =
    "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg bg-gradient-to-tr from-primaryDark to-primary text-white shadow-md";
  let activeSubClassName =
    "flex items-center gap-4 text-sm font-light px-4 py-3 rounded-lg bg-stone-400 text-textLight shadow-md";

  let activeStyle = {
    color: "white",
    backgroundColor: "rgb(70, 70, 70)",
  };

  const getClassName = (path) => {
    if (location.pathname.indexOf(path) != -1) {
      return activeClassName;
    }
    return currentClassName;
  };

  const location = useLocation();
  return (
    <div className="flex flex-col ">
      {props.subItems ? (
        <button
          className={getClassName(props.path)}
          to={props.path}
          onClick={() => settoggle(!toggle)}
        >
          <i className="material-icons">{props.icon || "dashboard"}</i>
          {props.label}
          <div className="mx-auto" />
          <i className="material-icons">keyboard_arrow_down</i>
        </button>
      ) : (
        <NavLink
          to={props.path}
          className={({ isActive }) =>
            isActive ? activeClassName : currentClassName
          }
        >
          <i className="material-icons">{props.icon || "dashboard"}</i>
          {props.label}
        </NavLink>
      )}

      <div
        className={
          "overflow-y-hidden bg-slate-300 transition-all ml-4" +
          (toggle ? " max-h-96 pt-2 " : " max-h-0")
        }
      >
        {props.subItems
          ? props.subItems.map((subItem, index) => {
              return (
                <NavLink
                  to={subItem.path}
                  className={({ isActive }) =>
                    isActive ? activeSubClassName : currentClassName
                  }
                  key={subItem.path}
                >
                  {subItem.label}
                </NavLink>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Sidebar;
