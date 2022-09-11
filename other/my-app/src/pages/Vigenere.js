import { useState } from "react";
import React, { Component } from "react";
import axios from "axios";

const encryptUrl = "http://localhost:8000/classic/encrypt/vigenere";
const decryptUrl = "http://localhost:8000/classic/decrypt/vigenere";
const analysisUrl = "http://127.0.0.1:8000/classic/analyse/ceasar";

const Vigenere = () => {
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

	const addInputForKey = (val) => {
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
			key: (valueA),
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
										<textarea
											onChange={addInputForKey}
											className="form-control"
											id="key-1"
											name="key"
											rows="6"
											placeholder="Key"
											style={{ height: "50px" }}
										></textarea>
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

export default Vigenere;
