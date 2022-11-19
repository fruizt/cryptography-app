import { useEffect, useState } from "react";
import React, { Component } from "react";
import axios from "axios";
import Plotly from "../Components/Plotly";
import Plotly2 from "../Components/Plotly2";

const testURL = "http://localhost:80";
const prod = "https://quickstart-image-b6b23rgmpa-uc.a.run.app";

const graphtUrl = prod + "/modern/encrypt/gamma_graph";
const encryptUrl = prod + "/modern/encrypt/gamma_pentagonal";
const decryptUrl = prod + "/modern/decrypt/gamma_pentagonal";
const suggestUrl = prod + "/modern/encrypt/gamma_suggest";

const GammaPentagonal = () => {
	const [clearText, setClearText] = useState("");
	const [option, setOption] = useState("E");
	const [encryptText, setencryptText] = useState("");
	const [suggestKey, setsuggestKey] = useState("");
	const [wordSize, setWordSize] = useState("4");
	const [keyValue, setkeyValue] = useState("0-1-2-3-4-5-6-7-8-9");
	const [initialPoints, setinitialPoints] = useState("0,0");
	const [linePlot, setlinePlot] = useState([]);
	const [matrixPlot, setmatrixPlot] = useState([]);
	const [scatterPlot, setscatterPlot] = useState([]);

	const addInput = (val) => {
		setClearText(val.target.value);
		console.log(clearText);
	};

	const addKey = (val) => {
		setkeyValue(val.target.value);
		console.log(val.target.value);
	};

	const changeWordSize = (val) => {
		setWordSize(val.target.value);
		console.log(">> word size:", val.target.value);
	};

	const addInitialValues = (val) => {
		setinitialPoints(val.target.value);
		console.log(val.target.value);
	};

	const addOption = (val) => {
		setOption(val.target.value);
		console.log(val.target.value);
	};

	const suggest = () => {
		axios.post(suggestUrl).then((response) => {
			setkeyValue(response.data.suggest);
			console.log(response.data);
		});
	};

	const clear = () => {
		setClearText("");
		setencryptText("");
	};

	const copyText = (val) => {
		console.log(encryptText);

		setClearText(encryptText);
	};

	const cipher = () => {
		let data = {
			text: clearText,
			init: initialPoints,
			permutation: keyValue, // creo que es mejor que se reciba la permutacion asi 0123456789
			m: wordSize
		};
		console.log(data);

		if (option === "E") {
			axios.post(encryptUrl, data).then((response) => {
				console.log(">>response", response);
				setencryptText(response.data.encryptText);
				console.log(">> text:", response.data.encryptText.substr(0));
			});
		} else {
			axios.post(decryptUrl, data).then((response) => {
				setencryptText(response.data.encryptText);
				console.log(response.data.result);
			});
		}
	};

	const graph = () => {
		let data = {
			init: initialPoints,
			permutation: keyValue,
			text: "",
			m: wordSize
		};
		axios.post(graphtUrl, data).then((response) => {
			setlinePlot(response.data.linePlot);
			setmatrixPlot(response.data.matrixPlot);
			setscatterPlot(response.data.scatterPlot);
			console.log("response Graph", response.data);
			// console.log("response lineplot", response.data.matrixPlot);
		});
	};

	useEffect(() => {
		graph();
	}, []);

	return (
		<div>
			<section className="py-5">
				<div className="container py-5">
					<div className="row mb-5">
						<div className="col-md-8 col-xl-6 text-center mx-auto">
							<p className="fw-bold text-success mb-2">Encryption system</p>
							<h2 className="fw-bold">Gamma Pentagonal</h2>
						</div>
					</div>
					<div className="row mb-5" style={{ marginTop: "48px" }}>
						<div className="col-md-8 col-xl-6 text-center mx-auto">{/* <Plotly /> */}</div>
					</div>
					<div className="row d-flex justify-content-center">
						<div className="col-md-6 col-xl-0">
							<div>
								<form className="p-3 p-xl-4" method="post">
									<div className="mb-3" style={{ borderRadius: "15px" }}>
										<Plotly props={[scatterPlot, linePlot]} />
									</div>
								</form>
							</div>
						</div>
						<div className="col-md-6 col-xl-0">
							<div>
								<form className="p-3 p-xl-4" method="post">
									<div className="mb-3">
										<Plotly2 props={matrixPlot} />
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="row d-flex justify-content-center">
						<div className="col-md-6 col-xl-4">
							<div>
								<form className="p-3 p-xl-4" method="post">
									<div className="mb-3">
										<h6 className="fw-bold mb-0">Max Word Size:</h6>
										<input
											onChange={changeWordSize}
											className="form-control"
											type="text"
											id="name-1"
											name="Key_encrypt"
											placeholder="Example: 4"
											value={wordSize}
										/>
									</div>
									<div>
										<div
											onClick={() => {
												// cipher();
												graph();
											}}
											className="btn btn-primary shadow d-block w-100"
											title="if not written it will be auto generated"
										>
											Set Word Size{" "}
										</div>
									</div>
									<div className="mb-3">
										<h6 className="fw-bold mb-0">Permutation:</h6>
										<input
											onChange={addKey}
											className="form-control"
											type="text"
											id="name-1"
											name="Key_encrypt"
											placeholder="Example: 12345678"
											value={keyValue}
										/>
									</div>
									<div>
										<div
											onClick={() => {
												// cipher();
												graph();
											}}
											className="btn btn-primary shadow d-block w-100"
											title="if not written it will be auto generated"
										>
											Set Permutation{" "}
										</div>
									</div>

									<div className="mb-3"></div>

									<div className="mb-3">
										<h6 className="fw-bold mb-0">Text:</h6>
										<textarea
											onChange={addInput}
											className="form-control"
											id="message-1"
											name="message"
											rows="6"
											placeholder="Message"
											style={{ height: "200px" }}
											value={clearText}
										></textarea>
									</div>

									<div className="mb-3"></div>

									<div className="mb-3">
										<h6 className="fw-bold mb-0">Option:</h6>
										<select onChange={addOption} className="form-select" name="option_encrypt">
											<option value="E" selected="">
												Encrypt
											</option>
											<option value="D">Decrypt</option>
										</select>
									</div>
									<div className="mb-3"></div>
									<div>
										<div onClick={cipher} className="btn btn-primary shadow d-block w-100">
											Send{" "}
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="col-md-6 col-xl-4">
							<div>
								<form className="p-3 p-xl-4" method="post">
									<div className="mb-3">
										<h6 className="fw-bold mb-0">Initial Points:</h6>
										<input
											onChange={addInitialValues}
											className="form-control"
											type="text"
											id="name-1"
											name="Key_encrypt"
											placeholder="Example: 0,0"
											value={initialPoints}
										/>
									</div>
									<div>
										<div
											onClick={() => {
												// cipher();
												graph();
											}}
											className="btn btn-primary shadow d-block w-100"
											title="if not written it will be auto generated"
										>
											Set Initial Points{" "}
										</div>
									</div>

									
									<div className="mb-3">
										<div style={{ marginTop: "20px" }}>
											<div onClick={suggest} className="btn btn-primary shadow d-block w-100">
												Suggest Permutation
											</div>
										</div>
									</div>
									<div style={{ marginTop: "20px" }}>
										<div onClick={clear} className="btn btn-primary shadow d-block w-100">
											Clear{" "}
										</div>
									</div>
									<div className="mb-3"></div>
									<div className="mb-3">
										<h6 className="fw-bold mb-0">Text result:</h6>
										<textarea
											value={encryptText}
											className="form-control"
											id="message-3"
											name="message"
											rows="6"
											style={{ height: "200px" }}
											readOnly=""
										></textarea>
									</div>
									<div className="mb-3"></div>
									<div className="mb-3"></div>
									<div>
										<div onClick={copyText} className="btn btn-primary shadow d-block w-100">
											Copy Text{" "}
										</div>
									</div>
									<div className="mb-3"></div>
									<div className="mb-3"></div>
									<div className="mb-1"></div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default GammaPentagonal;
