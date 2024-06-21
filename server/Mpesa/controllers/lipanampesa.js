import request from "request";
import dotenv from 'dotenv';
import { getTimestamp } from "../utils/timestamp.js";
import ngrok from 'ngrok';

dotenv.config();

const initiateSTKPush = async (req, res) => {
    try {
        const { amount, phone, Order_ID } = req.body;
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
        const auth = "Bearer " + req.safaricom_access_token;

        const timestamp = getTimestamp();
        const password = Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64');
        const callback_url = await ngrok.connect(process.env.PORT);
        const api = ngrok.getApi();
        await api.listTunnels();

        console.log("callback ", callback_url);
        request(
            {
                url: url,
                method: "POST",
                headers: {
                    "Authorization": auth
                },
                json: {
                    "BusinessShortCode": process.env.BUSINESS_SHORT_CODE,
                    "Password": "Safaricom999!*!",
                    "Timestamp": timestamp,
                    "TransactionType": "CustomerPayBillOnline",
                    "Amount": amount,
                    "PartyA": "600981",
                    "PartyB": "600000",
                    "PhoneNumber": "254708374149",
                    "CallBackURL": `${callback_url}/api/stkPushCallback/${Order_ID}`,
                    "AccountReference": "H2o",
                    "TransactionDesc": "CustomerPayBillOnline"
                }
            },
            function (e, response, body) {
                if (e) {
                    console.error(e);
                    res.status(503).send({
                        message: "Error with the stk push",
                        error: e
                    });
                } else {
                    res.status(200).json(body);
                }
            }
        );
    } catch (e) {
        console.error("Error while trying to create LipaNaMpesa details", e);
        res.status(503).send({
            message: "Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error: e
        });
    }
};

export { initiateSTKPush };
