import React from "react";
import navimage from "../assets/Ellipse 1.png";
import logo from "../assets/h2ologo.jpg"
import { Link } from "react-router-dom";
import "./Recharge.css"

const Recharge = () => {
    return (
        <div className="Recharge">
            <img className="nav-img" src={navimage}></img>
            <Link className="logo-img" to="/"><img src={logo}></img></Link>
            <div className="card">
                <h2 className="sign">Recharge</h2>
                <p style={{color:"white", marginLeft:"150px", marginTop:"-20px"}}>You are about to recharge your meter</p>
                <form className="form">
                    <input type="text" placeholder="Your Device ID"></input>
                    <input type="text" placeholder="Your Mpesa Phone Number"></input>
                    <input type="text" placeholder="Amount you would like to recharge"></input>
                    <button><Link to="/home" style={{ color: "#003D96", textDecoration: "white" }}>Recharge</Link></button>

                </form>
            </div>
        </div>
    )
}

export default Recharge