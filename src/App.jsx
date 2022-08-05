import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/tables" element={<TableDesign />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
