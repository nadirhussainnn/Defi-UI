/**
 * @author Nadir
 * @version 1.0
 */
import React from "react";
import { Link } from "react-router-dom";
export default function Error() {
  return (
    <div>
      <h1>No Such route</h1>
      <Link to="/">Get Back</Link>
    </div>
  );
}
