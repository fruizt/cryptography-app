import { useState } from "react";
import React, { Component } from "react";
import axios from "axios";


const testURL = 'http://localhost:8000'
const prod = 'https://web-backend.azurewebsites.net/'

const encryptUrl = prod+"/classic/encrypt/ceasar";
const decryptUrl = prod+"/classic/decrypt/ceasar";
const analysisUrl = prod+"/classic/analyse/ceasar";

const Shift = () => {
	const a = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
	];
	const [clearText, setClearText] = useState("");
	const [valueA, setValueA] = useState("0");
	const [option, setOption] = useState("E");
	const [encryptText, setencryptText] = useState("");
	const [cryptoAnalysisText, setCryptoAnalysisText] = useState("");
	const [encryptTextForAnalys, setEncryptTextForAnalys] = useState("");

	const addInput = (val) => {
		setClearText(val.target.value);
		console.log(clearText);
	};

	const addInputToAnalysis = (val) => {
		setCryptoAnalysisText(val.target.value);
		console.log(val.target.value);
	};

	const addValueA = (val) => {
		setValueA(val.target.value);
		console.log(val.target.value);
	};

	const addOption = (val) => {
		setOption(val.target.value);
		console.log(val.target.value);
	};

	const cipher = () => {
		let data = {
			text: clearText,
			key: parseInt(valueA),
		};
		console.log(data);

		if (option === "E") {
			axios.post(encryptUrl, data).then((response) => {
				console.log(">>response", response);
				setencryptText(response.data.text);
				console.log(response.data.text);
			});
		} else {
			axios.post(decryptUrl, data).then((response) => {
				setencryptText(response.data.text);
				console.log(response.data.result);
			});
		}
	};

	const analyse = () => {
		let data = {
			text: cryptoAnalysisText,
			key:0
		};

		axios.post(analysisUrl, data).then((response) => {
			console.log(">>response", response);
			for (let x = 0; x < response.data.text.length; x++) console.log(response.data.text[x]);
			let dat = { text: "try", key: 1 };
			setEncryptTextForAnalys(JSON.stringify(response.data.text));
			// console.log(response.data.text);
		});
	};

	return (
		<div>
			<section className="py-5">
				<div className="container py-5">
					<div className="row mb-5">
						<div className="col-md-8 col-xl-6 text-center mx-auto">
							<p className="fw-bold text-success mb-2">Classical Encryption system</p>
							<h2 className="fw-bold">Shift Encryption</h2>
						</div>
					</div>
					<div className="row d-flex justify-content-center">
						<div className="col-md-6 col-xl-4">
							<div>
								<form className="p-3 p-xl-4">
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
										<h6 className="fw-bold mb-0">Key:</h6>
										<row>
											<column>
												{/* <h6 className="fw-bold mb-0">a:</h6> */}
												<select onChange={addValueA} className="form-select" name="option_encrypt">
													{a.map((number) => {
														return (
															<option value={number} selected="">
																{number}
															</option>
														);
													})}
												</select>
											</column>
										</row>
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
								<form className="p-3 p-xl-4">
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
									{/* <div className="mb-3">
                                <div><div  onClick={suggest} className="btn btn-primary shadow d-block w-100" >Suggest Key</div></div>
                                <div><input value={suggestKey} className="form-control" type="text" id="name-3" name="Key_encrypt" readOnly=""/></div>
                            </div> */}
								</form>
							</div>
						</div>
					</div>
					<div className="row mb-5" style={{ marginTop: "48px" }}>
						<div className="col-md-8 col-xl-6 text-center mx-auto">
							<p className="fw-bold text-success mb-2" style={{ fontSize: "25px" }}>
								Cryptoanalysis
							</p>
						</div>
					</div>
					<div className="row d-flex justify-content-center">
						<div className="col-md-6 col-xl-4">
							<div>
								<form className="p-3 p-xl-4" method="post">
									<div className="mb-3">
										<h6 className="fw-bold mb-0">Text:</h6>
										<textarea
											onChange={addInputToAnalysis}
											className="form-control"
											id="message-2"
											name="message"
											rows="6"
											placeholder="Message"
											style={{ height: "200px" }}
										></textarea>
									</div>
									<div>
										<div onClick={analyse} className="btn btn-primary shadow d-block w-100">
											Try{" "}
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
											value={encryptTextForAnalys}
											className="form-control"
											id="message-4"
											name="message"
											rows="6"
											style={{ height: "400px" }}
											readOnly=""
										></textarea>
									</div>
									<div className="mb-3"></div>
									<div className="mb-3"></div>
									<div className="mb-3">
										<div></div>
										<div></div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Shift;
