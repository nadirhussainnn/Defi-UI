/**
 * @author Nadir
 * @version 1.0
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import BoxPlot from "./components/BoxPlot";
import Error from "./components/Error";
import Home from "./components/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/box-plot" element={<BoxPlot />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
