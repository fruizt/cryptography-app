import { useState } from "react";
import axios from "axios";

const testURL = "http://localhost:8000";
const prod = "https://secondback.azurewebsites.net/";

const encryptImageURL = prod + "/modern/tdes/encryptImages";
const decryptImageURL = prod + "/modern/tdes/decryptImages";
const suggestKeyURL = prod + "/modern/generateKeyBits";
const encryptTextURL = prod + "/modern/tdes/encrypt";
const decryptTextURL = prod + "/modern/tdes/decrypt";
const showImageURL = prod + "/modern/showImageAES";

function DataURIToBlob(dataURI) {
	const splitDataURI = dataURI.split(",");
	const byteString =
		splitDataURI[0].indexOf("base64") >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
	const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

	const ia = new Uint8Array(byteString.length);
	for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

	return new Blob([ia], { type: mimeString });
}

const TDES = () => {
	/* Text-------------*/
	const [clearTextText, setClearTextText] = useState("");
	const [keyValueText, setkeyValueText] = useState("");
	const [sizeKeyText, setSizeKeyText] = useState("12");
	const [optionText, setOptionText] = useState("E");
	const [encryptTextText, setencryptTextText] = useState("");
	const [optionModeText, setOptionModeText] = useState("1");
	const [iv, setIv] = useState(" ");
	const [ivCopy, setIvCopy] = useState(" ");

	const addOptionModeText = (val) => {
		setOptionModeText(val.target.value);
		if (val.target.value === "1") {
			setIv(" ");
		}
	};

	const copyText = (val) => {
		console.log(encryptTextText);
		setIv(ivCopy);
		setClearTextText(encryptTextText);
	};
	const addInputText = (val) => {
		setClearTextText(val.target.value);
	};
	const addIV = (val) => {
		setIv(val.target.value);
	};
	const addKeyText = (val) => {
		setkeyValueText(val.target.value);
		console.log(val.target.value);
	};
	const addKeySizeText = (val) => {
		setSizeKeyText(val.target.value);
		console.log(val.target.value);
	};

	const suggestKeyText = () => {
		let siz = parseInt(sizeKeyText);
		axios.post(suggestKeyURL, { m: siz }).then((response) => {
			setkeyValueText(response.data.result);
			console.log(response.data.result);
		});
	};
	const addOptionText = (val) => {
		setOptionText(val.target.value);
		console.log(val.target.value);
	};
	const cipherText = () => {
		if (optionText === "E") {
			let data = {
				key: keyValueText,
				encrypt: clearTextText,
				mode: parseInt(optionModeText),
			};
			axios.post(encryptTextURL, data).then((response) => {
				setencryptTextText(response.data.encrypt);
				setIvCopy(response.data.iv);
			});
		} else {
			let data = {
				key: keyValueText,
				encrypt: clearTextText,
				mode: parseInt(optionModeText),
				iv: iv,
			};
			axios.post(decryptTextURL, data).then((response) => {
				setencryptTextText(response.data.decrypt);
				console.log(response.data.decrypt);
			});
		}
	};

	/* Image-------------*/

	const [selectedFile, setState] = useState(null);
	const [imagevalue, setImage] = useState("imageUnknow.jpg");
	const [imageDecryptvalue, setimageDecryp] = useState("imageUnknow.jpg");
	const [option, setOption] = useState("E");
	const [keyVal2, setkeyValue2] = useState("");
	const [sizeKey, setSizeKey] = useState("12");
	const [modeOperation, setModeOperation] = useState("1");

	const addKey2 = (val) => {
		setkeyValue2(val.target.value);
		console.log(val.target.value);
	};

	const addSuggestKey = (val) => {
		let siz = parseInt(sizeKey);
		axios.post(suggestKeyURL, { m: siz }).then((response) => {
			setkeyValue2(response.data.result);
			console.log(response.data.result);
		});
	};
	const addOptionMode = (val) => {
		setModeOperation(val.target.value);
	};
	const addSizeKey = (val) => {
		setSizeKey(val.target.value);
		console.log(val.target.value);
	};
	const onFileChange = (e) => {
		console.log(e);
		setState(e.target.files[0]);
		const formData = new FormData();
		formData.append("file", e.target.files[0]);
		axios.post(showImageURL, formData).then((response) => {
			setImage(response.data.filedata);
			console.log(response.data);
		});
	};

	const copyImage = () => {
		const file = DataURIToBlob(imageDecryptvalue);
		const formData = new FormData();
		formData.append("file", file);
		axios.post(showImageURL, formData).then((response) => {
			setImage(response.data.filedata);
			setState(file);
			console.log(response.data);
		});
	};
	const addOption = (val) => {
		setOption(val.target.value);
		console.log(val.target.value);
	};

	const cipher = () => {
		const formData = new FormData();
		formData.append("file", selectedFile);
		console.log(selectedFile);
		const siz = parseInt(sizeKey);
		const final_mode = parseInt(modeOperation);
		if (option === "E") {
			axios
				.post(encryptImageURL, formData, {
					params: {
						size: siz,
						key: keyVal2,
						mode: final_mode,
					},
				})
				.then((response) => {
					setimageDecryp(response.data.filedata);
					console.log(response.data);
				});
		} else {
			axios
				.post(decryptImageURL, formData, {
					params: {
						size: siz,
						key: keyVal2,
						mode: final_mode,
					},
				})
				.then((response) => {
					setimageDecryp(response.data.filedata);
					console.log(response.data.result);
				});
		}
		// axios
		//     .post(imgUrl, formData,{ params: {
		//         size: modeOperation,
		//         key:keyVal2

		//       }}
		//     )
		//     .then((response) => {
		//         setImage(response.data.filedata)
		//         console.log(response.data);
		//     });
	};

	return (
		<div>
			<section className="py-5">
				<div className="container py-5">
					<div className="row mb-5">
						<div className="col-md-8 col-xl-6 text-center mx-auto">
							<p className="fw-bold text-success mb-2">Block Encryption system</p>
							<h2 className="fw-bold">T-DES Encryption</h2>
						</div>
					</div>

					<div className="row d-flex justify-content-center">
						<div className="col-md-6 col-xl-4">
							<div>
								<form className="p-3 p-xl-4">
									<div className="mb-3">
										<h6 className="fw-bold mb-0">Image:</h6>
										<img style={{ maxWidth: "380px", maxHeight: "380px" }} src={imagevalue}></img>
									</div>

									<div>
										<input
											className="form-control"
											type="file"
											onChange={onFileChange}
											style={{ marginBottom: "20px" }}
										/>
										<div className="mb-3">
											<h6 className="fw-bold mb-0">Key:</h6>
											<input
												onChange={addKey2}
												className="form-control"
												type="text"
												id="name-1"
												name="Key_encrypt"
												placeholder="example: 0,1,1,0 (size 2x2)"
												value={keyVal2}
											/>
										</div>
										<div className="mb-3">
											<h6 className="fw-bold mb-0">Size Key:</h6>
											<select onChange={addSizeKey} className="form-select" name="option_encrypt">
												<option value="12" selected="">
													16
												</option>
												<option value="16">24</option>
											</select>
										</div>
										<div
											onClick={addSuggestKey}
											className="btn btn-primary shadow d-block w-100"
											style={{ marginBottom: "20px" }}
										>
											Suggest key
										</div>
										<h6 className="fw-bold mb-0">Option:</h6>
										<select
											onChange={addOption}
											className="form-select"
											style={{ marginBottom: "20px" }}
											name="option_encrypt"
										>
											<option value="E" selected="">
												Encrypt
											</option>
											<option value="D">Decrypt</option>
										</select>

										<h6 className="fw-bold mb-0">Mode of operation:</h6>
										<select
											onChange={addOptionMode}
											className="form-select"
											style={{ marginBottom: "20px" }}
											name="option_encrypt"
										>
											<option value="1" selected="">
												Electronic Code Book (ECB)
											</option>
											<option value="2">Cipher-Block Chaining (CBC)</option>
											<option value="3" selected="">
												Cipher FeedBack (CFB)
											</option>
											<option value="5" selected="">
												Output FeedBack (OFB)
											</option>
											<option value="6" selected="">
												CounTer Mode (CTR)
											</option>
										</select>

										<div onClick={cipher} className="btn btn-primary shadow d-block w-100">
											Try!
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="col-md-6 col-xl-4">
							<div>
								<form className="p-3 p-xl-4">
									<div className="mb-3">
										<h6 className="fw-bold mb-0">Image result:</h6>
										<img
											style={{ maxWidth: "380px", maxHeight: "380px" }}
											src={imageDecryptvalue}
											id="imageDecrypt"
										></img>
									</div>

									<div className="mb-3">
										<div>
											<div onClick={copyImage} className="btn btn-primary shadow d-block w-100">
												{"<- Copy"}
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>

					<div className="row mb-5" style={{ marginTop: "48px" }}>
						<div className="col-md-8 col-xl-6 text-center mx-auto">
							<p className="fw-bold text-success mb-2" style={{ fontSize: "25px" }}>
								T-DES-text
							</p>
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
										<div className="mb-3">
											<h6 className="fw-bold mb-0">Size Key:</h6>
											<select
												onChange={addKeySizeText}
												className="form-select"
												name="option_encrypt"
											>
												<option value="12" selected="">
													16
												</option>
												<option value="16">24</option>
												<option value="24">32</option>
											</select>
										</div>
										<div
											onClick={suggestKeyText}
											className="btn btn-primary shadow d-block w-100"
											style={{ marginBottom: "20px" }}
										>
											Suggest key
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
									{optionText === "D" && optionModeText != "1" && (
										<div>
											<h6 className="fw-bold mb-0">Initialization vector:</h6>
											<div>
												<input
													onChange={addIV}
													value={iv}
													className="form-control"
													type="text"
													id="name-3"
													name="Key_encrypt"
													style={{ marginBottom: "20px" }}
												/>
											</div>
										</div>
									)}

									<h6 className="fw-bold mb-0">Mode of operation:</h6>
									<select
										onChange={addOptionModeText}
										className="form-select"
										style={{ marginBottom: "20px" }}
										name="option_encrypt"
									>
										<option value="1" selected="">
											Electronic Code Book (ECB)
										</option>
										<option value="2">Cipher-Block Chaining (CBC)</option>
										<option value="3" selected="">
											Cipher FeedBack (CFB)
										</option>
										<option value="5" selected="">
											Output FeedBack (OFB)
										</option>
										<option value="6" selected="">
											CounTer Mode (CTR)
										</option>
									</select>
									<div className="mb-3"></div>

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
									<div className="mb-3">
										<h6 className="fw-bold mb-0">Initialization vector:</h6>
										<div>
											<input
												value={ivCopy}
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
				</div>
			</section>
		</div>
	);
};

export default TDES;
