/**
 * @author Nadir
 * @version 1.0
 */
import React, { useEffect, useState } from "react";
import eth_ic from "../assets/images/ethereum.png";
import weth_ic from "../assets/images/weth.png";

export default function BalanceList({ address }) {
  const [transactions, setTransactions] = useState(null);

  address = "0x1dD1619Ca2632292aE6238E5332043B29EFB7DC8";

  useEffect(() => {
    fetch(
      `https://api.covalenthq.com/v1/42/address/${address}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=ckey_57190a3cdb714746a75e1d39732`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        setTransactions(resp.data.items);
        console.log(resp.data.items);
      });
  }, []);

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
          <h3 style={{ fontWeight: "bold", textAlign:'left' }}>{item.symbol}</h3>
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
