import { useState } from "react";
import axios from "axios";

const testURL = "http://localhost:8000";
const prod = "https://secondback.azurewebsites.net/";

const suggestKeyURL = prod + "/modern/sdes/suggestKey";
const encryptTextURL = prod + "/modern/sdes/encrypt";
const decryptTextURL = prod + "/modern/sdes/decrypt";

const SDES = () => {
	/* Text-------------*/
	const [clearTextText, setClearTextText] = useState("");
	const [keyValueText, setkeyValueText] = useState("");

	const [optionText, setOptionText] = useState("E");
	const [encryptTextText, setencryptTextText] = useState("");

	const [permutation, setPermutation] = useState("12345678");

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

	const suggestKeyText = () => {
		console.log(">>>");
		axios.post(suggestKeyURL).then((response) => {
			setkeyValueText(response.data.key);
			setPermutation(response.data.permutation);
			console.log(response.data);
		});
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
		<div>
			<section className="py-5">
				<div className="container py-5">
					<div className="row mb-5">
						<div className="col-md-8 col-xl-6 text-center mx-auto">
							<p className="fw-bold text-success mb-2">Block Encryption system</p>
							<h2 className="fw-bold">S-DES Encryption </h2>
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
												<h6 className="fw-bold mb-0">Permutation:</h6>
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
											onClick={suggestKeyText}
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
	);
};

export default SDES;
