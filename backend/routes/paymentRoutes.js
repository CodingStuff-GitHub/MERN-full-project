import express from "express";
import {
  createPaymentIntent,
  getPublishableKey,
} from "../controllers/paymentController.js";
import { isAuthenticated, AuthorizedRoles } from "../middleware/auth.js";

export const router = express.Router();

router
  .route("/create-payment-intent")
  .post(isAuthenticated, AuthorizedRoles("admin", "user"), createPaymentIntent);

router
  .route("/get-publishable-key")
  .get(isAuthenticated, AuthorizedRoles("admin", "user"), getPublishableKey);
