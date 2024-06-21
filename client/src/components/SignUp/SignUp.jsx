import React from "react";
import navimage from "../assets/Ellipse 1.png";
import logo from "../assets/h2ologo.jpg"
import { Link } from "react-router-dom";
import "./SignUp.css"

const SignUp = () => {
    return (
        <div className="signup">
            <img className="nav-img" src={navimage}></img>
            <Link className="logo-img" to="/"><img src={logo}></img></Link>
            <div className="card">
                <p className="google-option"><a>Sign up with Google</a></p>
                <p className="or">Or</p>
                <h2 className="sign">Sign Up</h2>
                <form className="form">
                    <div>
                        <input type="name" placeholder="First Name"></input>
                        <input type="name" placeholder="Last Name"></input>
                    </div>
                    <input type="email" placeholder="Email"></input>
                    <input type="password" placeholder="Password"></input>
                    <input type="password" placeholder="Confirm Password"></input>
                    <button><Link to="/signin" style={{color:"#003D96", textDecoration:"white", cursor:"pointer"}}>Sign Up</Link></button>
                    <p className="google-option" style={{marginLeft:"26%", textDecoration:"none"}}>Already have an account? <Link to="/signin"><a style={{textDecoration:"underline", color:"white", cursor:"pointer"}}>Sign in</a></Link></p>

                </form>
            </div>
        </div>
    )
}

export default SignUp