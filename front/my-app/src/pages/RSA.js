import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const testURL = "http://localhost:8000";
const prod = "https://quickstart-image-b6b23rgmpa-uc.a.run.app/";

const suggestKeyURL = prod + "/modern/sdes/suggestKey";
const encryptTextURL = prod + "/modern/sdes/encrypt";
const decryptTextURL = prod + "/modern/sdes/decrypt";

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
	const [keyValueText, setkeyValueText] = useState("");
	const [optionText, setOptionText] = useState("E");
	const [encryptTextText, setencryptTextText] = useState("");
	const [permutation, setPermutation] = useState("12345678");
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const addPermutationText = (val) => {
		setPermutation(val.target.value);
	};

	const copyText = (val) => {
		console.log(encryptTextText);

		setClearTextText(encryptTextText);
	};
	const addInputText = (val) => {
		setClearTextText(val.target.value);
	};

	const addKeyText = (val) => {
		setkeyValueText(val.target.value);
		console.log(val.target.value);
	};

	const addOptionText = (val) => {
		setOptionText(val.target.value);
		console.log(val.target.value);
	};
	const cipherText = () => {
		let data = {
			key: keyValueText,
			encrypt: clearTextText,
			permutation: permutation,
		};

		if (optionText === "E") {
			axios.post(encryptTextURL, data).then((response) => {
				setencryptTextText(response.data.encrypt);
			});
		} else {
			console.log(">>");
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
								Private key:{" "}
								<input
									type="text"
									id="uname"
									name="name"
									value="MIIBOgIBAAJBAKj34GkxFhD90vcNLYLInFEX6Ppy1tPf9Cnzj4p4WGeKLs1Pt8Qu
											KUpRKfFLfRYC9AIKjbJTWit+CqvjWYzvQwECAwEAAQJAIJLixBy2qpFoS4DSmoEm
											o3qGy0t6z09AIJtH+5OeRV1be+N4cDYJKffGzDa88vQENZiRm0GRq6a+HPGQMd2k
											TQIhAKMSvzIBnni7ot/OSie2TmJLY4SwTQAevXysE2RbFDYdAiEBCUEaRQnMnbp7
											9mxDXDf6AU0cN/RPBjb9qSHDcWZHGzUCIG2Es59z8ugGrDY+pxLQnwfotadxd+Uy
											v/Ow5T0q5gIJAiEAyS4RaI9YG8EWx/2w0T67ZUVAw8eOMB6BIUg0Xcu+3okCIBOs
											/5OiPgoTdSy7bcF9IGpSE8ZgGKzgYQVZeN97YE00"
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
									value="123123123123"
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
									value="123123123123"
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
											<div className="mb-3">
												<div className="mb-3">
													<h6 className="fw-bold mb-0">Pulbic key:</h6>
													<input
														onChange={addPermutationText}
														className="form-control"
														type="text"
														id="name-1"
														name="Key_encrypt"
														placeholder="example: 0,1,1,0 (size 2x2)"
														value={permutation}
													/>
												</div>
												<h6 className="fw-bold mb-0">Key:</h6>
												<input
													onChange={addKeyText}
													className="form-control"
													type="text"
													id="name-1"
													name="Key_encrypt"
													placeholder="example: 0,1,1,0 (size 2x2)"
													value={keyValueText}
												/>
											</div>

											<div
												onClick={() => handleOpen()}
												className="btn btn-primary shadow d-block w-100"
												style={{ marginBottom: "20px" }}
											>
												Suggest key and permutation
											</div>
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
											<div>
												<div onClick={copyText} className="btn btn-primary shadow d-block w-100">
													{"<- Copy"}
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

export default RSA;
