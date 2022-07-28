/**
 * @author Nadir
 * @version 1.0
 */

import React, { useState } from "react";
import { Button, Modal, Space, Divider, Select, Input } from "antd";
import { ethers } from "ethers";
import { MdCircle } from "react-icons/md";
import { IoMdCopy, IoMdEye, IoMdOpen } from "react-icons/io";
import { RiMoneyDollarCircleFill, RiUserReceived2Fill } from "react-icons/ri";
import { toHex, truncateAddress } from "../utils/utils";
import { networkParams } from "../utils/networks";
import { useFormik } from "formik";
import BalanceList from "./BalanceList";

import metamask_ic from "../assets/images/metamask.png";
import "../styles/styles.css";

const { Option } = Select;

export default function Wallet() {
  //State variables

  const [visible, setVisible] = useState(false);
  const [networkModal, setNetworkModal] = useState(false);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState();
  const [usdRate, setUsdRate] = useState(0);
  const [network, setNetwork] = useState();
  const [sendCryptoModal, setSendCryptoModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      receiver: "",
      amount: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.receiver) {
        errors.receiver = "Address required";
      }
      if (!values.amount) {
        errors.amount = "Amount required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      //Sign transaction and send amount
      alert(`You requested to send USD ${values.amount} to ${values.receiver}`);
    },
  });
  //Helper functions

  async function connectWallet() {
    try {
      if (window.ethereum) {
        window.ethereum.enable();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const currentAddress = await signer.getAddress();
        let balance = await ethers.utils.formatEther(await signer.getBalance());

        //Perform ETH to USD conversion
        const currencyRate = await (
          await fetch(
            "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
          )
        ).json();
        balance =
          Math.round(
            (parseFloat(currencyRate.USD) * balance + Number.EPSILON) * 100
          ) / 100;

        //Get network info
        const network = await provider.getNetwork();

        //Set States
        setNetwork(network);
        setUsdRate(parseFloat(currencyRate.USD));
        setBalance(balance);
        setAccount(currentAddress);
        setProvider(provider);
        setVisible(true);
      } else {
        alert(`You don't have Metamask Installed on device`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function buyCrypto() {
    alert(`Available balance is ${balance}`);
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
        <h1 className="metamask-heading">METAMASK</h1>
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
          width={700}
          footer={null}
          closable={false}
          className="modal-bg"
        >
          <div>
            <div style={{ display: "flex" }}>
              <span style={{}}>
                Network: <b>{network?.name?.toUpperCase()}</b>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                position: "absolute",
                marginTop: "-15px",
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
          </div>

          <Space direction="vertical" />
          <Divider className="antd-divider" />

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
                  <span style={{ fontSize: 30 }}>
                    <b>${balance.toString()}</b>
                    {/* <b>$4000 </b> */}
                  </span>
                  <IoMdEye
                    size={30}
                    style={{ marginLeft: "5px", marginTop: "10px" }}
                  />
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
                      marginLeft: "10px",
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
                    onClick={() => {
                      setSendCryptoModal(true);
                    }}
                  >
                    Send
                  </Button>
                </div>
                <BalanceList
                  address={account}
                  usd_rate={usdRate}
                  provider={network}
                />
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

        {/* Modal to send assets */}

        <Modal
          centered
          title="Send Money"
          visible={sendCryptoModal}
          onCancel={() => {
            setSendCryptoModal(false);
          }}
          width={"30%"}
          footer={null}
          closable={true}
        >
          <form onSubmit={formik.handleSubmit}>
            <div style={{ justifyContent: "center" }}>
              <div
                style={{
                  padding: "10px",
                }}
              >
                <Input
                  size="large"
                  name="receiver"
                  placeholder="Enter Receiver public address"
                  prefix={<RiUserReceived2Fill />}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div
                style={{
                  padding: "10px",
                }}
              >
                <Input
                  size="large"
                  name="amount"
                  placeholder="Enter amount in USD"
                  prefix={<RiMoneyDollarCircleFill />}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginRight: "10px",
                }}
              >
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#01aa58",
                    border: "none",
                    color: "white",
                    fontSize: "16px",
                    marginLeft: "10px",
                    borderRadius: "5px",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
