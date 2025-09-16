const express = require("express");

const router = express.Router();

const authentication = require("../Middlewares/authenticateToken");
const {
  createPayment,
  executePayment,
  paymentCancel,
} = require("../Controllers/payment.Controller");

router.post("/create-payment", createPayment);

// Route to execute PayPal payment (new)
router.post("/execute-payment", executePayment);

// Route to handle payment cancellation
router.get("/payment-cancel", paymentCancel);

module.exports = router;
