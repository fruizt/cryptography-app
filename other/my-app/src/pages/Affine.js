import { useState } from 'react';
import React, { Component } from 'react'
import axios from "axios";

const encryptUrl="http://127.0.0.1:8000/classic/encrypt/affine"
const decryptUrl="http://127.0.0.1:8000/classic/decrypt/affine"
const suggestUrl="http://127.0.0.1:8000/classic/suggestKey/affine"
const atackUrl="http://127.0.0.1:8000/classic/smartAttack/affine"



const Affine =()=> {
    const a=[1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
    const b=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    const [clearText,setClearText]=useState('');
    const [valueA,setValueA]=useState('1');
    const [valueB,setValueB]=useState('');
    const [option,setOption]=useState('E');
    const [encryptText,setencryptText]=useState('');
    const [suggestKey,setsuggestKey]=useState('');
    const[textVal,setTextval]=useState('');
    const[textResult,setTextResult]=useState('');
    const[down,setDown]=useState('data:text/plain;charset=utf-8,' + encodeURIComponent("Hola"));

    
    const addInput=val=>{
        setClearText(val.target.value)
        console.log(clearText)
    };
    const addValueA=val=>{
        setValueA(val.target.value)
        console.log(val.target.value)
    };
    const addValueB=val=>{
        setValueB(val.target.value)
        console.log(val.target.value)
    };
    
    const addOption=val=>{
        setOption(val.target.value)
        console.log(val.target.value)
    };

    const addAtack=val=>{
        setTextval(val.target.value)
        console.log(val.target.value)
    };
    
    const cipher =()=>{
        let data={
            text: clearText,
            key: parseInt(valueA),
            ky: parseInt(valueB)
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

    const suggest =()=>{
        
        axios
            .post(suggestUrl)
            .then((response) => {
                setsuggestKey(response.data.result)
                console.log(response.data.result);
            });
        
    }
    const atack =()=>{
        let data={
            text: textVal,
        }
        console.log(data)
        axios
            .post(atackUrl, data)
            .then((response) => {
                setTextResult(response.data.result.smart)
                setDown('data:text/plain;charset=utf-8,' + encodeURIComponent(response.data.result.complete))
                console.log(response.data.result);
            });
    }
   

    return(
        <div>
             
    <section className="py-5">
        <div className="container py-5">
            <div className="row mb-5">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <p className="fw-bold text-success mb-2">classNameical system</p>
                    <h2 className="fw-bold">Affine Encryption</h2>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" >
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text:</h6><textarea onChange={addInput} className="form-control" id="message-1" name="message" rows="6" placeholder="Message" style={{height: "200px"}}></textarea>
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Key:</h6><row>
                                    <column>
                                        <h6 className="fw-bold mb-0">a:</h6>
                                        <select onChange={addValueA} className="form-select" name="option_encrypt">
                                        {a.map((number) => {
                                            return <option value={number} selected="">{number}</option>
                                        }
                                        )}
                                            
                                        </select>
                                    </column>
                                    <column>
                                        <h6 className="fw-bold mb-0">b:</h6>
                                        <select onChange={addValueB} className="form-select" name="option_encrypt">
                                        {b.map((number) => {
                                            return <option value={number} selected="">{number}</option>
                                        }
                                        )}
                                            
                                        </select>
                                    </column>
                                    
                                </row>
                            </div>
                            
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Option:</h6><select onChange={addOption} className="form-select" name="option_encrypt">
                                    <option value="E" selected="">Encrypt</option>
                                    <option value="D">Decrypt</option>
                                </select>
                            </div>
                            <div className="mb-3"></div>
                            
                            <div><div   onClick={cipher} className="btn btn-primary shadow d-block w-100" >Send </div></div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" >
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text result:</h6><textarea value={encryptText} className="form-control" id="message-3" name="message" rows="6" style={{height: "200px"}} readOnly=""></textarea>
                            </div>
                            <div className="mb-3"></div>
                            <div className="mb-3"></div>
                            <div className="mb-3">
                                <div><div  onClick={suggest} className="btn btn-primary shadow d-block w-100" >Suggest Key</div></div>
                                <div><input value={suggestKey} className="form-control" type="text" id="name-3" name="Key_encrypt" readOnly=""/></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row mb-5" style={{marginTop: "48px"}}>
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <p className="fw-bold text-success mb-2" style={{fontSize: "25px"}}>Cryptoanalysis</p>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4">
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text:</h6><textarea onChange={addAtack} className="form-control" id="message-2" name="message" rows="6" placeholder="Message" style={{height: "200px"}}></textarea>
                            </div>

                            <div><div onClick={atack} className="btn btn-primary shadow d-block w-100" >Try</div></div>
                            <div ><a href={down} download="text" className="btn btn-primary shadow d-block w-100" style={{marginTop:"20px"}}>Download all keys</a></div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" >
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text result:</h6><textarea value={textResult} className="form-control" id="message-4" name="message" rows="6" style={{height: "400px"}} readOnly=""></textarea>
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

export default Affine