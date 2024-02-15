const envVariable = require("../config/index");
const { updateUserPaymentStatus } = require("./userServices");
const UnProcessableError = require("../lib/errorInstances/unProcessableError");

const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_KEY } = envVariable;

const stripe = require("stripe")(STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
  appInfo: {
    name: "vzy-api",
    version: "1.0.0", // Optional
    url: "https://1ed3-105-113-61-193.ngrok-free.app", // Optional
  },
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

const verifyPayment = async (email) => {
  const updatedUser = await updateUserPaymentStatus(email);

  if (updatedUser) {
    return updatedUser;
  }
};

module.exports = {
  verifyPayment,
  paymentIntent,
};
