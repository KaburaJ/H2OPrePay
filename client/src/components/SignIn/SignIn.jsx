import React, { useState } from 'react';
import navimage from "../assets/Ellipse 1.png";
import logo from "../assets/h2ologo.jpg"
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../../firebase'
import "./SignIn.css"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleGoogleSignIn = async() => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        // User signed in successfully
        console.log(result.user);
        navigate("/device")
      })
      .catch((error) => {
        // Handle error
        setError(error.message);
      });
  };

  const handleEmailSignIn = async(e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User signed in successfully
        console.log(userCredential.user);
        navigate("/device")
      })
      .catch((error) => {
        // Handle error
        setError(error.message);
      });
  };
  
  return (
    <div className="SignIn">
      <img className="nav-img" src={navimage}></img>
      <Link className="logo-img" to="/"><img src={logo}></img></Link>
      <div className="card">
        <p className="google-option" style={{cursor:"pointer"}}><a onClick={handleGoogleSignIn}>Sign in with Google</a></p>
        <p className="or">Or</p>
        <h2 className="sign">Sign In</h2>
        <form className="form">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
          <button onClick={handleEmailSignIn}>Sign In</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p className="google-option" style={{ marginLeft: "26%", textDecoration: "none" }}>Already have an account? <Link to="/signup"><a style={{ textDecoration: "underline", color: "white", cursor: "pointer" }}>Sign up</a></Link></p>
        </form>
      </div>
    </div>
  )
}

export default SignIn;