/**
 * @author Nadir
 * @version 1.0
 */

import React from "react";
import "../styles/styles.css";

export default function CustomButton(props) {
  const { title } = props;

  return (
    <div>
      <div className="btn-container">
        {props.children}
        <button
          className="btn-top"
          onClick={() => {
            title === "Wallet"
              ? props.navigation(true)
              : props.navigation(false);
          }}
        >
          {title}
        </button>
      </div>
    </div>
  );
}
