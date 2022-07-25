import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";

const CryptoTable = () => {
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", filters, sorter);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "number",
      key: "number",
      width: "80px",
      sorter: (a, b) => a.number - b.number,
      sortOrder: sortedInfo.columnKey === "number" ? sortedInfo.order : null,
      ellipsis: true,
      align: "center",
    },
    {
      title: "Coin",
      dataIndex: "coin",
      key: "coin",
      width: "300px",
      sorter: (a, b) => a.coin - b.coin,
      sortOrder: sortedInfo.columnKey === "coin" ? sortedInfo.order : null,
      ellipsis: true,
    
      render: (coin, obj) => {
        console.log(obj)
        return (
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{}}>
            <img src={obj.logo} width={30} height={30} alt="loading logo" />{" "}
            <span style={{fontSize:18, paddingLeft:7}}>{coin}</span>
            </div>
            <div>
            <span style={{fontSize:18, position:'relative', right:'0px'}}>{obj.symbol}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === "price" ? sortedInfo.order : null,
      ellipsis: true,
      align: "center",
    },
    {
      title: "24th Volume",
      dataIndex: "volume",
      key: "volume",
      sorter: (a, b) => a.volume - b.volume,
      sortOrder: sortedInfo.columnKey === "volume" ? sortedInfo.order : null,
      ellipsis: true,
      align: "center",
    },
    {
      title: "mktCop",
      dataIndex: "mktCop",
      key: "mktCop",
      sorter: (a, b) => a.mktCop - b.mktCop,
      sortOrder: sortedInfo.columnKey === "mktCop" ? sortedInfo.order : null,
      ellipsis: true,
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "sevenDays",
      dataIndex: "sevenDays",
      key: "sevenDays",
      render: (data) => <h5>Ho</h5>,
      align: "center",
      responsive: ["lg"],
    },
  ];

  const data = [];

  const [cryptoData, setCryptoData] = useState();

  useEffect(() => {
    fetch(
      "https://api.nomics.com/v1/currencies/ticker?key=70e6ac4a2c05992674910388a5d5fabc989d4bdb"
    )
      .then((resp) => resp.json())
      .then(async (resp) => {
        console.log(resp);
        await resp.map((currency, index) => {
          data.push({
            key: index,
            number: index + 1,
            coin: currency.name,
            price: "$" + currency.price,
            volume: "$" + currency["1d"].volume,
            mktCop: "$" + currency["1d"].market_cap_change,
            logo: currency.logo_url,
            symbol:currency.symbol
            // sevenDays:
          });
        });

        setCryptoData(data);

        // const data = [
        //   {
        //     key: "1",
        //     number: 1,
        //     price: 32,
        //     coin: "Bitcoin",
        //     volume: "$1245120",
        //     mktCop: "$41,25,47,84,120",
        //     sevenDays: "$78454545",
        //   },
        // ];
      });
  }, []);

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={cryptoData}
      onChange={handleChange}
      style={{ backgroundColor: "black", marginBottom: "30px" }}
    />
  );
};

export default CryptoTable;
