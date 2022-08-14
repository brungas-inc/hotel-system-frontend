import React from "react";
import { Button, Card, CardBody } from "@material-tailwind/react";
import Container from "../../components/Container";
import TabLayout from "../../components/TabLayout";
import CardHead from "../../components/CardHead";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

const basePath = "/hms/designs/tabs";

const Tabs = () => {
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
        >
          <Route
            title="Route 1"
            path="/route-1"
            exact={true}
            element={
              <div>
                <div className="mt-10" />
                <div className="text-center">Route 1</div>
              </div>
            }
          />
          <Route
            title="Route 2"
            path="/route-2"
            element={
              <div>
                <div className="mt-10" />
                <div className="text-center">Route 2</div>
              </div>
            }
          />
        </TabLayout>
      </div>
    </div>
  );
};

export default Tabs;
