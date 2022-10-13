import React from "react";
import Plot from "react-plotly.js";

const Plotly2 = (props) => {
	let dict = [
		[
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
			1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1,
			2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2,
			3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3,
			4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4,
			5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5,
			6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6,
			7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7,
			8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
		],
		[
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
			3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6,
			6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9,
			9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11,
			11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14,
			14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16,
			16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18,
			18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
			21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23,
			23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25,
			25, 25, 25, 25,
		],
		[
			"b",
			"d",
			"e",
			"g",
			"h",
			"h",
			"j",
			"m",
			"k",
			"d",
			"d",
			"e",
			"g",
			"h",
			"h",
			"j",
			"m",
			"k",
			"n",
			"e",
			"e",
			"g",
			"h",
			"h",
			"j",
			"m",
			"k",
			"n",
			"o",
			"e",
			"g",
			"h",
			"h",
			"j",
			"m",
			"k",
			"n",
			"o",
			"o",
			"g",
			"h",
			"h",
			"j",
			"m",
			"k",
			"n",
			"o",
			"o",
			"q",
			"i",
			"h",
			"j",
			"m",
			"k",
			"n",
			"o",
			"o",
			"q",
			"s",
			"h",
			"j",
			"m",
			"k",
			"n",
			"o",
			"o",
			"q",
			"s",
			"r",
			"j",
			"m",
			"k",
			"n",
			"o",
			"o",
			"q",
			"s",
			"r",
			"t",
			"m",
			"k",
			"n",
			"o",
			"o",
			"q",
			"s",
			"r",
			"t",
			"w",
			"l",
			"n",
			"o",
			"o",
			"q",
			"s",
			"r",
			"t",
			"w",
			"v",
			"m",
			"o",
			"o",
			"q",
			"s",
			"r",
			"t",
			"w",
			"v",
			"w",
			"o",
			"o",
			"q",
			"s",
			"r",
			"t",
			"w",
			"v",
			"w",
			"y",
			"m",
			"q",
			"s",
			"r",
			"t",
			"w",
			"v",
			"w",
			"y",
			"w",
			"r",
			"s",
			"r",
			"t",
			"w",
			"v",
			"w",
			"y",
			"w",
			"b",
			"p",
			"r",
			"t",
			"w",
			"v",
			"w",
			"y",
			"w",
			"b",
			"z",
			"o",
			"t",
			"w",
			"v",
			"w",
			"y",
			"w",
			"b",
			"z",
			"y",
			"p",
			"w",
			"v",
			"w",
			"y",
			"w",
			"b",
			"z",
			"y",
			"z",
			"s",
			"v",
			"w",
			"y",
			"w",
			"b",
			"z",
			"y",
			"z",
			"c",
			"r",
			"w",
			"y",
			"w",
			"b",
			"z",
			"y",
			"z",
			"c",
			"b",
			"s",
			"y",
			"w",
			"b",
			"z",
			"y",
			"z",
			"c",
			"b",
			"c",
			"t",
			"w",
			"b",
			"z",
			"y",
			"z",
			"c",
			"b",
			"c",
			"d",
			"u",
			"b",
			"z",
			"y",
			"z",
			"c",
			"b",
			"c",
			"d",
			"e",
			"v",
			"z",
			"y",
			"z",
			"c",
			"b",
			"c",
			"d",
			"e",
			"f",
			"w",
			"y",
			"z",
			"c",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"x",
			"z",
			"c",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"y",
			"c",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"i",
			"z",
		],
	];
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
			layout={{ width: 600, height: 480, title: "dict" }}
		/>
	);
};

export default Plotly2