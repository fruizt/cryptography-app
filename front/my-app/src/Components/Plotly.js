import React from "react";
import Plot from "react-plotly.js";

const Plotly = (props) => {
	const lines = props.props[1];
	let trace = [
		{
			x: props.props[0][0],
			y: props.props[0][1],
			type: "scatter",
			mode: "markers",
			marker: { color: "red" },
		},
	];
	for (let line of lines) {
		const dict = {
			x: line[0],
			y: line[1],
			type: "scatter",
			mode: "lines",
			marker: { color: "blue" },
		};
		trace.push(dict);
	}

	return (
		<Plot
			data={trace}
			layout={{
				width: 600,
				height: 480,
				title: "Graph",
				showlegend: false,
				plot_bgcolor: "#ffffff",
				paper_bgcolor: "#ffffff",
			}}
			config={{ responsive: true }}
		/>
	);
};

export default Plotly;

// class Plotlytest extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { data: [], layout: {}, frames: [], config: {} };
// 	}

// 	render() {
// 		return (
// 			<Plot
// 				data={this.state.data}
// 				layout={this.state.layout}
// 				frames={this.state.frames}
// 				config={this.state.config}
// 				onInitialized={(figure) => this.setState(figure)}
// 				onUpdate={(figure) => this.setState(figure)}
// 			/>
// 		);
// 	}
// }

//Por defecto podemos dejar el un estado base para que siempre salga algo
