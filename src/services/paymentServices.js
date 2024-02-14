const envVariable = require("../config/index");

const { STRIPE_SECRET_KEY } = envVariable;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const verifyPayment = async (event) => {
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        console.log(event.data.object.shipping.name);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    // response.status(400).send(`Webhook Error: ${err.message}`);

    console.log(err.message);
    return;
  }
};

module.exports = { verifyPayment };
