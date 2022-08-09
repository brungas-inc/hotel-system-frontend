import React, { useMemo } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import { getCurrentRole } from "../rtk/UserSlice";
import { useSelector } from "react-redux";

const Header = ({ showSidebar, setShowSidebar }) => {
  const currentRole = useSelector(getCurrentRole);

  return (
    <nav className="md:ml-64 py-6 px-3 shadow bg-primaryDark">
      <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
        <div className="md:hidden mr-2 ">
          <Button
            color="amber"
            variant="text"
            size="sm"
            ripple={true}
            onClick={() => setShowSidebar("left-0")}
          >
            <span className="material-icons">menu</span>
          </Button>
          <div
            className={`absolute top-2 md:hidden mr-2 ${
              showSidebar === "left-0" ? "left-64" : "-left-64"
            } z-50 transition-all duration-300`}
          >
            <Button
              color="amber"
              variant="text"
              size="sm"
              ripple={true}
              onClick={() => setShowSidebar("-left-64")}
            >
              <span className="material-icons">menu</span>
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <h4 className="uppercase text-white font-bold text-sm tracking-wider mt-1">
            {currentRole?.name}
          </h4>

          <div className="flex">
            <div className="md:-mr-4 ml-6">
              <Menu
                style={{
                  padding: 0,
                }}
              >
                <MenuHandler>
                  <IconButton variant="gradient" color="amber">
                    <i className="material-icons text-white">person</i>
                  </IconButton>
                </MenuHandler>
                <MenuList>
                  <MenuItem color="lightBlue">Action</MenuItem>
                  <MenuItem color="lightBlue">Another Action</MenuItem>
                  <MenuItem color="lightBlue">Something Else</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
