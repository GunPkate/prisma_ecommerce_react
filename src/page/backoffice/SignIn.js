import {  useState } from "react"
import config from "../../config";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function SignIn(){
    const [user,setUser] = useState({user:'', pass:''})
    const navigate = useNavigate();

    // useEffect = (()=>fetchData(),[])

    // const fetchData = async () => {
    //     try {            
    //         const res = await axios.get(config.apiPath+'',config.headers())
    //     } catch (error) {
            
    //     }
    // }
    const handleSignIn = async () => {
        try {
            const url = config.apiPath + '/user/signIn'
            console.log(url)
            const res = await axios.post(url,user)
            if(res.data.token !==  undefined){
                localStorage.setItem('toekn',res.data.token);
                navigate('/home')
            }
        } catch (e) {
            if(e.response.status === 401){
                Swal.fire({
                    title: 'Sign In Error',
                    icon: 'warning',
                    text: 'Invalid User / Password'
                })    
            }

            else{
                Swal.fire({
                    title: 'error',
                    icon: 'error',
                    text: e.message
                })
            }
        }
    }

    return <>
        <div className="hold-transition login-page">
            <div className="login-box">

                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                    <a href="../../index2.html" className="h1"><b>Admin</b>LTE</a>
                    </div>
                    <div className="card-body">
                    <p className="login-box-msg">Sign in to start your session</p>

                    <div>
                        <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder="Email" onChange={(e)=>{ setUser({...user, user: e.target.value })}}/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                            <span className="fas fa-envelope"></span>
                            </div>
                        </div>
                        </div>
                        <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Password" onChange={(e)=>{setUser({...user, pass: e.target.value })}}/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                            <span className="fas fa-lock"></span>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-8">
                            <div className="icheck-primary">
                            <input type="checkbox" id="remember"/>
                            <label htmlFor="remember">
                                Remember Me
                            </label>
                            </div>
                        </div>

                        <div className="col-4">
                            <button type="submit" className="btn btn-primary btn-block" onClick={handleSignIn}>Sign In</button>
                        </div>

                        </div>
                    </div>

                    <div className="social-auth-links text-center mt-2 mb-3">
                        <a href="#" className="btn btn-block btn-primary">
                        <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                        </a>
                        <a href="#" className="btn btn-block btn-danger">
                        <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
                        </a>
                    </div>
                

                    <p className="mb-1">
                        <a href="forgot-password.html">I forgot my password</a>
                    </p>
                    <p className="mb-0">
                        <a href="register.html" className="text-center">Register a new membership</a>
                    </p>
                    </div>

                </div>

            </div>
        </div>
    </>
}