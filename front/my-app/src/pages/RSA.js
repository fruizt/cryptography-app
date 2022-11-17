import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const testURL = "http://localhost:8000";
const prod = "https://quickstart-image-b6b23rgmpa-uc.a.run.app/";

const suggestKeyURL = testURL + "/public/suggest/keyrsa";
const encryptTextURL = testURL + "/public/encrypt/rsa";
const decryptTextURL = testURL + "/public/decrypt/rsa";

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

const RSA = () => {
	const [clearTextText, setClearTextText] = useState("");
	const [nKey, setNKey] = useState("");
	const [eKey, setEKey] = useState("");
	const [pKey, setPKey] = useState("");
	const [qKey, setQKey] = useState("");
	const [dKey, setDKey] = useState("");
	const [optionText, setOptionText] = useState("E");
	const [encryptTextText, setencryptTextText] = useState("");
	const [open, setOpen] = React.useState(false);

	
	const handleClose = () => setOpen(false);

	const addEKey = (val) => {
		setEKey(val.target.value);
	};
	const addNKey = (val) => {
		setNKey(val.target.value);
	};
	const addDKey = (val) => {
		setDKey(val.target.value);
	};
	const addPKey = (val) => {
		setPKey(val.target.value);
	};

	const addQKey = (val) => {
		setQKey(val.target.value);
	};
	const getRandomKey=() =>{

		axios.post(suggestKeyURL,{}).then((response) => {
			setEKey(response.data.public.e);
			setNKey(response.data.public.n);
			setPKey(response.data.private.p);
			setQKey(response.data.private.q);
			setDKey(response.data.private.d)
			console.log(response.data);
			setOpen(true);
		});
		
		
	}



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
	const cipherText = () => {
		

		if (optionText === "E") {
			let data = {
				text: clearTextText,
				e: eKey,
				n: nKey,
			};
			axios.post(encryptTextURL, data).then((response) => {
				setencryptTextText(response.data.encrypt);
			});
		} else {
			let data = {
				text: clearTextText,
				e: eKey,
				d: dKey,
				p: pKey,
				q: qKey,
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
							<li>
								Private key " d ":{ " "}
								<input
									type="text"
									id="uname"
									name="name"
									value={dKey}
									readonly
									style={{ border: "none", background: "transparent", color: "white" }}
								/>
							</li>
							<li>
								P:{" "}
								<input
									type="text"
									id="uname"
									name="name"
									value={pKey}
									readonly
									style={{ border: "none", background: "transparent", color: "white" }}
								/>
							</li>
							<li>
								Q:{" "}
								<input
									type="text"
									id="uname"
									name="name"
									value={qKey}
									readonly
									style={{ border: "none", background: "transparent", color: "white" }}
								/>
							</li>
						</ul>
					</Typography>
					
					<div>
						<div onClick={cipherText} className="btn btn-primary shadow d-block w-100">
							Copy{" "}
						</div>
						<p> </p>
						<div onClick={cipherText} className="btn btn-primary shadow d-block w-100">
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
								<h2 className="fw-bold">RSA Encryption </h2>
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
													{optionText=="E" &&
													<div>
													<h6 className="fw-bold mb-0">Public key</h6>
													<row>
													<column>
														<h6 className="fw-bold mb-0">n:</h6>
														<input
															onChange={addNKey}
															className="form-control"
															type="text"
															id="name-1"
															name="Key_encrypt"
															placeholder="value of n"
															value={nKey}
														/>
													</column>
													<column>
														<h6 className="fw-bold mb-0">e:</h6>
														<input
															onChange={addEKey}
															className="form-control"
															type="text"
															id="name-1"
															name="Key_encrypt"
															placeholder="exponent"
															value={eKey}
														/>
													</column>
												</row>
												</div>
													}
													{optionText=="D" &&
													<div>
													<h6 className="fw-bold mb-0">Private key</h6>
													<row>
													<column>
														<h6 className="fw-bold mb-0">d:</h6>
														<input
															onChange={addDKey}
															className="form-control"
															type="password"
															id="name-1"
															name="Key_encrypt"
															placeholder="inverse of e"
															value={dKey}
														/>
													</column>
													<column>
														<h6 className="fw-bold mb-0">p:</h6>
														<input
															onChange={addPKey}
															className="form-control"
															type="password"
															id="name-1"
															name="Key_encrypt"
															
															value={pKey}
														/>
													</column>
													<column>
														<h6 className="fw-bold mb-0">q:</h6>
														<input
															onChange={addQKey}
															className="form-control"
															type="password"
															id="name-1"
															name="Key_encrypt"
															
															value={qKey}
														/>
													</column>
												</row>
												</div>
													}
												</div>
													
											<div
												onClick={getRandomKey}
												className="btn btn-primary shadow d-block w-100"
												style={{ marginBottom: "20px" }}
											>
												Random key 
												</div> 
											<div className="mb-3">
												<div><div onClick={copyText} className="btn btn-primary shadow d-block w-100" >{"<- Copy"}</div></div>	
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

export default RSA;
