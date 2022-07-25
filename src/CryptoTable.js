import { Table, Grid } from "antd";
import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import "./styles/home.css";

const { useBreakpoint } = Grid;

const CryptoTable = () => {
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", filters, sorter);
    setSortedInfo(sorter);
  };

  const screens = useBreakpoint();

  const columns = [
    {
      title: "#",
      dataIndex: "number",
      key: "number",
      width: screens.md?"80px":"40px",
      sorter: (a, b) => a.number - b.number,
      sortOrder: sortedInfo.columnKey === "number" ? sortedInfo.order : null,
      ellipsis: true,
      align: "center",
      render:(number)=><span className='table-entry'>{number}</span>,
    },
    {
      title: "Coin",
      dataIndex: "coin",
      key: "coin",
      width: screens.md?"300px":"110px",
      sorter: (a, b) => a.coin - b.coin,
      sortOrder: sortedInfo.columnKey === "coin" ? sortedInfo.order : null,
      ellipsis: true,
    
      render: (coin, obj) => {
        return (
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{}}>
            <img src={obj.logo} width={30} height={30} alt="loading logo" />{" "}
            <span style={{fontSize:screens.xs?12:18, paddingLeft:7}} className='table-entry'>{coin}</span>
            </div>
            {
                screens.md? <div>
                <span style={{fontSize:18, position:'relative', right:'0px'}} className='table-entry'>{obj.symbol}</span>
                </div>:''
            }
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
      render:(price)=><span className='table-entry'>{price}</span>
    },
    {
      title: "24th Volume",
      dataIndex: "volume",
      key: "volume",
      sorter: (a, b) => a.volume - b.volume,
      sortOrder: sortedInfo.columnKey === "volume" ? sortedInfo.order : null,
      ellipsis: true,
      align: "center",
      render:(volume)=><span className='table-entry'>{volume}</span>
    },
    {
      title: "mkt Cop",
      dataIndex: "mktCop",
      key: "mktCop",
      sorter: (a, b) => a.mktCop.length - b.mktCop.length,
      sortOrder: sortedInfo.columnKey === "mktCop" ? sortedInfo.order : null,
      ellipsis: true,
      align: "center",
      responsive: ["lg"],
      render:(mktCop)=><span className='table-entry'>{mktCop}</span>
    },
    {
      title: "sevenDays",
      dataIndex: "sevenDays",
      key: "sevenDays",
      render: (data) => <h5>Ho</h5>,
      align: "center",
      responsive: ["lg"],
      render:()=><Chart />
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
        await resp.map((currency, index) => {
          data.push({
            key: index,
            number: index + 1,
            coin: currency.name,
            price: "$" + currency.price,
            volume: "$" + currency["1d"].volume,
            mktCop: "$" + currency["1d"].market_cap_change,
            logo: currency.logo_url,
            symbol:currency.symbol,
          });
          return 0;
        });

        setCryptoData(data);
      });
  }, [1]);

  return (

    <Table
      pagination={false}
      columns={columns}
      className='ant-table-tbody'
      dataSource={cryptoData}
      onChange={handleChange}
      rowClassName='highlight-bottom-border'
      sticky
    />

    );
};

export default CryptoTable;
