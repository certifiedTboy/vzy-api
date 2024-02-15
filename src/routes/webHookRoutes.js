const express = require("express");
const { updatePaymentStatus } = require("../controllers/userControllers");

const router = express.Router();

router.post("/stripe", updatePaymentStatus);

module.exports = router;
