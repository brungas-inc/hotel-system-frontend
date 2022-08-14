import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Login from "./views/auth/Login";
import Unauthorized from "./views/auth/Unauthorized";
import Page from "./views/Page";
import HotelBooking from "./views/registration/HotelBooking";
import { Helmet } from "react-helmet";
import RequireAuth from "./components/RequireAuth";
import NonExistantPage from "./views/NonExistantPage";
import { ROLES } from "./utils/constants";
import AdminRoutes from "./views/admin/AdminRoutes";
import DesignRoutes from "./views/design/DesignRoutes";

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/hms" element={<Page />}>
          <Route
            path="reception"
            element={
              <RequireAuth allowedRoles={[ROLES.reception, ROLES.root]} />
            }
          >
            <Route path="" element={<HotelBooking />} />
            <Route path="booking" element={<HotelBooking />} />
          </Route>
          <Route path="designs/*" element={<DesignRoutes />} />
          <Route
            path="admin/*"
            element={<RequireAuth allowedRoles={[ROLES.root]} />}
          >
            <Route path="*" element={<AdminRoutes />} />
          </Route>
        </Route>
        {/* </Route> */}
        {/* catch all */}
        <Route path="*" element={<NonExistantPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
