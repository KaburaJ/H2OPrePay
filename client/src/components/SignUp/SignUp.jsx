// src/SignUp.js
import React, { useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword } from "../../firebase";
import navimage from "../assets/Ellipse 1.png";
import logo from "../assets/h2ologo.jpg";
import "./SignUp.css";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    const handleGoogleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/signin");
        } catch (error) {
            console.error("Google Sign Up Error:", error);
        }
    };

    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/signin");
        } catch (error) {
            console.error("Email Sign Up Error:", error);
        }
    };

    return (
        <div className="signup">
            <img className="nav-img" src={navimage} alt="Navigation" />
            <Link className="logo-img" to="/"><img src={logo} alt="Logo" /></Link>
            <div className="card">
                <p className="google-option" style={{cursor:"pointer"}} onClick={handleGoogleSignUp}>Sign up with Google</p>
                <p className="or">Or</p>
                <h2 className="sign">Sign Up</h2>
                <form className="form" onSubmit={handleEmailSignUp}>
                    <div style={{ display: "flex", flexDirection: "row", gap: "40px" }}>
                        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <button type="submit" style={{ color: "#003D96", textDecoration: "none" }}>Sign Up</button>
                </form>
                <p className="google-option" style={{ marginLeft: "26%", textDecoration: "none" }}>
                    Already have an account? <Link to="/signin"><span style={{ textDecoration: "underline", color: "white", cursor: "pointer" }}>Sign in</span></Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
