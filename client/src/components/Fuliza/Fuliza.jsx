import React from "react";
import navimage from "../assets/Ellipse 1.png";
import logo from "../assets/h2ologo.jpg"
import { Link } from "react-router-dom";
import "./Fuliza.css"

const Fuliza = () => {
    return (
        <div className="Fuliza">
            <img className="nav-img" src={navimage}></img>
            <Link className="logo-img" to="/"><img src={logo}></img></Link>
            <div className="card">
                <h2 className="sign">Fuliza</h2>
                <p style={{color:"white", marginLeft:"150px", marginTop:"-20px"}}>You are about to Fuliza for your meter</p>
                <form className="form">
                    <input type="text" placeholder="Your Device ID"></input>
                    <input type="text" placeholder="Your Mpesa Phone Number"></input>
                    <input type="text" placeholder="Amount you would like to Fuliza"></input>
                    <button><Link to="/home" style={{ color: "#003D96", textDecoration: "white" }}>Fuliza</Link></button>

                </form>
            </div>
        </div>
    )
}

export default Fuliza