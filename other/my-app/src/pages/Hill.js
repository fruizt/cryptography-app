import { useState } from 'react';
import axios from 'axios';


const encryptImageURL="http://127.0.0.1:8000/classic/encrypt/hillimage"
const decryptImageURL="http://127.0.0.1:8000/classic/decrypt/hillimage"
const suggestUrl="http://127.0.0.1:8000/classic/suggest/hill"
const showUrl="http://127.0.0.1:8000/classic/showImage"

const encryptTextURL="http://127.0.0.1:8000/classic/encrypt/hilltext"
const decryptTextURL="http://127.0.0.1:8000/classic/decrypt/hilltext"
const suggestTextUrl="http://127.0.0.1:8000/classic/suggest/hill"

const attackTextUrl="http://127.0.0.1:8000/classic/analyse/hilltext"

const Hill = () => {

    /* AtackText-------------*/
    const [attackText,setAttackText]=useState('');
    const [clearText,setClearText]=useState('');
    const [EncryptText,setEncryptText]=useState('');
    const [sizeAttack,setsizeAttack]=useState('2');
    const [finalKey,setFinalKey]=useState('');


    const addAttackText=val=>{
        setAttackText(val.target.value)
        
    };
    const addClearText=val=>{
        setClearText(val.target.value)
        console.log(val.target.value)
    };
    const addEncryptText=val=>{
        setEncryptText(val.target.value)
        console.log(val.target.value)
    };

    const addSizeAttack=val=>{
        setsizeAttack(val.target.value)
        console.log(val.target.value)
    };

    const makeAttack = ()=>{
        let data={
            size: parseInt(sizeAttack),
            unknown: EncryptText,
            known:clearText
        }
        console.log(data)
        axios
            .post(attackTextUrl, data)
            .then((response) => {
                setFinalKey(response.data.result)
                console.log(response.data.result);
            });

    }

    /* Text-------------*/
    const [clearTextText,setClearTextText]=useState('');
    const [keyValueText,setkeyValueText]=useState('');
    const [sizeKeyText,setSizeKeyText]=useState('2');
    const [optionText,setOptionText]=useState('E');
    const [encryptTextText,setencryptTextText]=useState('');
    const [suggestKeyText,setsuggestKeyText]=useState('');

    const addInputText=val=>{
        setClearTextText(val.target.value)
        
    };
    const addKeyText=val=>{
        setkeyValueText(val.target.value)
        console.log(val.target.value)
    };
    const addKeySizeText=val=>{
        setSizeKeyText(val.target.value)
        console.log(val.target.value)
    };
    const addOptionText=val=>{
        setOptionText(val.target.value)
        console.log(val.target.value)
    };
    const cipherText =()=>{
        let data={
            string: clearTextText,
            key: keyValueText,
            size : parseInt(sizeKeyText)
        }
        console.log(data)

        if (optionText==="E"){
            axios
            .post(encryptTextURL, data)
            .then((response) => {
                setencryptTextText(response.data.result)
                console.log(response.data.result);
            });
        }else{
            axios
            .post(decryptTextURL, data)
            .then((response) => {
                setencryptTextText(response.data.result)
                console.log(response.data.result);
            });
        }
        
        
        
    }

    const suggestText =()=>{
        let data={
            m : parseInt(sizeKeyText)
        }
        console.log(parseInt(sizeKeyText))
        console.log(data)
        axios
            .post(suggestTextUrl, data)
            .then((response) => {
                setsuggestKeyText(response.data.result)
                console.log(response.data.result);
            });
        
    }
/* Image-------------*/

    const [selectedFile,setState]=useState(null);
    const [imagevalue,setImage]=useState('imageUnknow.jpg');
    const [imageDecryptvalue,setimageDecryp]=useState('imageUnknow.jpg');
    const [option,setOption]=useState('E');
    const [keyValue,setkeyValue]=useState('');
    const [sizeKey,setSizeKey]=useState('2');
    const [suggestKey,setsuggestKey]=useState('');
    const [suggestKey2,setsuggestKey2]=useState('');
    
    const addKey=val=>{
        setkeyValue(val.target.value)
        console.log(val.target.value)
    };
    const addSizeKey=val=>{
        setSizeKey(val.target.value)
        console.log(val.target.value)
    };
    const onFileChange= (e)=>{
        setState(e.target.files[0])
    }
    const addOption=val=>{
        setOption(val.target.value)
        console.log(val.target.value)
    };

    
    
    const suggest =()=>{
        let data={
            m : parseInt(sizeKey)
        }
        console.log(parseInt(sizeKey))
        axios
            .post(suggestUrl, data)
            .then((response) => {
                setsuggestKey(response.data.result)
                console.log(response.data.result);
            });
        
    }
    const cipher =()=>{
        const formData= new FormData();
        formData.append("file", selectedFile);
        axios
            .post(showUrl, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                setImage(response.data.filedata)
                console.log(response.data);
            });
        
        

        const siz=parseInt(sizeKey)
        if (option==="E"){
            axios
            .post(encryptImageURL, formData,{ params: {
                size: siz,
                key:keyValue
              }})
            .then((response) => {
                setimageDecryp(response.data.filedata)
                console.log(response.data);
            });
        }else{
            axios
            .post(decryptImageURL, formData,{ params: {
                size: siz,
                key:keyValue
              }})
            .then((response) => {
                setimageDecryp(response.data.filedata)
                console.log(response.data.result);
            });
        } 
    }
        
        
        
    
    return (
        <div>
    <section className="py-5">
        <div className="container py-5">
            <div className="row mb-5">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <p className="fw-bold text-success mb-2">Classical Encryption system</p>
                    <h2 className="fw-bold">Hill Encryption</h2>
                </div>
            </div>
            
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" >
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Image:</h6><img style={{maxWidth:"300px",maxHeight:"300px"}} src={imagevalue}></img>
                            </div>
                            

                <div>
                <div className="mb-3">
                    <h6 className="fw-bold mb-0">Key:</h6><input onChange={addKey} className="form-control" type="text" id="name-1" name="Key_encrypt" placeholder="example: 0,1,1,0 (size 2x2)"/>
                </div>
                    
                <div className="mb-3">
                                <h6  className="fw-bold mb-0">Size Key:</h6><select onChange={addSizeKey} className="form-select" name="option_encrypt">
                                    <option value="2" selected="">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                <div className="mb-3">
                                <h6 className="fw-bold mb-0">Option:</h6><select  onChange={addOption} className="form-select" name="option_encrypt">
                                    <option value="E" selected="">Encrypt</option>
                                    <option value="D">Decrypt</option>
                                </select>
                            </div>
                <input className="form-control" type="file" onChange={onFileChange} style={{marginBottom : "20px"}} />
                    <div onClick={cipher} className="btn btn-primary shadow d-block w-100" >Try!</div></div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div>
                        
                        <form className="p-3 p-xl-4" >
                            <div className="mb-3">
                            <h6 className="fw-bold mb-0">Image result:</h6><img style={{maxWidth:"300px",maxHeight:"300px"}} src={imageDecryptvalue}></img>
                            </div>
                            <div className="mb-3"></div>
                            <div className="mb-3"></div>
                            <div className="mb-3">
                            <div className="mb-3">
                                <div><div onClick={suggest} className="btn btn-primary shadow d-block w-100" >Suggest Key</div></div>
                                <div><input value={suggestKey} className="form-control" type="text" id="name-3" name="Key_encrypt" readOnly=""/></div>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div className="row mb-5" style= {{marginTop: "48px"}}>
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <p className="fw-bold text-success mb-2" style={{fontSize: "25px"}}>Hill text</p>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" >
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text:</h6><textarea onChange={addInputText} className="form-control" id="message-1" name="message" rows="6" placeholder="Message" style={{height: "200px"}}></textarea>
                            </div>
                            <div className="mb-3">
                                <row>
                                    <column>
                                        <h6 className="fw-bold mb-0">Key:</h6><input onChange={addKeyText} className="form-control" type="text" id="name-1" name="Key_encrypt" />
                                    </column>
                                    <column>
                                    <h6  className="fw-bold mb-0">Size Key:</h6><select onChange={addKeySizeText} className="form-select" name="option_encrypt">
                                    <option value="2" selected="">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                    </column>
                                    
                                </row>
                            </div>
                            
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Option:</h6><select onChange={addOptionText} className="form-select" name="option_encrypt">
                                    <option value="E" selected="">Encrypt</option>
                                    <option value="D">Decrypt</option>
                                </select>
                            </div>
                            <div className="mb-3"></div>
                            
                            <div><div   onClick={cipherText} className="btn btn-primary shadow d-block w-100" >Send </div></div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" >
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text result:</h6><textarea value={encryptTextText} className="form-control" id="message-3" name="message" rows="6" style={{height: "200px"}} readOnly=""></textarea>
                            </div>
                            <div className="mb-3"></div>
                            <div className="mb-3"></div>
                            <div className="mb-3">
                                <div><div  onClick={suggestText} className="btn btn-primary shadow d-block w-100" >Suggest Key</div></div>
                                <div><input value={suggestKeyText} className="form-control" type="text" id="name-3" name="Key_encrypt" readOnly=""/></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row mb-5" style= {{marginTop: "48px"}}>
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <p className="fw-bold text-success mb-2" style={{fontSize: "25px"}}>Hill text Attack</p>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" >
                            
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Clear Text:</h6><input onChange={addClearText} className="form-control" type="text" id="name-1" name="Key_encrypt" />
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Encrypt Text:</h6><input onChange={addEncryptText} className="form-control" type="text" id="name-1" name="Key_encrypt"  />
                            </div>
                            <div className="mb-3">
                                <h6  className="fw-bold mb-0">Size Key:</h6><select onChange={addSizeAttack} className="form-select" name="option_encrypt">
                                    <option value="2" selected="">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="mb-3"></div>
                            <div><div onClick={makeAttack} className="btn btn-primary shadow d-block w-100" >Try </div></div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" >
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Key result:</h6><textarea value={finalKey} className="form-control" id="message-3" name="message" rows="6" style={{height: "200px"}} readOnly=""></textarea>
                            </div>
                            <div className="mb-3"></div>
                            <div className="mb-3"></div>
                            
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
    </div>
    );
};

export default Hill;