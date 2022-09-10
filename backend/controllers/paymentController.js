import asyncPromiseError from "../middleware/asyncPromiseError.js";
import stripe from "stripe";
import { ErrorHandler } from "../utils/errorHandler.js";

const calculateOrderAmount = (grandTotal) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return grandTotal * 100;
};

export const createPaymentIntent = asyncPromiseError(async (req, res, next) => {
  const stripeUseSecret = stripe(process.env.STRIPE_API_SECRET);
  const { grandTotal } = req.body;
  console.log(grandTotal);
  //No items send error response
  if (!grandTotal) {
    return next(new ErrorHandler("No grand total given.", 400));
  }
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripeUseSecret.paymentIntents.create({
    amount: calculateOrderAmount(grandTotal),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

export const getPublishableKey = asyncPromiseError(async (_req, res, _next) => {
  res.status(200).json({
    success: true,
    publishableKey: process.env.STRIPE_API_PUBLISHABLE,
  });
});
