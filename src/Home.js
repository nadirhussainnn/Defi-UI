import React from "react";
import TopNav from "./TopNav";

import { colors } from "./theme/colors";
import CryptoTable from "./CryptoTable";
import { Row, Col } from "antd";

export default function Home() {
  return (
    <div className="main-div" style={{ backgroundColor: colors.dark }}>
      <TopNav />

      <Row style={{justifyContent:'center'}}>
        <Col xs={24} sm={16} md={16}  lg={22} xl={22} xxl={16} >
          <CryptoTable />
        </Col>
      </Row>
    </div>
  );
}
