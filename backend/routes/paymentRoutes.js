import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";
import { isAuthenticated, AuthorizedRoles } from "../middleware/auth.js";

export const router = express.Router();
router
  .route("/create-payment-intent")
  .post(isAuthenticated, AuthorizedRoles("admin", "user"), createPaymentIntent);
