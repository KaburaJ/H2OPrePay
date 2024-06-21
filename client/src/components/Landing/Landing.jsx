import React from "react";
import "./Landing.css"
import navimage from "../assets/Ellipse 1.png";
import logo from "../assets/h2ologo.jpg"
import { Link } from "react-router-dom";

const Landing = () => {
    return(
        <div className="landing">
            <img className="nav-img" src={navimage}></img>
            <img className="logo-img" src={logo}></img>
            <h2 className="header-text">Your one stop shop for all your Water Payment needs</h2>
            <Link to="/signup" ><button className="action-button">Get Started</button></Link>
        </div>
    )
}

export default Landing;