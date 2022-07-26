/**
 * @author Nadir
 * @version 1.0
 */

import React, { useState } from "react";
import TopNav from "./TopNav";
import { colors } from "../theme/colors";
import CryptoTable from "./CryptoTable";
import { Row, Col } from "antd";
import Wallet from "./Wallet";

export default function Home() {
  const [displayWallet, setDisplayWallet] = useState(false);

  function navigation(state) {
    setDisplayWallet(state);
  }
  return (
    <div className="main-div">
      <TopNav navigation={navigation} />
      {displayWallet ? (
        <Row style={{ justifyContent: "center" }}>
          <Col xs={24} sm={16} md={16} lg={18} xl={18} xxl={16}>
            <Wallet />
          </Col>
        </Row>
      ) : (
        <Row style={{ justifyContent: "center" }}>
          <Col xs={24} sm={16} md={16} lg={22} xl={22} xxl={16}>
            <CryptoTable />
          </Col>
        </Row>
      )}
    </div>
  );
}
