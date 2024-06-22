const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const axios = require("axios"); 
const moment = require("moment");
const apiRouter = require('./api');
const cors = require("cors");
const fs = require("fs");

const port = 5000;
const hostname = "localhost";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Update the CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Set this to your frontend URL
  credentials: true,
}));

app.use('/', apiRouter);

const server = http.createServer(app);

// ACCESS TOKEN FUNCTION - Updated to use 'axios'
async function getAccessToken() {
  const consumer_key = "Vv6XeQzVXWRJW1GtcLs5FutHOS6jBpgtighDQt77R1uCXGZP"; 
  const consumer_secret = "AhviUg0klRN0SBdjFsfbyLR1GNAecJQYl861GISnrgq4HgfemJvSJ8Aq1nYTDS6r"; 
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = "Basic " + new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: auth,
      },
    });
    const dataresponse = response.data;
    const accessToken = dataresponse.access_token;
    return accessToken;
  } catch (error) {
    throw error;
  }
}

app.get("/", (req, res) => {
  res.send("MPESA DARAJA API WITH NODE JS BY UMESKIA SOFTWARES");
  var timeStamp = moment().format("YYYYMMDDHHmmss");
  console.log(timeStamp);
});

// ACCESS TOKEN ROUTE
app.get("/access_token", (req, res) => {
  getAccessToken()
    .then((accessToken) => {
      res.send("😀 Your access token is " + accessToken);
    })
    .catch(console.log);
});

// MPESA STK PUSH ROUTE
app.post("/stkpush", (req, res) => {
  const { amount, phoneNumber } = req.body;
  getAccessToken()
    .then((accessToken) => {
      const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
      const auth = "Bearer " + accessToken;
      const timestamp = moment().format("YYYYMMDDHHmmss");
      const password = new Buffer.from("174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp).toString("base64");

      axios.post(url, {
        BusinessShortCode: "174379",
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber, 
        PartyB: "174379",
        PhoneNumber: phoneNumber,
        CallBackURL: "https://dd3d-105-160-22-207.ngrok-free.app/callback",
        AccountReference: "H2OPREPAY",
        TransactionDesc: "Mpesa Daraja API stk push test",
      }, {
        headers: {
          Authorization: auth,
        },
      }).then((response) => {
        res.send("😀 Request is successful done ✔✔. Please enter mpesa pin to complete the transaction");
      }).catch((error) => {
        console.log(error);
        res.status(500).send("❌ Request failed");
      });
    })
    .catch(console.log);
});

// STK PUSH CALLBACK ROUTE
app.post("/callback", (req, res) => {
  console.log("STK PUSH CALLBACK");
  const CheckoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
  const ResultCode = req.body.Body.stkCallback.ResultCode;
  var json = JSON.stringify(req.body);
  fs.writeFile("stkcallback.json", json, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("STK PUSH CALLBACK JSON FILE SAVED");
  });
  console.log(req.body);
});

// REGISTER URL FOR C2B
app.get("/registerurl", (req, resp) => {
  getAccessToken()
    .then((accessToken) => {
      const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
      const auth = "Bearer " + accessToken;
      axios.post(url, {
        ShortCode: "174379",
        ResponseType: "Complete",
        ConfirmationURL: "http://example.com/confirmation",
        ValidationURL: "http://example.com/validation",
      }, {
        headers: {
          Authorization: auth,
        },
      }).then((response) => {
        resp.status(200).json(response.data);
      }).catch((error) => {
        console.log(error);
        resp.status(500).send("❌ Request failed");
      });
    })
    .catch(console.log);
});

app.get("/confirmation", (req, res) => {
  console.log("All transaction will be sent to this URL");
  console.log(req.body);
});

app.get("/validation", (req, resp) => {
  console.log("Validating payment");
  console.log(req.body);
});

// B2C ROUTE OR AUTO WITHDRAWAL
app.get("/b2curlrequest", (req, res) => {
  getAccessToken()
    .then((accessToken) => {
      const securityCredential = "AhviUg0klRN0SBdjFsfbyLR1GNAecJQYl861GISnrgq4HgfemJvSJ8Aq1nYTDS6r"
      const auth = "Bearer " + accessToken;
      axios.post(url, {
        InitiatorName: "testapi",
        SecurityCredential: securityCredential,
        CommandID: "PromotionPayment",
        Amount: "1",
        PartyA: "600996",
        PartyB: "",//phone number to receive the stk push
        Remarks: "Withdrawal",
        QueueTimeOutURL: "https://mydomain.com/b2c/queue",
        ResultURL: "https://mydomain.com/b2c/result",
        Occasion: "Withdrawal",
      }, {
        headers: {
          Authorization: auth,
        },
      }).then((response) => {
        res.status(200).json(response.data);
      }).catch((error) => {
        console.log(error);
        res.status(500).send("❌ Request failed");
      });
    })
    .catch(console.log);
});

server.listen(port, hostname, () => {
  var server = app.listen(10000, '0.0.0.0');
});
