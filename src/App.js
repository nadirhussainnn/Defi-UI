/**
 * @author Nadir
 * @version 1.0
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "./Error";
import Home from "./Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/graph/:currency" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
