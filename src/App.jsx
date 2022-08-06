import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Login from "./views/auth/Login";
import Unauthorized from "./views/auth/Unauthorized";
import Page from "./views/Page";
import HotelBooking from "./views/hotel-booking/HotelBooking";
import { Helmet } from "react-helmet";

useEffect(() => {}, [third]);

function App() {
  return (
    <ThemeProvider>
      <Helmet>
        <title></title>
      </Helmet>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/private" element={<Page />}>
          <Route path="hotel" element={<HotelBooking />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
