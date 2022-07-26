import React, { useState, useEffect } from "react";
import { Button, Modal, Space, Divider, Select } from "antd";

import metamask_ic from "./assets/images/metamask.png";
import "./styles/home.css";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { MdCircle } from "react-icons/md";
import { IoMdCopy, IoMdEye, IoMdOpen } from "react-icons/io";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { toHex, truncateAddress } from "./utils";
import { networkParams } from "./networks";
import Balance from "./Balance";

const { Option } = Select;

const infura_api_key = "dc70d6bddf4748af956f653043b2cd70";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Metamask",
      infuraId: { 3: `https://ropsten.infura.io/v3/${infura_api_key}` },
    },
  },
};

export default function Wallet() {
  const [visible, setVisible] = useState(false); //For Modal
  const [networkModal, setNetworkModal] = useState(false);

  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(0);

  const [instance, setInstance] = useState();
  const [account, setAccount] = useState();
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();

  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
  });

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);


  async function connectWallet() {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.JsonRpcProvider(ethers.getDefaultProvider());

      console.log(provider)
      if (provider) {
        // const balance = await provider.getBalance(
        //   provider.provider.selectedAddress
        // );

        // const accounts = await provider.listAccounts();
        // const network = await provider.getNetwork();

        // if (accounts) {
        //   setAccount(provider.provider.selectedAddress);
        // }

        // setChainId(network.chainId); //Network chainId
        // setBalance(balance); //Selected Account balance
        // setInstance(instance); //Provider instance
        // setProvider(provider); //Provider
        // setVisible(true); //Display Modal
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

  //To disconnect

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

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
    await setNetwork(Number(value));
    switchNetwork();
  };

  async function switchNetwork() {
    try {
      await provider.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await provider.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]],
          });
        } catch (error) {
          setError(error);
        }
      }
    }
    setNetworkModal(false);
  }

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
              <Balance address={account}/>
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
