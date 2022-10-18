import { useEffect, useState } from "react";
import React, { Component } from "react";
import axios from "axios";
import Plotly from "../Components/Plotly";
import Plotly2 from "../Components/Plotly2";

const testURL = "http://localhost:8000";
const prod = "https://web-backend-pypy.azurewebsites.net/";

const graphtUrl = testURL + "/modern/encrypt/gamma_graph";
const encryptUrl = testURL + "/modern/encrypt/gamma_pentagonal";
const decryptUrl = testURL + "/modern/decrypt/gamma_pentagonal";
const suggestUrl = "https://web-backend-pypy.azurewebsites.net/classic/suggest/substitution";

const GammaPentagonal = () => {
	const [clearText, setClearText] = useState("");
	const [option, setOption] = useState("E");
	const [encryptText, setencryptText] = useState("");
	const [suggestKey, setsuggestKey] = useState("");
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

	const addOption = (val) => {
		setOption(val.target.value);
		console.log(val.target.value);
	};

	const suggest = () => {
		axios.post(suggestUrl).then((response) => {
			setsuggestKey(response.data.result);
			console.log(response.data.result);
		});
	};

	const copyText = () => {
		navigator.clipboard.writeText(encryptText);
	};

	const cipher = () => {
		let data = {
			text: clearText,
			init: initialPoints,
			permutation: keyValue, // creo que es mejor que se reciba la permutacion asi 0123456789
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
	}, [keyValue]);


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
					{/* asdasd */}
					<div className="row d-flex justify-content-center">
						<div className="col-md-6 col-xl-4">
							<div>
								<form className="p-3 p-xl-4" method="post">
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
										></textarea>
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
										/>
									</div>
									<div className="mb-3"></div>
									<div>
										<div
											onClick={()=>{cipher();graph()}}
											className="btn btn-primary shadow d-block w-100"
											title="if not written it will be auto generated"
										>
											Set Permutation{" "}
										</div>
									</div>
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
									{/* <div className="mb-3">
										<div>
											<div onClick={suggest} className="btn btn-primary shadow d-block w-100">
												Suggest Permutation
											</div>
										</div>
										<div>
											<input
												value={suggestKey}
												className="form-control"
												type="text"
												id="name-3"
												name="Key_encrypt"
												readOnly=""
											/>
										</div>
									</div> */}
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
