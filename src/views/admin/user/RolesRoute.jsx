import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TabLayout from "../../../components/TabLayout";
import Permissions from "./Permissions";
import RolesList from "./RolesList";

const basePath = "/hms/admin/users/roles";

const RolesRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-5" />
      <div className="px-3 md:px-8">
        <TabLayout
          router={true}
          basePath={basePath}
          location={location}
          navigate={navigate}
          bodyClassName="border p-6"
        >
          <Route title="Roles" path="" exact={true} element={<RolesList />} />
          <Route
            title="Permissions"
            path="/permissons"
            element={<Permissions />}
          />
        </TabLayout>
      </div>
    </div>
  );
};

export default RolesRoute;
