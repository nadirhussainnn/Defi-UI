import React, { Component } from "react";
import moment from "moment";
import LineChart from "./LineChart";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
    };
  }

  componentDidMount() {
    const getData = () => {
      
      //Random numbers between 100 to 1000 with 2 decimal places
      const bpi = {

        "2022-06-30": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-01": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-02": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-03": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-04": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-05": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-06": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-07": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-08": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-09": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-10": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-08": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-09": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-10": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-11": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-12": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-13": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-14": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-15": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-16": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-17": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-18": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-19": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-20": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-21": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-22": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-23": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-24": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-25": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-26": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-27": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-28": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-29": Math.floor(Math.random()*(1000-990+1)+990),
        "2022-07-30": Math.floor(Math.random()*(1000-990+1)+990),
      };

      const sortedData = [];
      let count = 0;
      for (let date in bpi) {
        sortedData.push({
          d: moment(date).format("MMM DD"),
          p: bpi[date],
          x: count, //previous days
          y: bpi[date], // numerical price
        });
        count++;
      }

      this.setState({
        data: sortedData,
        fetchingData: false,
      });
    };
    getData();
  }
  render() {
    return (
      <div className="container">
        {!this.state.fetchingData ? <LineChart data={this.state.data} index={this.props.index}/> : null}
      </div>
    );
  }
}

export default Chart;
