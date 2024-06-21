import React from "react";
import navimage from "../assets/Ellipse 1.png";
import logo from "../assets/h2ologo.jpg"
import { Link } from "react-router-dom";
import "./DeviceRegistration.css"

const DeviceRegistration = () => {
    return (
        <div className="DeviceRegistration">
            <img className="nav-img" src={navimage}></img>
            <Link className="logo-img" to="/"><img src={logo}></img></Link>
            <div className="card">
                <h2 className="sign">Device Registration</h2>
                <p style={{color:"white", marginLeft:"150px", marginTop:"-20px"}}>You are about to DeviceRegistration your meter</p>
                <form className="form">
                    <input type="text" placeholder="Your Device ID"></input>
                    <input type="text" placeholder="Your Mpesa Phone Number"></input>
                    <button><Link to="/home" style={{ color: "#003D96", textDecoration: "white" }}>Take me Home</Link></button>

                </form>
            </div>
        </div>
    )
}

export default DeviceRegistration