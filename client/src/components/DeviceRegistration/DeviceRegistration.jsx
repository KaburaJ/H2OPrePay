import React, { useState } from "react";
import navimage from "../assets/Ellipse 1.png";
import logo from "../assets/h2ologo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { database } from "../../firebase"; // Import database directly
import "./DeviceRegistration.css";

const DeviceRegistration = () => {
  const [deviceId, setDeviceId] = useState("");
  const [mpesaPhoneNumber, setMpesaPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleRegisterDevice = async (event) => {
    event.preventDefault();
    try {
    //   const deviceData = {
    //     deviceId: deviceId,
    //     mpesaPhoneNumber: mpesaPhoneNumber,
    //     registeredAt: Date.now(),
    //   };

      // Get a reference to the "devices" node directly from the imported database
    //   const deviceRef = database.ref("devices");
    //   const newDeviceRef = deviceRef.push();
      
    //   await newDeviceRef.set(deviceData);

    //   console.log("Device registered successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error registering device:", error);
      setError(error.message);
    }
  };

  return (
    <div className="DeviceRegistration">
      <img className="nav-img" src={navimage} alt="navigation"></img>
      <Link className="logo-img" to="/"><img src={logo} alt="logo"></img></Link>
      <div className="card">
        <h2 className="sign">Device Registration</h2>
        <p style={{ color: "white", marginLeft: "150px", marginTop: "-20px" }}>You are about to register your meter</p>
        <form className="form">
          <input type="text" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} placeholder="Your Device ID"></input>
          <input type="text" value={mpesaPhoneNumber} onChange={(e) => setMpesaPhoneNumber(e.target.value)} placeholder="Your Mpesa Phone Number"></input>
          <button onClick={handleRegisterDevice}>Register Device</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default DeviceRegistration;
