import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser, getUser } from "../rtk/UserSlice";
import { status } from "../utils/constants";
import ProgressIndicator from "./ProgressIndicator";

const RequireAuth = ({ allowedRoles }) => {
  const currentUser = useSelector(getCurrentUser);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const api_token = localStorage.getItem("user_token");
    const userid = localStorage.getItem("user_id");
    window.$api_token = api_token;
    dispatch(getUser(userid));
  }, [dispatch]);
  return currentUser.status === status.succeeded ||
    currentUser.status === status.failed ? (
    allowedRoles?.includes(currentUser?.role?.name) ? (
      <Outlet />
    ) : currentUser.user ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  ) : (
    <div className="w-full">
      <ProgressIndicator initialPosition={-200} endPosition={1000} speed={50} />
    </div>
  );
};

export default RequireAuth;
