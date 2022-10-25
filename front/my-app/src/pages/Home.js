
import { NavLink } from "react-router-dom";
const Home = () => {
    const slogan ="Security is not just computer science – it’s a mindset"
  return (
    <div>
        {/* <NavLink className="nav-link" to="/">Home</NavLink> */}
    <header className="bg-dark">
        <div className="container pt-4 pt-xl-5">
            <div className="row pt-5">
                <div className="col-md-8 col-xl-6 text-center text-md-start mx-auto">
                    <div className="text-center">
                        {/* <p className="fw-bold text-success mb-2">Voted #1 Worldwide</p> */}
                        <h1 className="fw-bold">{slogan}</h1>
                    </div>
                </div>
                <div className="col-12 col-lg-10 mx-auto">
                    <div className="position-relative" style={{display: "flex",flexWrap: "wrap",justifyContent: "center",alignContent:"center"}}>
                        <div style={{position: "relative",flex: "0 0 45%",alignContent:"center",justifyContent:"center"}}><img className="img-fluid" style={{alignContent:"center"}}data-bss-parallax="" data-bss-parallax-speed="0.8" src="assets/img/products/3.jpg"/></div>
                        {/* <div style={{position: "relative",flex: "0 0 45%",transform: "translate3d(-5%, 20%, 0)"}}><img className="img-fluid" data-bss-parallax="" data-bss-parallax-speed="0.4" src="assets/img/products/2.jpg"/></div> */}
                        {/* <div style={{position: "relative",flex: "0 0 60%",transform: "translate3d(0, 0%, 0)"}}><img className="img-fluid" data-bss-parallax="" data-bss-parallax-speed="0.25" src="assets/img/products/1.jpg"/></div> */}
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section className="py-5">
        <div className="container text-center py-5">
            <p className="mb-4" style={{fontSize: "1.6rem"}}>Don´t be shy try our app</p>
        </div>
    </section>
    <section>
        <div className="container bg-dark py-5">
            <div className="row">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <p className="fw-bold text-success mb-2">Our Services</p>
                    <h3 className="fw-bold">Classical Encryption</h3>
                </div>
            </div>
            <div className="py-5 p-lg-5">
                <div className="row row-cols-1 row-cols-md-2 mx-auto" style={{maxWidth: "900px"}}>
                    <div className="col mb-5">
                        <div className="card shadow-sm">
                            <div className="card-body px-4 py-5 px-md-5">
                                <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{top: "1rem",right: "1rem",position: "absolute"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-boxes text-success">
                                        <path fillRule="evenodd" d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"></path>
                                    </svg></div>
                                <h5 className="fw-bold card-title">Shift Encryption</h5>
                                <p className="text-muted card-text mb-4">The encryption step performed by a Caesar cipher is often incorporated as part of more complex schemes, such as the Vigenère cipher, and still has modern application in the ROT13 system.</p><NavLink className="btn btn-primary shadow" to="/shift">Try</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-5">
                        <div className="card shadow-sm">
                            <div className="card-body px-4 py-5 px-md-5">
                                <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{top: "1rem",right: "1rem",position: "absolute"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-boxes text-success">
                                        <path fillRule="evenodd" d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"></path>
                                    </svg></div>
                                <h5 className="fw-bold card-title">Substitution Encryption</h5>
                                <p className="text-muted card-text mb-4">Substitution ciphers can be compared with transposition ciphers. In a transposition cipher, the units of the plaintext are rearranged in a different and usually quite complex order, but the units themselves are left unchanged.</p><NavLink className="btn btn-primary shadow" to="/substitution">Try</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body px-4 py-5 px-md-5">
                                <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{top: "1rem",right: "1rem",position: "absolute"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-boxes text-success">
                                        <path fillRule="evenodd" d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"></path>
                                    </svg></div>
                                <h5 className="fw-bold card-title">Affine Encryption</h5>
                                <p className="text-muted card-text mb-4">The affine cipher is a type of monoalphabetic substitution cipher, where each letter in an alphabet is mapped to its numeric equivalent, encrypted using a simple mathematical function, and converted back to a letter.</p><NavLink className="btn btn-primary shadow" to="/affine">Try</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body px-4 py-5 px-md-5">
                                <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{top: "1rem",right: "1rem",position: "absolute"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-boxes text-success">
                                        <path fillRule="evenodd" d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"></path>
                                    </svg></div>
                                <h5 className="fw-bold card-title">Vigenere Encryption</h5>
                                <p className="text-muted card-text mb-4">First described by Giovan Battista Bellaso in 1553, the cipher is easy to understand and implement, but it resisted all attempts to break it until 1863, three centuries later.</p><NavLink className="btn btn-primary shadow" to="/vigenere">Try</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body px-4 py-5 px-md-5">
                                <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{top: "1rem",right: "1rem",position: "absolute"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-boxes text-success">
                                        <path fillRule="evenodd" d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"></path>
                                    </svg></div>
                                <h5 className="fw-bold card-title">Hill Encryption</h5>
                                <p className="text-muted card-text mb-4">In classical cryptography, the Hill cipher is a polygraphic substitution cipher based on linear algebra. Invented by Lester S. Hill in 1929, it was the first polygraphic cipher in which it was practical (though barely) to operate on more than three symbols at once.</p><NavLink className="btn btn-primary shadow" to="/hill">Try</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body px-4 py-5 px-md-5">
                                <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{top: "1rem",right: "1rem",position: "absolute"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-boxes text-success">
                                        <path fillRule="evenodd" d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"></path>
                                    </svg></div>
                                <h5 className="fw-bold card-title">Permutation Encryption</h5>
                                <p className="text-muted card-text mb-4">To apply a cipher, a random permutation of size e is generated (the larger the value of e the more secure the cipher). The plaintext is then broken into segments of size e and the letters within that segment are permuted according to this key.</p><NavLink className="btn btn-primary shadow" to="/permutation">Try</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <p className="fw-bold text-success mb-2">...</p>
                    <h3 className="fw-bold">Gamma-Pentagonal</h3>
                </div>
            </div>
            <div className="py-5 p-lg-5">
                <div className="row row-cols-1 row-cols-md-2 mx-auto" style={{maxWidth: "900px"}}>
                    <div className="col mb-5">
                        <div className="card shadow-sm">
                            <div className="card-body px-4 py-5 px-md-5">
                                <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{top: "1rem",right: "1rem",position: "absolute"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-boxes text-success">
                                        <path fillRule="evenodd" d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"></path>
                                    </svg></div>
                                <h5 className="fw-bold card-title">Gamma-Pentagonal</h5>
                                <p className="text-muted card-text mb-4">it is a crypto system with provable security</p><NavLink className="btn btn-primary shadow" to="/sdes">Try</NavLink>
                            </div>
                        </div>
                    </div>
                    
    
                    
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                    <p className="fw-bold text-success mb-2">...</p>
                    <h3 className="fw-bold">Block Encryption</h3>
                </div>
            </div>
            <div className="py-5 p-lg-5">
                <div className="row row-cols-1 row-cols-md-2 mx-auto" style={{maxWidth: "900px"}}>
                    <div className="col mb-5">
                        <div className="card shadow-sm">
                            <div className="card-body px-4 py-5 px-md-5">
                                <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{top: "1rem",right: "1rem",position: "absolute"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-boxes text-success">
                                        <path fillRule="evenodd" d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"></path>
                                    </svg></div>
                                <h5 className="fw-bold card-title">S-DES</h5>
                                <p className="text-muted card-text mb-4">Is a simple version of the DES Algorithm. It is a block cipher that takes a block of plain text and converts it into ciphertext.  It takes a block of 8 bit.</p><NavLink className="btn btn-primary shadow" to="/sdes">Try</NavLink>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body px-4 py-5 px-md-5">
                                <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{top: "1rem",right: "1rem",position: "absolute"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-boxes text-success">
                                        <path fillRule="evenodd" d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"></path>
                                    </svg></div>
                                <h5 className="fw-bold card-title">T-DES</h5>
                                <p className="text-muted card-text mb-4">Is a symmetric-key block cipher, which applies the DES cipher algorithm three times to each data block.</p><NavLink className="btn btn-primary shadow" to="/tdes">Try</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body px-4 py-5 px-md-5">
                                <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{top: "1rem",right: "1rem",position: "absolute"}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-boxes text-success">
                                        <path fillRule="evenodd" d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"></path>
                                    </svg></div>
                                <h5 className="fw-bold card-title">AES</h5>
                                <p className="text-muted card-text mb-4">AES is based on a design principle known as a substitution-permutation network.AES is a variant of Rijndael, with a fixed block size of 128 bits, and a key size of 128, 192, or 256 bits</p><NavLink className="btn btn-primary shadow" to="/aes">Try</NavLink>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
    </section>
    
    </div>
  );
};

export default Home;