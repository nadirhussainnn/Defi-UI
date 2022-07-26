/**
 * @author Nadir
 * @version 1.0
 */

import React, { Component } from "react";
import "../styles/styles.css";

export default class LineChart extends Component {
  getX() {
    const { data } = this.props;
    return {
      min: data[0].x,
      max: data[data.length - 1].x,
    };
  }
  getY() {
    const { data } = this.props;
    return {
      min: data.reduce((min, p) => (p.y < min ? p.y : min), data[0].y),
      max: data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y),
    };
  }

  // Get svg coordinates
  getSvgX(x) {
    const { svgWidth, yLabelSize } = this.props;
    return yLabelSize + (x / this.getX().max) * (svgWidth - yLabelSize);
  }
  getSvgY(y) {
    const { svgHeight, xLabelSize } = this.props;
    const gY = this.getY();
    return (
      ((svgHeight - xLabelSize) * gY.max - (svgHeight - xLabelSize) * y) /
      (gY.max - gY.min)
    );
  }

  // Build SVG path
  makePath() {
    const { data, index } = this.props;
    let pathD =
      "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";

    pathD += data
      .map((point, i) => {
        return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
      })
      .join("");

    return (
      <path
        className="linechart_path"
        d={pathD}
        style={{ stroke: index % 2 == 0 ? "#70c040" : "#FF0000" }}
      />
    );
  }

  render() {
    const { svgHeight, svgWidth } = this.props;

    return (
      <svg
        width={"200px"}
        height={"50px"}
        viewBox={`0 0 ${svgWidth} ${svgHeight - 20}`}
      >
        {this.makePath()}
      </svg>
    );
  }
}


//Default Props
LineChart.defaultProps = {
  data: [],
  color: "#70c040",
  pointRadius: 5,
  svgHeight: 300,
  svgWidth: 900,
  xLabelSize: 20,
  yLabelSize: 80,
};
