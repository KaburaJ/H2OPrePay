import React, { useState } from "react";
import navimage from "../assets/Ellipse 1.png";
import logo from "../assets/h2ologo.jpg";
import { Link } from "react-router-dom";
import "./Recharge.css";
import axios from 'axios';

const Recharge = () => {
    const [amount, setAmount] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [deviceId, setDeviceId] = useState("");

    const rechargeRequest = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://h2oprepay.onrender.com/stkpush', {
                amount,
                phoneNumber
            }, { withCredentials: true });
            console.log("amount:", amount);
            console.log("phone", phoneNumber);
            console.log("deviceId", deviceId);
        } catch (error) {
            console.error('Submit failed:', error);
        }
    };

    return (
        <div className="Recharge">
            <img className="nav-img" src={navimage} alt="Nav"></img>
            <Link className="logo-img" to="/"><img src={logo} alt="Logo"></img></Link>
            <div className="card">
                <h2 className="sign">Recharge</h2>
                <p style={{ color: "white", marginLeft: "150px", marginTop: "-20px" }}>You are about to recharge your meter</p>
                <form className="form" onSubmit={rechargeRequest}>
                    <input placeholder="Your Device ID" onChange={(e) => setDeviceId(e.target.value)}></input>
                    <input placeholder="Your Mpesa Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}></input>
                    <input placeholder="Amount you would like to recharge" onChange={(e) => setAmount(e.target.value)}></input>
                    <button type="submit" style={{ color: "#003D96", textDecoration: "none" }}>Recharge</button>
                </form>
            </div>
        </div>
    );
}

export default Recharge;
