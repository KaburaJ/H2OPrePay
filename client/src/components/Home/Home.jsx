import React, { useEffect, useReducer, useState } from 'react';
import "./Home.css"
import navimage from "../assets/Ellipse 1.png";
import logo from "../assets/h2ologo.jpg"
import { Link } from "react-router-dom"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from "axios";
import Recharge from '../Recharge/Recharge';
import Modal from './Modal';
import Fuliza from '../Fuliza/Fuliza';

const initialState = {
    labels: [],
    datasets: [
        {
            label: 'Temperature (°C)',
            data: [],
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
        },
        {
            label: 'Humidity (%)',
            data: [],
            borderColor: 'rgba(153,102,255,1)',
            fill: false,
        },
    ],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                labels: action.labels,
                datasets: state.datasets.map((dataset, index) => ({
                    ...dataset,
                    data: index === 0 ? action.temperatureData : action.humidityData,
                })),
            };
        default:
            return state;
    }
};

const Home = () => {
    const [data, dispatch] = useReducer(reducer, initialState);
    const [token, setToken] = useState("");
    const [temperatureData, setTemperatureData] = useState(0);
    const [humidityData, setHumidityData] = useState(0);
    const percentage = 66;
    const total = 14800;
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const shouldShowFuliza = percentage <= 0

    useEffect(() => {
        const getToken = async () => {
            try {
                console.log('Fetching token...');
                const response = await axios.post("https://api.waziup.io/api/v2/auth/token", {
                    username: "ndibapeter4@gmail.com",
                    password: "39297376PN"
                });
                console.log('Token fetched:', response.data); // Adjust this based on the actual response structure
                setToken(response.data); // Ensure this is the correct path
            } catch (error) {
                console.error('Error fetching token', error);
            }
        };

        const fetchTempData = async () => {
            try {
                const currentDate = new Date();
                const twoDaysAgo = new Date(currentDate.getTime() - (2 * 24 * 60 * 60 * 1000)); // Two days ago
                const formattedCurrentDate = currentDate.toISOString();
                const formattedTwoDaysAgo = twoDaysAgo.toISOString();

                const response = await axios.get('https://api.waziup.io/api/v2/devices/Esp32/sensors/TC/values', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        limit: 35,
                        offset: 2,
                        sort: 'asc',
                        date_from: formattedTwoDaysAgo,
                        date_to: formattedCurrentDate,
                        calibrated: false
                    }
                });
                const fetchedData = response.data;
                console.log('Temperature data fetched:', fetchedData);
                const fetchTempData = fetchedData.map(entry => ({
                    timestamp: new Date(entry.date_received).toLocaleString().split(" ")[1],
                    value: entry.value
                }));
                console.log("weuh", fetchTempData);
                const val = fetchTempData[0].timestamp.split(" ")
                console.log("wiiih", val[1]);
                setTemperatureData(fetchTempData)
                return fetchTempData
            } catch (error) {
                console.error('Error fetching temperature data', error);
                return [];
            }
        };

        const fetchHumidData = async () => {
            try {
                const currentDate = new Date();
                const twoDaysAgo = new Date(currentDate.getTime() - (2 * 24 * 60 * 60 * 1000));
                const formattedCurrentDate = currentDate.toISOString();
                const formattedTwoDaysAgo = twoDaysAgo.toISOString();

                const response = await axios.get('https://api.waziup.io/api/v2/devices/Esp32/sensors/TC_1/values', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        limit: 35,
                        offset: 2,
                        sort: 'asc',
                        date_from: formattedTwoDaysAgo,
                        date_to: formattedCurrentDate,
                        calibrated: false
                    }
                });
                const fetchedData = response.data;
                console.log('Humidity data fetched:', fetchedData);
                const fetchHumidityData = fetchedData.map(entry => ({
                    timestamp: new Date(entry.date_received).toLocaleString().split(" ")[1],
                    value: entry.value
                }));
                setHumidityData(fetchHumidityData)
                return fetchHumidityData
            } catch (error) {
                console.error('Error fetching humidity data', error);
                return [];
            }
        };

        const fetchData = async () => {
            console.log('Fetching data...');
            const tempData = await fetchTempData();
            console.log('Temp data:', tempData);
            const humidData = await fetchHumidData();
            console.log('Humid data:', humidData);

            const labels = tempData.map(entry => entry.timestamp);
            const temperatureData = tempData.map(entry => entry.value);
            const humidityData = humidData.map(entry => entry.value);

            dispatch({
                type: 'SET_DATA',
                labels: labels,
                temperatureData: temperatureData,
                humidityData: humidityData,
            });
        };

        if (token) {
            fetchData();
        } else {
            getToken();
        }
    }, [token]);

    const data1 = {
        // labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        labels: data.labels,
        datasets: [
            {
                label: 'Turbidity',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#B7B7FF',
                borderColor: '#B7B7FF',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#B7B7FF',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#B7B7FF',
                pointHoverBorderColor: '#B7B7FF',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                type: "line",
                pointHitRadius: 10,
                data: data.datasets[1].data,
                order: 1,
            },
            {
                label: 'Flow Meter',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#003d96',
                borderColor: '#003d96',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#003d96',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#003d96',
                pointHoverBorderColor: '#003d96',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                type: "line",
                pointHitRadius: 10,
                data: data.datasets[0].data,
                order: 1,
            },
        ]
    };
    const data2 = {
        // labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        labels: data.labels,
        datasets: [

            {
                label: 'Turbidity',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#003D96',
                borderColor: '#003D96',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#B7B7FF',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#B7B7FF',
                pointHoverBorderColor: '#B7B7FF',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.datasets[0].data
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 3000,
            easing: "easeInBounce",
        },
        title: {
            display: true,
            text: "Bar + Line Chart",
            fontSize: 25,
        },
        scales: {
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Months",
                    },
                    stacked: "true",
                },
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Values",
                    },
                    stacked: "true",
                },
            ],
        },
    };

    return (
        <div className="home">
            <div className="main-header">
                <div><img className="logo-img" src={logo}></img></div>
                {/* <div className="headers">
                    <p>Consumption</p>
                    <p>Purity Rates</p>
                </div> */}
                <button className="header-button" onClick={handleButtonClick}>Recharge Now</button>
            </div>
            <div className="line-chart" style={{ marginTop: "-100px", marginBottom: "80px", background: "none" }}>
                <Bar
                    data={data1}
                    width={100}
                    height={500}
                    options={options}

                // options={{
                //     maintainAspectRatio: false
                // }}
                />
            </div>
            <div className="second-container">
                <div style={{ width: 300, height: 300, marginLeft: "40px", marginTop: "120px", fill: "#003D96", display: "flex", flexDirection: "column" }}>
                    <CircularProgressbar value={66} text={`${percentage} / ${total}`} styles={{
                        path: {
                            stroke: '#003D96'
                        },
                        trail: {
                            stroke: "rgb(183, 183, 255)"
                        },
                        text: {
                            fill: '#003D96',
                            fontSize: '14px'
                        }
                    }} />
                </div>
                <div className="rates">
                    <h2>Our Rates</h2>
                    <div className="rate">
                        <p>20L</p>
                        <p>10 Kshs</p>
                    </div>
                    <div className="rate">
                        <p>50L</p>
                        <p>25 Kshs</p>
                    </div>
                    <div className="rate">
                        <p>100L</p>
                        <p>50 Kshs</p>
                    </div>
                    <div className="rate">
                        <p>500L</p>
                        <p>250 Kshs</p>
                    </div>
                    <div className="rate">
                        <p>1000L</p>
                        <p>500 Kshs</p>
                    </div>
                    <div className="rate">
                        <p>10000L</p>
                        <p>5000 Kshs</p>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal onClose={handleCloseModal}>
                    {shouldShowFuliza ? <Fuliza/> : <Recharge />}
                </Modal>
            )}
            {/* <Line style={{padding:"30px"}} data={data} options={{
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
      }} /> */}

            {/* <div className="line-chart">
                <Line data={data2} />

            </div> */}
        </div>
    )
}

export default Home