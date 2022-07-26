// /**
//  * @author Nadir
//  * @version 1.0
//  */
// import React, {useState, useEffect} from "react";
// import CustomButton from "./CustomButton";
// import { IoMdHome, IoMdWallet } from "react-icons/io";
// import { MdLightMode } from "react-icons/md";
// import "../styles/styles.css";

// export default function TopNav(props) {
//   const [theme,setTheme] = useState("light-theme")

//   function themeChange(){
//     if(theme==="dark-theme"){
//       setTheme("light-theme")
//     }else{
//       setTheme("dark-theme")
//     }
//   }

//   useEffect(()=>{
//     document.body.className=theme;
//   },[theme])

//   function navigation(state) {
//     props.navigation(state);
//   }

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           position: "relative",
//         }}
//       >
//         <div className="btn-parent">
//           <CustomButton title="Home" navigation={navigation}>
//             <IoMdHome size={20} className="btn-img"></IoMdHome>
//           </CustomButton>
//           <CustomButton title="Wallet" navigation={navigation}>
//             <IoMdWallet size={20} className="btn-img"></IoMdWallet>
//           </CustomButton>
//         </div>
//         <div className="color-mode-btn">
//           <MdLightMode size={20} className="btn-img" onClick={()=>themeChange()}></MdLightMode>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import "../styles/styles.css";

import { IoMdHome, IoMdWallet } from "react-icons/io";
import {MdLightMode} from 'react-icons/md'

export default function TopNav(props) {
    const [theme,setTheme] = useState("light-theme")

    function themeChange(){
      if(theme==="dark-theme"){
        setTheme("light-theme")
      }else{
        setTheme("dark-theme")
      }
    }

    useEffect(()=>{
      document.body.className=theme;
    },[theme])

    
    function navigation(state){
        props.navigation(state)
    }

  return (
    <>
    <div style={{display:'flex',  justifyContent:'center', position:'relative'}}>
    <div className="btn-parent">
        <CustomButton title="Home"  navigation={navigation}>
          <IoMdHome size={20} className="btn-img"></IoMdHome>
        </CustomButton>
        <CustomButton title="Wallet" navigation={navigation}>
          <IoMdWallet size={20} className="btn-img"></IoMdWallet>
        </CustomButton>
      </div>
      <div className="color-mode-btn">
      <MdLightMode size={20} className="btn-img" onClick={()=>themeChange()}></MdLightMode>
      </div>
    </div>

    </>
  );
}
