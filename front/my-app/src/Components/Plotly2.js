import React, { useEffect } from "react";
import Plot from "react-plotly.js";

const Plotly2 = (props) => {
	
	let dict = props.props
	console.log(">> got called")
	return (
		<Plot
			data={[
				{
					x: dict[0],
					y: dict[1],
					text: dict[2],
					textposition:"middle left",
					type: "scatter",
					mode: "markers+text",
					marker: { color: "red" },
					
				},
			]}
			layout={{ width: 600, height: 480, title: "Grid" }}
			config={{responsive: true}}
		/>
	);
};

export default Plotly2