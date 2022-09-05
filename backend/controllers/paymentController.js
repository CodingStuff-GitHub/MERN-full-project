import asyncPromiseError from "../middleware/asyncPromiseError.js";
import stripe from "stripe";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

const stripeUse = stripe(process.env.STRIPE_API_SECRET);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1522 * 100;
};

export const createPaymentIntent = asyncPromiseError(
  async (req, res, _next) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripeUse.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  }
);
