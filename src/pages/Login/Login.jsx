import React, { useEffect, useState } from 'react';
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signup } from "../../firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const Login = () => {
    const [signState, setSignState] = useState("Sign In");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const userAuth = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (signState === "Sign In") {
            await login(email, password);
        } else {
            await signup(name, email, password);
        }
        setLoading(false);
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    return (
        loading ? <div className="loading-spinner">
            <img src={netflix_spinner} alt="" />
        </div> :
            <div className='login'>
                <img src={logo} alt="" className='login-logo' />
                <div className="login-form">
                    <h1>{signState}</h1>
                    <form>
                        {signState === "Sign Up" ? <input type="text" placeholder='Your Name...'
                            value={name} onChange={handleNameChange} /> : <></>}
                        <input type="email" placeholder='Email...' value={email} onChange={handleEmailChange} />
                        <input type="password" placeholder='Password...' value={password} onChange={handlePasswordChange} />
                        <button onClick={userAuth} type='submit'>{signState}</button>
                        <div className="form-help">
                            <div className="remember">
                                <input type="checkbox" id='checkbox' />
                                <label htmlFor='checkbox'>Remember Me</label>
                            </div>
                            <p>Need Help?</p>
                        </div>
                    </form>
                    <div className="form-switch">
                        {signState === "Sign Up" ?
                            <p>
                                Already have an account?
                                <span onClick={() => { setSignState("Sign In") }}>
                                    Sign In Now
                                </span>
                            </p> :
                            <p>
                                New to Netflix?
                                <span onClick={() => { setSignState("Sign Up") }}>
                                    Sign Up Now
                                </span>
                            </p>
                        }
                    </div>
                </div>
            </div>
    );
}

export default Login;