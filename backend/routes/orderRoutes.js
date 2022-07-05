import express from "express";
import { createOrder, getSingleOrder } from "../controllers/orderController.js";

export const router = express.Router();

import { isAuthenticated } from "../middleware/auth.js";

// Creates a new order
router.route("/order").post(isAuthenticated, createOrder);

// Gets a single order.
router.route("/order/:id").get(isAuthenticated, getSingleOrder);
