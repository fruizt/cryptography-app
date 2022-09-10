const Hill = () => {
    return (
        <div>
    <section className="py-5">
        <div className="container py-5">
            <div className="row mb-5">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <p className="fw-bold text-success mb-2">classNameical system</p>
                    <h2 className="fw-bold">Hill Encryption</h2>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" method="post">
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text:</h6><textarea className="form-control" id="message-1" name="message" rows="6" placeholder="Message" style={{height: "200px"}}></textarea>
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Key:</h6><input className="form-control" type="text" id="name-1" name="Key_encrypt" placeholder="Key" />
                            </div>
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Option:</h6><select className="form-select" name="option_encrypt">
                                    <option value="E" selected="">Encrypt</option>
                                    <option value="D">Decrypt</option>
                                </select>
                            </div>
                            <div className="mb-3"></div>
                            <div><button className="btn btn-primary shadow d-block w-100" type="submit">Send </button></div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" method="post">
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text result:</h6><textarea className="form-control" id="message-3" name="message" rows="6" style={{height: "200px"}} readOnly=""></textarea>
                            </div>
                            <div className="mb-3"></div>
                            <div className="mb-3"></div>
                            <div className="mb-3">
                                <div><button className="btn btn-primary shadow d-block w-100" type="submit">Suggest Key</button></div>
                                <div><input className="form-control" type="text" id="name-3" name="Key_encrypt" readOnly=""/></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row mb-5" style= {{marginTop: "48px"}}>
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <p className="fw-bold text-success mb-2" style={{fontSize: "25px"}}>Cryptoanalysis</p>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" method="post">
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text:</h6><textarea className="form-control" id="message-2" name="message" rows="6" placeholder="Message" style={{height: "200px"}}></textarea>
                            </div>
                            <div><button className="btn btn-primary shadow d-block w-100" type="submit">Try</button></div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div>
                        <form className="p-3 p-xl-4" method="post">
                            <div className="mb-3">
                                <h6 className="fw-bold mb-0">Text result:</h6><textarea className="form-control" id="message-4" name="message" rows="6" style={{height: "400px"}} readOnly=""></textarea>
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

export default Hill;