import React from "react";
import Plot from "react-plotly.js";

const Plotly = (props) => {
	const lines = [
		[
			[0, 1, 2, 3, 4, 5],
			[0, 0, 1, 3, 6, 10],
		],
		[
			[5, 6, 7, 8, 9, 10],
			[10, 10, 11, 13, 16, 20],
		],
		[
			[4, 5, 6, 7, 8, 9],
			[6, 6, 7, 9, 12, 16],
		],
		[
			[3, 4, 5, 6, 7, 8],
			[3, 3, 4, 6, 9, 13],
		],
		[
			[2, 3, 4, 5, 6, 7],
			[1, 1, 2, 4, 7, 11],
		],
		[
			[1, 2, 3, 4, 5, 6],
			[0, 0, 1, 3, 6, 10],
		],
		[
			[6, 7, 8, 9, 10, 11],
			[10, 10, 11, 13, 16, 20],
		],
		[
			[7, 8, 9, 10, 11, 12],
			[11, 11, 12, 14, 17, 21],
		],
		[
			[8, 9, 10, 11, 12, 13],
			[13, 13, 14, 16, 19, 23],
		],
		[
			[9, 10, 11, 12, 13, 14],
			[16, 16, 17, 19, 22, 26],
		],
		[
			[10, 11, 12, 13, 14, 15],
			[20, 20, 21, 23, 26, 30],
		],
		[
			[5, 6, 7, 8, 9],
			[6, 6, 7, 9, 12],
		],
		[
			[6, 7, 8, 9, 10],
			[7, 7, 8, 10, 13],
		],
		[
			[7, 8, 9, 10, 11],
			[9, 9, 10, 12, 15],
		],
		[
			[8, 9, 10, 11, 12],
			[12, 12, 13, 15, 18],
		],
		[
			[4, 5, 6, 7],
			[3, 3, 4, 6],
		],
		[
			[5, 6, 7, 8],
			[4, 4, 5, 7],
		],
		[
			[6, 7, 8, 9],
			[6, 6, 7, 9],
		],
		[
			[3, 4, 5],
			[1, 1, 2],
		],
		[
			[4, 5, 6],
			[2, 2, 3],
		],
		[
			[2, 3],
			[0, 0],
		],
	];
	let trace = [
		{
			x: [
				15, 4, 3, 5, 4, 12, 5, 8, 8, 1, 10, 11, 11, 7, 13, 7, 4, 3, 3, 5, 12, 5, 12, 8, 9, 9, 8, 9,
				2, 11, 10, 6, 10, 7, 6, 7, 13, 6, 6, 4, 5, 0, 8, 9, 9, 2, 14, 10, 8, 10, 11, 6, 7, 7,
			],
			y: [
				30, 3, 1, 4, 6, 19, 10, 9, 12, 0, 12, 17, 20, 7, 23, 10, 2, 0, 3, 6, 21, 3, 18, 11, 10, 16,
				8, 13, 1, 16, 14, 4, 20, 9, 7, 6, 22, 10, 3, 1, 2, 0, 7, 9, 12, 0, 26, 13, 13, 16, 15, 6, 5,
				11,
			],
			type: "scatter",
			mode: "markers",
			marker: { color: "red" },
		},
	];
	for (let line of lines) {
		const dict = { x: line[0], y: line[1], type: "scatter", mode: "lines",marker:{color:"blue"} };
		trace.push(dict);
	}

	return (
		<Plot data={trace} layout={{ width: 600, height: 480, title: "Grafo", showlegend: false }} />
	);
};

export default Plotly;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: [], layout: {}, frames: [], config: {} };
	}

	render() {
		return (
			<Plot
				data={this.state.data}
				layout={this.state.layout}
				frames={this.state.frames}
				config={this.state.config}
				onInitialized={(figure) => this.setState(figure)}
				onUpdate={(figure) => this.setState(figure)}
			/>
		);
	}
}

//Por defecto podemos dejar el un estado base para que siempre salga algo
