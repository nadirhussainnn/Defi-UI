// import React, { useEffect } from "react";
// import * as d3 from "d3";

// const Chart = () => {

//   useEffect(() => {
//     draw();
//   });

//   const draw = () => {
//     var dataset1 = [
//       [1, 1],
//       [12, 20],
//       [24, 36],
//       [32, 50],
//       [40, 70],
//       [50, 100],
//       [55, 106],
//       [65, 123],
//       [73, 130],
//       [78, 134],
//       [83, 136],
//       [89, 138],
//       [100, 140],
//     ];
//     var svg = d3.select("svg"),
//       margin = 200,
//       width = svg.attr("width") - margin-300,   //300
//       height = svg.attr("height") - margin-150; //200

//     var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]),
//       yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);

//     svg
//       .append("g")
//       .selectAll("dot")
//       .data(dataset1)
//       .enter()
//       .append("circle")
//       .attr("cx", function (d) {
//         return xScale(d[0]);
//       })
//       .attr("cy", function (d) {
//         return yScale(d[1]);
//       })
//       .attr("r", 2)
//       .attr("transform", "translate(" + 100 + "," + 100 + ")")
//       .style("fill", "red");

//     var line = d3
//       .line()
//       .x(function (d) {
//         return xScale(d[0]);
//       })
//       .y(function (d) {
//         return yScale(d[1]);
//       })
//       .curve(d3.curveMonotoneX);

//     svg
//       .append("path")
//       .datum(dataset1)
//       .attr("class", "line")
//       .attr("transform", "translate(" + 100 + "," + 100 + ")")
//       .attr("d", line)
//       .style("fill", "none")
//       .style("stroke", "yellow")
//       .style("stroke-width", "2");
//   };
//   return (

//       <svg width="500" height="400"></svg>

//   );
// };

// export default Chart;

/* App.js */

import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
var startTime = 0, endTime = 0;
 
export default class Chart extends Component {
	componentDidMount() {
		endTime = new Date();
		document.getElementById("timeToRender").innerHTML = "Time to Render: " + (endTime - startTime) + "ms";
	}
	
	render() {
		var limit = 100;
		var y = 100;    
		var data = [];
		var dataSeries = { type: "line" };
		var dataPoints = [];
		
		for (var i = 0; i < limit; i += 1) {
			y += Math.round(Math.random() * 10 - 5);
			dataPoints.push({
				x: i,
				y: y
			});
		}
		dataSeries.dataPoints = dataPoints;
		data.push(dataSeries);
				
		const options = {
			zoomEnabled: false,
			animationEnabled: false,
			data: data  // random data
		}
		
		startTime = new Date();
				
		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
		</div>
		);
	} 			
}