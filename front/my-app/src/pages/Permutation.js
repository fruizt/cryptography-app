import { useState } from "react";
import React, { Component } from "react";
// import { cipherText } from '../api_services/permutation';
import axios from "axios";

const encryptUrl = "https://quickstart-image-b6b23rgmpa-uc.a.run.app/classic/encrypt/permutation";
const decryptUrl = "https://quickstart-image-b6b23rgmpa-uc.a.run.app/classic/decrypt/permutation";
const suggestUrl =
	"https://quickstart-image-b6b23rgmpa-uc.a.run.app/classic/suggestKey/permutation";

const Permutation = () => {
	const [clearText, setClearText] = useState("");
	const [keyValue, setkeyValue] = useState("");
	const [sizeKey, setSizeKey] = useState(2);
	const [option, setOption] = useState("E");
	const [encryptText, setencryptText] = useState("");
	const [suggestKey, setsuggestKey] = useState("");

	const addInput = (val) => {
		setClearText(val.target.value);
		console.log(clearText);
	};
	const addKey = (val) => {
		setkeyValue(val.target.value);
		console.log(val.target.value);
	};
	const addSizeKey = (val) => {
		setSizeKey(val.target.value);
		console.log(val.target.value);
	};
	const addOption = (val) => {
		setOption(val.target.value);
		console.log(val.target.value);
	};

	const cipher = () => {
		let data = {
			text: clearText,
			key: keyValue,
			key_size: parseInt(sizeKey),
		};
		console.log(data);

		if (option === "E") {
			axios.post(encryptUrl, data).then((response) => {
				setencryptText(response.data.result);
				console.log(response.data.result);
			});
		} else {
			axios.post(decryptUrl, data).then((response) => {
				setencryptText(response.data.result);
				console.log(response.data.result);
			});
		}
	};

	const suggest = () => {
		let data = {
			m: parseInt(sizeKey),
		};
		console.log(parseInt(sizeKey));
		axios.post(suggestUrl, data).then((response) => {
			setsuggestKey(response.data.result);
			console.log(response.data.result);
		});
	};

	return (
		<div>
			<section className="py-5">
				<div className="container py-5">
					<div className="row mb-5">
						<div className="col-md-8 col-xl-6 text-center mx-auto">
							<p className="fw-bold text-success mb-2">Classical Encryption system</p>
							<h2 className="fw-bold">Permutation Encryption</h2>
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
										<input
											onChange={addKey}
											className="form-control"
											type="text"
											id="name-1"
											name="Key_encrypt"
											placeholder="example: 43521 (size 5)"
										/>
									</div>
									<div className="mb-3">
										<h6 className="fw-bold mb-0">Size key:</h6>
										<input
											onChange={addSizeKey}
											className="form-control"
											type="number"
											min="1"
											id="name-1"
											name="Key_encrypt"
											placeholder="example: 5"
										/>
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
									<div className="mb-3">
										<div>
											<div onClick={suggest} className="btn btn-primary shadow d-block w-100">
												Suggest Key
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
									</div>
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
											className="form-control"
											id="message-2"
											name="message"
											rows="6"
											placeholder="Message"
											style={{ height: "200px" }}
										></textarea>
									</div>
									<div>
										<button className="btn btn-primary shadow d-block w-100" type="submit">
											Try
										</button>
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

export default Permutation;
