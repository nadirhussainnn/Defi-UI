/**
 * @author Nadir
 * @version 1.0
 */

import React, { useState } from "react";
import { Button, Modal, Space, Divider, Select } from "antd";

import metamask_ic from "./assets/images/metamask.png";
import { ethers } from "ethers";
import { MdCircle } from "react-icons/md";
import { IoMdCopy, IoMdEye, IoMdOpen } from "react-icons/io";
import { toHex, truncateAddress } from "./utils";
import { networkParams } from "./networks";
import Balance from "./Balance";

import "./styles/styles.css";

const { Option } = Select;

export default function Wallet() {
    
    //State variables

  const [visible, setVisible] = useState(false);
  const [networkModal, setNetworkModal] = useState(false);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState();

  //Helper functions

  async function connectWallet() {
    try {
  
      if (window.ethereum) {
        
        window.ethereum.enable();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const currentAddress = await signer.getAddress();
        const balance = await signer.getBalance();

        setBalance(balance);
        setAccount(currentAddress);
        setProvider(provider);
        setVisible(true); 

      }
    } catch (error) {
      console.error(error);
    }
  }

  function buyCrypto() {
    console.log("Buy");

 }
  function sendCrypto() {
    console.log("Send");
}

  function copyAddress() {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(account);
    }

    return Promise.reject("The Clipboard API is not available.");
  }

  //Switch Network when clicked on Switch btn
  const displayNetworkSelectionModal = () => {
    setNetworkModal(true);
  };

  const handleNetwork = async (value) => {

    try {
      
        await provider.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: toHex(value) }],
        });

    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await provider.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(value)]],
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
    setNetworkModal(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <div style={{ justifyContent: "center" }}>
        <img src={metamask_ic} width={100} height={100} alt="Loading icon" />
        <h1 style={{ fontSize: "40px", color: "white" }}>METAMASK - </h1>
        <Button
          style={{
            backgroundColor: "#01aa58",
            border: "none",
            color: "white",
            fontSize: "16px",
          }}
          onClick={connectWallet}
        >
          Connect Wallet
        </Button>

        <Modal
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={"75%"}
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
            <MdCircle color={account ? "#01aa58" : "red"} />
            <span
              style={{
                color: account ? "#01aa58" : "red",
                marginTop: "-6px",
                marginLeft: "3px",
              }}
            >
              {account ? "connected" : "Not connected"}
            </span>
          </div>
          <Space direction="vertical" />
          <Divider className="margin-top-10" />

          {account ? (
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
                  <span>{truncateAddress(account)}</span>
                </div>
                <div style={{ display: "flex" }}>
                  <IoMdCopy
                    size={25}
                    style={{ marginRight: "10px" }}
                    onClick={copyAddress}
                  />
                  <IoMdOpen size={25} onClick={displayNetworkSelectionModal} />
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "#01aa58",
                      border: "none",
                      color: "white",
                      fontSize: "16px",
                      borderRadius: "5px",
                    }}
                    onClick={buyCrypto}
                  >
                    Buy
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#01aa58",
                      border: "none",
                      color: "white",
                      fontSize: "16px",
                      marginLeft: "10px",
                      borderRadius: "5px",
                    }}
                    onClick={sendCrypto}
                  >
                    Send
                  </Button>
                </div>
                <Balance address={account} />
              </div>
            </div>
          ) : (
            ""
          )}
        </Modal>

        <Modal
          centered
          title="Select Network"
          visible={networkModal}
          onOk={() => setNetworkModal(false)}
          onCancel={() => setNetworkModal(false)}
          width={"30%"}
          footer={null}
        >
          <div style={{ justifyContent: "center", display: "flex" }}>
            <Select
              placeholder="Select Natwork"
              onChange={handleNetwork}
              style={{ width: 250 }}
            >
              <Option value="1">Main Net</Option>
              <Option value="4">Rinkeby</Option>
              <Option value="3">Ropsten</Option>
              <Option value="42">Kovan</Option>
              <Option value="1666600000">Harmony</Option>
              <Option value="42220">Celo</Option>
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
}

// const block=await provider.getBlockNumber()
// let ropstonProvider = new ethers.providers.EtherscanProvider("ropsten");
// let history = await ropstonProvider.getHistory(
//   provider.provider.selectedAddress
// );
