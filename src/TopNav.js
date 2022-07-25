import React from "react";
import CustomButton from "./CustomButton";
import "./styles/home.css";

import { IoMdHome, IoMdWallet, IoMdColorFill } from "react-icons/io";
import {MdLightMode} from 'react-icons/md'

export default function TopNav() {
  return (
    <>
    <div style={{display:'flex', justifyContent:'center', position:'relative'}}>
    <div className="btn-parent">
        <CustomButton title="Home">
          <IoMdHome size={20} className="btn-img"></IoMdHome>
        </CustomButton>
        <CustomButton title="Wallets">
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