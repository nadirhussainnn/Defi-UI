/**
 * @author Nadir
 * @version 1.0
 */

import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { data } from "./static-data.js";
import { IoMdArrowBack } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { Row, Col } from "antd";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";

export default function BoxPlot() {
  const [theme, setTheme] = useState("light-theme");
  const [navBtns, setNavBtns] = useState({ color: "#000000" });
  const navigator = useNavigate();

  let chartOptions = {
    width: 1400,
    height: 500,
    priceScale: {
      scaleMargins: {
        top: 0.3,
        bottom: 0.1,
      },
      borderVisible: true,
    },

    layout: {
      backgroundColor: "#FFFFFF",
      textColor: "#000000",
    },
    grid: {
      vertLines: {
        color: "#edf6f9",
      },
      horzLines: {
        color: "#edf6f9",
      },
    },
  };

  const containerRef = useRef();
  const chart = useRef();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    chart.current = createChart(document.getElementById("chart"), chartOptions);

    var candleSeries = chart.current.addCandlestickSeries();
    candleSeries.setData(data);
  }, []);

  function themeChange() {
    if (theme === "dark-theme") {
      setTheme("light-theme");
      setNavBtns({ color: "#000000" });
      chartOptions = {
        ...chartOptions,
        layout: { backgroundColor: "#FFFFFF", textColor: "#000000" },
        grid: {
          vertLines: { color: "#edf6f9" },
          horzLines: { color: "#edf6f9" },
        },
      };

      chart.current.applyOptions(chartOptions);
    } else {
      setTheme("dark-theme");
      setNavBtns({ color: "#FFFFFF" });
      chartOptions = {
        ...chartOptions,
        layout: { backgroundColor: "#000000", textColor: "#FFFFFF" },
        grid: { vertLines: { color: "grey" }, horzLines: { color: "grey" } },
      };

      chart.current.applyOptions(chartOptions);
    }
  }

  function navigateBack() {
    navigator("/");
  }
  return (
    <div className="main-div">
      <Row style={{ justifyContent: "center" }}>
        <Col xs={24} sm={16} md={16} lg={22} xl={22} xxl={16}>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <div
              style={{ display: "flex", cursor: "pointer" }}
              onClick={navigateBack}
            >
              <IoMdArrowBack size={30} style={{ color: navBtns.color }} />
              <span
                style={{
                  fontSize: 20,
                  marginLeft: "10px",
                  color: navBtns.color,
                }}
              >
                Back
              </span>
            </div>

            <div className="color-mode-btn">
              <MdLightMode
                size={20}
                className="btn-img"
                onClick={() => themeChange()}
              ></MdLightMode>
            </div>
          </div>
        </Col>
      </Row>

      <Row style={{ justifyContent: "center", marginTop: "30px" }}>
        <Col
          xs={24}
          sm={16}
          md={16}
          lg={22}
          xl={22}
          xxl={16}
          id="chart"
          ref={containerRef}
        ></Col>
      </Row>
    </div>
  );
}
