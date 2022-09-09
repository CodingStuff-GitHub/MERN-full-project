import asyncPromiseError from "../middleware/asyncPromiseError.js";
import stripe from "stripe";

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1522 * 100;
};

export const createPaymentIntent = asyncPromiseError(
  async (req, res, _next) => {
    const stripeUseSecret = stripe(process.env.STRIPE_API_SECRET);
    const { items } = req.body;
    //No items send error response
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripeUseSecret.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  }
);

export const getPublishableKey = asyncPromiseError(async (_req, res, _next) => {
  res.status(200).json({
    success: true,
    publishableKey: process.env.STRIPE_API_PUBLISHABLE,
  });
});
