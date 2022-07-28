/**
 * @author Nadir
 * @version 1.0
 */

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import eth_ic from "../assets/images/ethereum.png";
import weth_ic from "../assets/images/weth.png";

export default function BalanceList({ address, usd_rate, provider }) {
  
  const [history, setHistory] = useState(null);

  useEffect(() => {

    //Get transaction history and balance to this address
    const historyFetcher = async () => {
      let ropstonProvider = new ethers.providers.EtherscanProvider(
        provider?.name
      );
      let history = await ropstonProvider.getHistory(address);
      setHistory(history);
    };
    historyFetcher();
  }, []);

  return (
    <>
      {history?.map((item, index) => {
        const eth = ethers.utils.formatEther(item.value._hex);
        return <Item eth={eth} usd_rate={usd_rate} key={index} />;
      })}
    </>
  );
}

const Item = ({ eth, usd_rate }) => {
  const usd = Math.round((usd_rate * eth + Number.EPSILON) * 100) / 100;

  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <div style={{ display: "flex" }}>
        <img src={eth_ic} width={40} height={40} alt="icon" />
        <div style={{ marginLeft: "15px" }}>
          <h3 style={{ fontWeight: "bold", textAlign: "left" }}>{"ETH"}</h3>
          <h5 style={{ left: "10px", marginTop: "-10px" }}>{"Ethereum"}</h5>
        </div>
      </div>
      <div style={{ position: "absolute", right: "20px" }}>
        <h3 style={{ left: 0, fontWeight: "bold" }}>{eth}</h3>
        <h5 style={{ marginTop: "-10px" }}>${usd}</h5>
      </div>
    </div>
  );
};
