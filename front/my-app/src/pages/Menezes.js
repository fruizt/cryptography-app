import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const testURL = "http://localhost:8000";
const prod = "https://quickstart-image-b6b23rgmpa-uc.a.run.app/";

const suggestKeyURL = prod + "/public/suggest/keyGamalMenezes";
const encryptTextURL = prod + "/public/encrypt/elGamalMenezes";
const decryptTextURL = prod + "/public/decrypt/elGamalMenezes";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "#282c34",
	border: "2px #000",
	borderRadius: 10,
	boxShadow: 24,
	p: 4,
};

const Menezes = () => {
	const [clearTextText, setClearTextText] = useState("");
	const [alphaKey, setAlphaKey] = useState("");

	const [betaKey, setBetaKey] = useState("");
	const [aKey, setAKey] = useState("");
	const [optionText, setOptionText] = useState("E");
	const [encryptTextText, setencryptTextText] = useState("");
	const [open, setOpen] = React.useState(false);

	const handleClose = () => setOpen(false);

	const addAlphaKey = (val) => {
		setAlphaKey(val.target.value);
	};
	const addAKey = (val) => {
		setAKey(val.target.value);
	};

	const addBetaKey = (val) => {
		setBetaKey(val.target.value);
	};
	const getRandomKey = () => {
		axios.post(suggestKeyURL, {}).then((response) => {
			setAlphaKey(response.data.public.alpha);

			setBetaKey(response.data.public.beta);
			setAKey(response.data.private.a);

			console.log(response.data);
			setOpen(true);
		});
	};

	const copyText = (val) => {
		setClearTextText(encryptTextText);
	};
	const addInputText = (val) => {
		setClearTextText(val.target.value);
	};

	const addOptionText = (val) => {
		setOptionText(val.target.value);
		console.log(val.target.value);
	};

	const download = (filename) => {
		const text = { a: aKey, beta: betaKey, alpha: alphaKey };
		const element = document.createElement("a");	
		const date = Date.now();
		element.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(text))
		);
		element.setAttribute("download", "secret" + date);
		element.style.display = "none";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	const showSecret = () => {
		const elements = document.getElementsByClassName("form-control password");
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].type === "password") {
				elements[i].type = "text";
			} else {
				elements[i].type = "password";
			}
		}
	};

	const cipherText = () => {
		if (optionText === "E") {
			let data = {
				text: clearTextText,
				alpha: alphaKey,
				beta: betaKey,
			};
			axios.post(encryptTextURL, data).then((response) => {
				setencryptTextText(response.data.encrypt);
			});
		} else {
			let data = {
				text: clearTextText,
				a: aKey,
			};
			axios.post(decryptTextURL, data).then((response) => {
				setencryptTextText(response.data.decrypt);
				console.log(response.data.decrypt);
			});
		}
	};

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Confidencial information
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Save your credentials for decrypt your information level.
						<ul>
							<li>Private key : </li>
							<li>
								a:{" "}
								<input
									type="text"
									id="uname"
									name="name"
									value={aKey}
									readonly
									style={{ border: "none", background: "transparent", color: "white" }}
								/>
							</li>
						</ul>
					</Typography>

					<div>
						<div onClick={download} className="btn btn-primary shadow d-block w-100">
							Download{" "}
						</div>
					</div>
				</Box>
			</Modal>
			<div>
				<section className="py-5">
					<div className="container py-5">
						<div className="row mb-5">
							<div className="col-md-8 col-xl-6 text-center mx-auto">
								<p className="fw-bold text-success mb-2">Pulbic key system</p>
								<h2 className="fw-bold">Menezes-Vanstone Encryption </h2>
							</div>
						</div>
						<div className="row d-flex justify-content-center">
							<div className="col-md-6 col-xl-4">
								<div>
									<form className="p-3 p-xl-4">
										<div className="mb-3">
											<h6 className="fw-bold mb-0">Text:</h6>
											<textarea
												onChange={addInputText}
												className="form-control"
												id="message-1"
												name="message"
												rows="6"
												placeholder="Message"
												style={{ height: "200px" }}
												value={clearTextText}
											></textarea>
										</div>
										<div className="mb-3">
											<h6 className="fw-bold mb-0">Option:</h6>
											<select
												onChange={addOptionText}
												className="form-select"
												style={{ marginBottom: "20px" }}
												name="option_encrypt"
											>
												<option value="E" selected="">
													Encrypt
												</option>
												<option value="D">Decrypt</option>
											</select>
										</div>

										<div>
											<div onClick={cipherText} className="btn btn-primary shadow d-block w-100">
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
												value={encryptTextText}
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
											<div className="mb-3">
												{optionText == "E" && (
													<div>
														<h6 className="fw-bold mb-0">Public key</h6>
														<row>
															<column>
																<h6 className="fw-bold mb-0">alpha:</h6>
																<input
																	onChange={addAlphaKey}
																	className="form-control"
																	type="text"
																	id="name-1"
																	name="Key_encrypt"
																	placeholder=""
																	value={alphaKey}
																/>
															</column>

															<column>
																<h6 className="fw-bold mb-0">Beta:</h6>
																<input
																	onChange={addBetaKey}
																	className="form-control"
																	type="text"
																	id="name-1"
																	name="Key_encrypt"
																	value={betaKey}
																/>
															</column>
														</row>
													</div>
												)}
												{optionText == "D" && (
													<div>
														<h6 className="fw-bold mb-0">Private key</h6>
														<row>
															<column>
																<h6 className="fw-bold mb-0">x:</h6>
																<input
																	onChange={addAKey}
																	className="form-control password"
																	type="password"
																	id="name-1"
																	name="Key_encrypt"
																	placeholder="inverse of e"
																	value={aKey}
																/>
															</column>
														</row>
														<h6 className="fw-bold mb-0">
															<input type="checkbox" onclick={showSecret} onChange={showSecret} />{" "}
															show secret{" "}
														</h6>
													</div>
												)}
											</div>

											<div
												onClick={getRandomKey}
												className="btn btn-primary shadow d-block w-100"
												style={{ marginBottom: "20px" }}
											>
												Random key
											</div>
											<div className="mb-3">
												<div>
													<div onClick={copyText} className="btn btn-primary shadow d-block w-100">
														{"<- Copy"}
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Menezes;
