import React, { useState } from "react";
import { Button, Modal, Space, Divider } from "antd";

import metamask_ic from "./assets/images/metamask.png";
import "./styles/home.css";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { MdCircle } from "react-icons/md";
import { IoMdCopy, IoMdEye, IoMdOpen } from "react-icons/io";

// import {CoinbaseWalletSDK} from '@coinbase/wallet-sdk'

// const infura_api_key='dc70d6bddf4748af956f653043b2cd70'
const providerOptions = {
  // coinbasewallet:{
  //     package:CoinbaseWalletSDK,
  //     options:{
  //         appName:'Metamask',
  //         infuraId:{3:`https://ropsten.infura.io/v3/${infura_api_key}`}
  //     }
  // }
};

export default function Wallet() {
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(0);

  async function connectWallet() {
    try {
      const web3Modal = new Web3Modal({
        // network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });

      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);

      console.log(ethers.Wallet);

      if (provider) {
        // const block=await provider.getBlockNumber()
        let ropstonProvider = new ethers.providers.EtherscanProvider("ropsten");
        let history = await ropstonProvider.getHistory(provider.provider.selectedAddress);

        console.log(history)
        const balance = await provider.getBalance(
          provider.provider.selectedAddress
        );
        setBalance(balance);
        setProvider(provider);
        setVisible(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const [visible, setVisible] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <div style={{ justifyContent: "center" }}>
        <img src={metamask_ic} width={100} height={100} alt="Loading icon" />
        <h1 style={{ fontSize: "40px", color: "white" }}>METAMASK</h1>
        <Button
          style={{
            backgroundColor: "#01aa58",
            border: "none",
            color: "white",
            fontSize: "16px",
          }}
          onClick={connectWallet}
        >
          {provider ? "Disconnect Wallet" : "Connect Wallet"}
        </Button>

        <Modal
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}
          footer={null}
          closable={false}
        >
          <div
            style={{
              display: "flex",
              position: "absolute",
              marginTop: "-10px",
              right: 20,
            }}
          >
            <MdCircle color={provider ? "#01aa58" : "red"} />
            <span
              style={{
                color: provider ? "#01aa58" : "red",
                marginTop: "-6px",
                marginLeft: "3px",
              }}
            >
              {provider ? "connected" : "Not connected"}
            </span>
          </div>
          <Space direction="vertical" />
          <Divider className="margin-top-10" />

          {provider ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <img
                    src={metamask_ic}
                    width={20}
                    height={20}
                    style={{ marginRight: "10px" }}
                    alt="address ic"
                  />
                  <span>{provider.provider.selectedAddress}</span>
                </div>
                <div style={{ display: "flex" }}>
                  <IoMdCopy size={25} style={{ marginRight: "10px" }} />
                  <IoMdOpen size={25} />
                </div>
              </div>

              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <div>
                  <span>Total Balance</span>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span>
                    <b>${balance.toString()}</b>
                  </span>
                  <IoMdEye size={25} style={{ marginLeft: "5px" }} />
                </div>
                <div style={{ display: "flex", justifyContent:'center', marginTop:'20px' }}>
                  <Button
                    style={{
                      backgroundColor: "#01aa58",
                      border: "none",
                      color: "white",
                      fontSize: "16px",
                      borderRadius:'5px'
                    }}
                    onClick={connectWallet}
                  >
                    Buy
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#01aa58",
                      border: "none",
                      color: "white",
                      fontSize: "16px",
                      marginLeft:'10px',
                      borderRadius:'5px'
                    }}
                    onClick={connectWallet}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Modal>
      </div>
    </div>
  );
}
