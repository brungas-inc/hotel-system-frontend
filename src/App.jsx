import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import Login from "./views/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route index path="/" element={<Login />} />\
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
