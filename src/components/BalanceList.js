/**
 * @author Nadir
 * @version 1.0
 */

import React from "react";
import eth_ic from "../assets/images/ethereum.png";
import weth_ic from "../assets/images/weth.png";

export default function BalanceList({ address }) {

  address = "0x1dD1619Ca2632292aE6238E5332043B29EFB7DC8"; //This address is expected from metamask wallet

  const data = [
    {
      symbol: "ETH",
      name: "Ethereum",
      icon: eth_ic,
      ethers: "1.01",
      usd: "1000",
    },
    {
      symbol: "WETH",
      name: "Wrapped Ethereum",
      icon: weth_ic,
      ethers: "1.01",
      usd: "1000",
    },
    {
      symbol: "WETH",
      name: "Wrapped Ethereum",
      icon: weth_ic,
      ethers: "1.01",
      usd: "1000",
    },
    {
      symbol: "WETH",
      name: "Wrapped Ethereum",
      icon: eth_ic,
      ethers: "2.01",
      usd: "1000",
    },
  ];
  return (
    <>
      {data.map((item) => {
        return <Item item={item} />;
      })}
    </>
  );
}

const Item = ({ item }) => {
  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <div style={{ display: "flex" }}>
        <img src={item.icon} width={40} height={40} alt="icon"></img>
        <div style={{ marginLeft: "15px" }}>
          <h3 style={{ fontWeight: "bold", textAlign: "left" }}>
            {item.symbol}
          </h3>
          <h5 style={{ left: "10px", marginTop: "-10px" }}>{item.name}</h5>
        </div>
      </div>
      <div style={{ position: "absolute", right: "20px" }}>
        <h3 style={{ left: 0, fontWeight: "bold" }}>{item.ethers}</h3>
        <h5 style={{ marginTop: "-10px" }}>${item.usd}</h5>
      </div>
    </div>
  );
};
