import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { setMenu } from "../../rtk/MenuSlice";
import AdminDashboard from "./AdminDashboard";
import UserList from "./user/UserList";
import UserManagementRoutes from "./user/UserManagementRoutes";

const AdminRoutes = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  React.useEffect(() => {
    dispatch(
      setMenu([
        { path: "/hms/admin/dashboard", label: "Dashboard" },
        { path: "/hms/admin/users/", label: "User Manager", icon: "person" },
      ])
    );
  }, []);

  return (
    <Routes>
      <Route exact={true} path="/dashboard" element={<AdminDashboard />} />
      <Route path="/users" element={<UserManagementRoutes />}>
        <Route index element={<UserList />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
