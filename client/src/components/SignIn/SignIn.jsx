import React from "react";
import navimage from "../assets/Ellipse 1.png";
import logo from "../assets/h2ologo.jpg"
import { Link } from "react-router-dom";
import "./SignIn.css"

const SignIn = () => {
    return (
        <div className="SignIn">
            <img className="nav-img" src={navimage}></img>
            <Link className="logo-img" to="/"><img src={logo}></img></Link>
            <div className="card">
                <p className="google-option"><a>Sign in with Google</a></p>
                <p className="or">Or</p>
                <h2 className="sign">Sign In</h2>
                <form className="form">
                    <input type="email" placeholder="Email"></input>
                    <input type="password" placeholder="Password"></input>
                    <button><Link to="/device" style={{ color: "#003D96", textDecoration: "white" }}>Sign In</Link></button>
                    <p className="google-option" style={{ marginLeft: "26%", textDecoration: "none" }}>Already have an account? <Link to="/signup"><a style={{ textDecoration: "underline", color: "white", cursor: "pointer" }}>Sign up</a></Link></p>

                </form>
            </div>
        </div>
    )
}

export default SignIn