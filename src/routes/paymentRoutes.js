const express = require("express");
const {
  initiatePayment,
  createPaymentIntent,
} = require("../controllers/paymentControllers");
const requireSignin = require("../middlewares/requireSignin");

const router = express.Router();

router.post("/charge", initiatePayment);
router.get("/create-payment-intent", createPaymentIntent);

module.exports = router;
