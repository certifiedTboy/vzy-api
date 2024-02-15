const ResponseHandler = require("../lib/responseHandler");
const { makePayment, paymentIntent } = require("../services/paymentServices");

const initiatePayment = async (req, res, next) => {
  try {
    await makePayment();
  } catch (error) {
    next(error);
  }
};

const createPaymentIntent = async (req, res, next) => {
  try {
    const data = await paymentIntent();

    if (data) {
      ResponseHandler.created(res, data, "success");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  initiatePayment,
  createPaymentIntent,
};
