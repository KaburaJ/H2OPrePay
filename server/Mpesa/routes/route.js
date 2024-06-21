import express from 'express';
import { initiateSTKPush } from "../controllers/lipanampesa.js";
import { accessToken } from "../middlewares/generateAccessToken.js";

const router = express.Router();

router.route('/stkPush').post(accessToken, initiateSTKPush);
// router.route('/stkPushCallback/:Order_ID').post(stkPushCallback);
// router.route('/confirmPayment/:CheckoutRequestID').post(accessToken, confirmPayment);

export default router;
