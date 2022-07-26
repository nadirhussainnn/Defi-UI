/**
 * @author Nadir
 * @version 1.0
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import Home from "./components/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/graph/:currency" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
