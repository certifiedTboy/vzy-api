const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const stripe = require("stripe")(
  "https://vzy-api-oux5.onrender.com/api/v1/users/payment-status",
  {
    apiVersion: "2020-08-27",
    appInfo: {
      // For sample support and debugging, not required for production:
      name: "vzi-api",
      version: "0.0.2",
    },
  }
);

// cors options object
const corsOptions = {
  origin: "https://vzy-api-oux5.onrender.com",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  express.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.post("/webhook", async (req, res) => {
  let data, eventType;

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === "payment_intent.succeeded") {
    const response = await fetch(
      "https://vzy-webhook-server.onrender.com/api/v1/users/payment-status",
      {
        method: "POST",
        body: JSON.stringify({
          email: req.body.data.metadata.customer_email || "etosin70@gmail.com",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("payment successful");
  } else if (eventType === "payment_intent.payment_failed") {
    return console.log("Payment failed.");
  }
  return res.sendStatus(200);
});

app.listen(4242, () =>
  console.log(
    `Node server listening at https://vzy-webhook-server.onrender.com`
  )
);
