import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const testURL = "http://localhost:8000";
const prod = "https://quickstart-image-b6b23rgmpa-uc.a.run.app/";

const suggestKeyURL=testURL + "/signatures/suggestKey/rsa";
const suggestPublicKeyURL = testURL + "/signatures/publicKey/rsa";
const suggestPrivateKeyURL = testURL + "/signatures/privateKey/rsa";
const setPublicKeyURL = testURL + "/signatures/setPublicKey/rsa";
const setPrivateKeyURL = testURL + "/signatures/setPrivateKey/rsa";
const signTextURL = testURL + "/signatures/sign/rsa";
const verifyTextURL = testURL + "/signatures/verify/rsa";

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

const SignRSA = () => {
	
	const [selectedFile, setState] = useState(null);
	const [selectedPublic, setStatePublic] = useState(null);
	const [selectedPrivate, setStatePrivate] = useState(null);
	const [optionKey, setOptionKey] = useState("G");
	const [validationText, setValidationText] = useState("");
	
	const [betaKey, setBetaKey] = useState("");
	const [aKey, setAKey] = useState("");
	const [optionText, setOptionText] = useState("E");
	const [encryptTextText, setencryptTextText] = useState("");
	const [open, setOpen] = React.useState(false);
	
	const [down, setDown] = useState("data:text/plain;charset=utf-8," + encodeURIComponent("Hola"));
	const [down2, setDown2] = useState("data:text/plain;charset=utf-8," + encodeURIComponent("Hola"));

	
	const handleClose = () => setOpen(false);

	const onFileChange = (e) => {
		setState(e.target.files[0]);
	};
	const addSign= (value) => {
		setencryptTextText(value.target.value)
	}
	const onFileChangePrivate= (e) => {
		setStatePrivate(e.target.files[0]);
	};
	const onFileChangePublic= (e) => {
		setStatePublic(e.target.files[0]);
	};
	const addOptionKey =(val) =>{
		console.log(val.target.value)
		setOptionKey(val.target.value)
	}
	

	const getRandomKey=() =>{

		axios.post(suggestKeyURL,{}).then(() => {
			axios.post(suggestPublicKeyURL,{}).then((response) => {				
				
				setDown("data:text/plain;charset=utf-8," + encodeURIComponent(response.data));
				// setOpen(true);
			});
			axios.post(suggestPrivateKeyURL,{}).then((response) => {				
				
				setDown2("data:text/plain;charset=utf-8," + encodeURIComponent(response.data));
				// setOpen(true);
			});

			// setOpen(true);
		});
		
		
	}

	const addOptionText = (val) => {
		var flag=val.target.value;
		if(flag==="E") setencryptTextText("");
		if(flag==="D") setValidationText("");
		setOptionText(val.target.value);
		console.log(val.target.value);
	};
	const cipherText = () => {
		
		if (optionText === "E" && optionKey==="U") {
			setencryptTextText("");
			const formData = new FormData();
			formData.append("file", selectedPrivate);
			// set private Key
			axios.post(setPrivateKeyURL, formData).then((response) => {
				const formData2 = new FormData();
				formData2.append("file", selectedFile);

				//sign document
				axios.post(signTextURL, formData2).then((response) => {
					
					setencryptTextText(response.data);
				});
			});
			
		}
		else if (optionText === "D" && optionKey==="U") {
			setValidationText("");
			const formData = new FormData();
			formData.append("file", selectedPublic);
			// set private Key
			axios.post(setPublicKeyURL, formData).then((response) => {
				console.log("sdds")
				const formData2 = new FormData();
				formData2.append("file", selectedFile);

				//sign document
				axios.post(verifyTextURL, formData2, {
					params: {
						signText: encryptTextText	
					}
				}).then((response) => {
					setValidationText(response.data);
				});
			});
			
		}else if (optionText === "D" ) {
			setValidationText("");
			const formData2 = new FormData();
			formData2.append("file", selectedFile);

			//sign document
			axios.post(verifyTextURL, formData2, {
				params: {
					signText: encryptTextText	
				}
			}).then((response) => {
				setValidationText(response.data);
			});
			
			
		}else {
			setencryptTextText("");
			const formData2 = new FormData();
			formData2.append("file", selectedFile);

			//sign document
			axios.post(signTextURL, formData2).then((response) => {
				setencryptTextText(response.data);
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
								Private key :{ " "}
								
							</li>
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
								<p className="fw-bold text-success mb-2">Digital Signature</p>
								<h2 className="fw-bold">RSA Signature </h2>
							</div>
						</div>
						<div className="row d-flex justify-content-center">
							<div className="col-md-6 col-xl-4">
								<div>
									<form className="p-3 p-xl-4">
										<div className="mb-3">
											<h6 className="fw-bold mb-0">Upload a file:</h6>
											<input
											className="form-control"
											type="file"
											onChange={onFileChange}
											style={{ marginBottom: "20px" }}
										/>
											
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
													Sign
												</option>
												<option value="D">Validate</option>
											</select>
										</div>
										<div className="mb-3">
											
											<h6 className="fw-bold mb-0">Key Option:</h6>
											<select
												onChange={addOptionKey}
												className="form-select"
												style={{ marginBottom: "20px" }}
												name="option_encrypt"
											>
												<option value="G" selected="">
													Generate
												</option>
												<option value="U">Upload</option>
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

											{optionText==="D" &&

												<div>
													<h6 className="fw-bold mb-0">Result Validation:</h6>
													<input
															
															className="form-control"
															type="text"
															id="name-1"
															name="Key_encrypt"
															placeholder=""
															value={validationText}
															disabled
														/>
												</div>

											}
										<h6 className="fw-bold mb-0">Sign:</h6>
											<input
													onChange={addSign}
													className="form-control"
													type="text"
													id="name-1"
													name="Key_encrypt"
													placeholder=""
													value={encryptTextText}
													
												/>	
										</div>
										<div className="mb-3"></div>
										<div className="mb-3"></div>

										<div className="mb-3">
												
												{ optionKey==="G" &&
													<div>
														<div
												onClick={getRandomKey}
												className="btn btn-primary shadow d-block w-100"
												style={{ marginBottom: "20px" }}
											>
												Random key 
												</div> 
											
											<a
											href={down}
											download="PublicKey.pem"
											className="btn btn-primary shadow d-block w-100"
											style={{ marginTop: "20px" }}
										>
											Download Public Key
										</a>
										<a
											href={down2}
											download="PrivateKey.pem"
											className="btn btn-primary shadow d-block w-100"
											style={{ marginTop: "20px" }}
										>
											Download Private Key
										</a>
													</div>
												}
											{ optionKey==="U" && optionText==="D" &&
												<div>
													<div className="mb-3">
														<h6 className="fw-bold mb-0">Upload publicKey:</h6>
														<input
														className="form-control"
														type="file"
														onChange={onFileChangePublic}
														style={{ marginBottom: "20px" }}
														/>
													
													</div>
												</div>
												}
												{ optionKey==="U" && optionText==="E" &&
												<div>
													<div className="mb-3">
														<h6 className="fw-bold mb-0">Upload privateKey:</h6>
														<input
														className="form-control"
														type="file"
														onChange={onFileChangePrivate}
														style={{ marginBottom: "20px" }}
														/>
													
													</div>
												</div>
												}
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

export default SignRSA;
