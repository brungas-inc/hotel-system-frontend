import React from "react";
import { useDispatch } from "react-redux";
import { setMenu } from "../../rtk/MenuSlice";
import { Routes, Route } from "react-router-dom";
import DesignsDashboard from "./DesignsDashboard";
import Tabs from "./Tabs";

const DesignRoutes = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      setMenu([
        { path: "/hms/designs/dashboard", label: "Dashboard" },
        { path: "/hms/designs/tabs", label: "Tabs", icon: "tab" },
      ])
    );
  }, []);
  return (
    <Routes>
      <Route path="/dashboard" exact={true} element={<DesignsDashboard />} />
      <Route path="/tabs/*" element={<Tabs />} />
    </Routes>
  );
};

export default DesignRoutes;
