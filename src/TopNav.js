/**
 * @author Nadir
 * @version 1.0
 */
import React from "react";
import CustomButton from "./CustomButton";
import { IoMdHome, IoMdWallet } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import "./styles/styles.css";

export default function TopNav(props) {
  function navigation(state) {
    props.navigation(state);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div className="btn-parent">
          <CustomButton title="Home" navigation={navigation}>
            <IoMdHome size={20} className="btn-img"></IoMdHome>
          </CustomButton>
          <CustomButton title="Wallet" navigation={navigation}>
            <IoMdWallet size={20} className="btn-img"></IoMdWallet>
          </CustomButton>
        </div>
        <div className="color-mode-btn">
          <MdLightMode size={20} className="btn-img"></MdLightMode>
        </div>
      </div>
    </>
  );
}
