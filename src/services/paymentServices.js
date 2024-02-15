const envVariable = require("../config/index");
const UnProcessableError = require("../lib/errorInstances/unProcessableError");

const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_KEY } = envVariable;

const stripe = require("stripe")(STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const paymentIntent = async () => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    throw new UnProcessableError(error.message);
  }
};

const verifyPayment = async (bodyData, sig) => {
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      bodyData,
      sig,
      STRIPE_WEBHOOK_KEY
    );
  } catch (err) {
    console.error(err.message);
    // return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(event);

  res.status(200).json({ received: true });
};

module.exports = {
  verifyPayment,
  paymentIntent,
};
