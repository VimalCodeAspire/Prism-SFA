import React, { useState } from "react";
import login from "../../api/login/login-api"
import Swal from "sweetalert2";
function SignIn (){
    const [userId,setUserId] = useState("");
    const [password,setPassword] = useState("")
    async function handleSubmit () {
        if (userId&&password){
            try {
                const resp = await login(userId,password)
                Swal.fire({
                    title: 'User  Found',
                    text: 'This user in  registered with us. and your token is '+resp,
                    icon: 'success',
                    confirmButtonText: 'thank you'
                  })
            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: 'Can\'t SignIn!',
                    text: 'Something went wrong.Please try after time',
                    icon: 'error',
                    confirmButtonText: 'ok'
                  })
            }
        }
        else{
            Swal.fire({
                title: 'Incomplete!',
                text: 'Please fill the required details',
                icon: 'error',
                confirmButtonText: 'ok'
              })
        }
       
    }
        return(
            <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
                <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{maxWidth: "32rem"}}>
                    <form className="row g-1 p-3 p-md-4">
                        <div className="col-12 text-center mb-1 mb-lg-5">
                            <h1>Sign in</h1>
                            <span>Access to Your dashboard.</span>
                        </div>
                        {/* <div className="col-12 text-center mb-4">
                            <a className="btn btn-lg btn-outline-secondary btn-block" href="#!">
                                <span className="d-flex justify-content-center align-items-center">
                                    <img className="avatar xs me-2" src={GoogleImg} alt="Imag Description" />
                                    Sign in with Google
                                </span>
                            </a>
                            <span className="dividers text-muted mt-4">OR</span>
                        </div> */}
                        <div className="col-12">
                            <div className="mb-2">
                                <label className="form-label">User Id</label>
                                <input type="email" value={userId} onChange={(e)=>setUserId(e.target.value)} className="form-control form-control-lg" placeholder="Email or Phone Number" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mb-2">
                                <div className="form-label">
                                    <span className="d-flex justify-content-between align-items-center">
                                        Password
                                        {/* <Link className="text-secondary" to="password-reset">Forgot Password?</Link> */}
                                    </span>
                                </div>
                                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control form-control-lg" placeholder="***************" />
                            </div>
                        </div>
                        {/* <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" for="flexCheckDefault">
                                    Remember me
                                </label>
                            </div>
                        </div> */}
                        <div onClick={handleSubmit} className="col-12 text-center mt-4">
                            <p  className="btn btn-lg btn-block btn-light lift text-uppercase" atl="signin">SIGN IN</p>
                        </div>
                        {/* <div className="col-12 text-center mt-4">
                            <span className="text-muted">Don't have an account yet? <Link to="sign-up" className="text-secondary">Sign up here</Link></span>
                        </div> */}
                    </form>
                </div>
            </div>
        )

}
export default SignIn;