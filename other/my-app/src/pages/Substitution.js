import { useState } from 'react';
import React, { Component } from 'react'
// import { cipherText } from '../api_services/permutation';
import axios from "axios";

const encryptUrl="https://kryps-back.herokuapp.com/classic/encrypt/substitution"
const decryptUrl="https://kryps-back.herokuapp.com/classic/decrypt/substitution"
const suggestUrl="https://kryps-back.herokuapp.com/"
const analysisAdvUrl="https://kryps-back.herokuapp.com/classic/analyse/substitution"
const analysisUrl="https://kryps-back.herokuapp.com/classic/analyse/substitution/monograms"

const Substitution = () => {
    const [clearText,setClearText]=useState('');
    const [keyValue,setkeyValue]=useState('');
    const [option,setOption]=useState('E');
    const [optionAnalysis,setOptionAnalysis]=useState('B');
    const [encryptText,setencryptText]=useState('');
    const [suggestKey,setsuggestKey]=useState('');
    const [clearanalysisText,setanalysisClearText]=useState('');
    const [analysisText,setanalysisText]=useState('');
    

    const addInput=val=>{
        setClearText(val.target.value)
        console.log(clearText)
    };
    const addKey=val=>{
        setkeyValue(val.target.value)
        console.log(val.target.value)
    };
    const addOption=val=>{
        setOption(val.target.value)
        console.log(val.target.value)
    };
    const addOptionAnalysis=val=>{
        setOptionAnalysis(val.target.value)
        console.log(val.target.value)
    };
    const addanalysisInput=val=>{
        setanalysisClearText(val.target.value)
        console.log(clearanalysisText)
    };

    const cipher =()=>{
        let data={
            text: clearText,
            key: keyValue
        }
        console.log(data)

        if (option==="E"){
            axios
            .post(encryptUrl, data)
            .then((response) => {
                setencryptText(response.data.result)
                console.log(response.data.result);
            });
        }else{
            axios
            .post(decryptUrl, data)
            .then((response) => {
                setencryptText(response.data.result)
                console.log(response.data.result);
            });
        }    
    }

    const analysis =()=>{
        if (optionAnalysis==="B"){
            let data={
                text: clearanalysisText,
            }
            console.log(data)

            axios
            .post(analysisUrl, data)
            .then((response) => {
                setanalysisText(response.data.result)
                console.log(response.data.result);
            });
        }else{
            let data={
                text: clearanalysisText,
                iteration: 20
            }
            console.log(data)

            axios
            .post(analysisAdvUrl, data)
            .then((response) => {
                setanalysisText(response.data.result)
                console.log(response.data.result);
            });
        }    
    }

    // const suggest =()=>{
    //     let data={
    //         m : parseInt(sizeKey)
    //     }
    //     console.log(parseInt(sizeKey))
    //     axios
    //         .post(suggestUrl, data)
    //         .then((response) => {
    //             setsuggestKey(response.data.result)
    //             console.log(response.data.result);
    //         });
        
    // }
    return(
        <div>
            
    <section className="py-5">
        <div className="container py-5">
            <div className="row mb-5">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <p className="fw-bold text-success mb-2">classNameical system</p>
                    <h2 className="fw-bold">Substitution Encryption</h2>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" method="post">
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text:</h6><textarea onChange={addInput} className="form-control" id="message-1" name="message" rows="6" placeholder="Message" style={{height: "200px"}}></textarea>
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Key:</h6><input onChange={addKey} className="form-control" type="text" id="name-1" name="Key_encrypt" placeholder="Example: ABCDEFGHIJKLMNOPQRSTUVWXYZ (size 26)" />
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Option:</h6><select onChange={addOption} className="form-select" name="option_encrypt">
                                    <option value="E" selected="">Encrypt</option>
                                    <option value="D">Decrypt</option>
                                </select>
                            </div>
                            <div className="mb-3"></div>
                            <div><div onClick={cipher} className="btn btn-primary shadow d-block w-100">Send </div></div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" method="post">
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text result:</h6><textarea value={encryptText} className="form-control" id="message-3" name="message" rows="6" style={{height: "200px"}} readOnly=""></textarea>
                            </div>
                            <div className="mb-3"></div>
                            <div className="mb-3"></div>
                            <div className="mb-3">
                                <div><button className="btn btn-primary shadow d-block w-100" type="submit">Suggest Key</button></div>
                                <div><input className="form-control" type="text" id="name-3" name="Key_encrypt" readOnly="" /></div>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
            <div className="row mb-5" style={{marginTop: "48px"}}>
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <p className="fw-bold text-success mb-2" style={{fontSize: "25px"}} >Cryptoanalysis</p>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" method="post">
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text:</h6><textarea onChange={addanalysisInput} className="form-control" id="message-2" name="message" rows="6" placeholder="Message" style={{height: "200px"}}></textarea>
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Option:</h6><select onChange={addOptionAnalysis} className="form-select" name="option_encrypt">
                                    <option value="B" selected="">Basic (n-gram)</option>
                                    <option value="A">Advanced (iterations)</option>
                                </select>
                            </div>
                            <div><div onClick={analysis} styles={{marginTop:"20px"}}className="btn btn-primary shadow d-block w-100">Send </div></div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" method="post">
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text result:</h6><textarea value={analysisText} className="form-control" id="message-4" name="message" rows="6" style={{height: "400px"}} readOnly=""></textarea>
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
    )
}

export default Substitution;