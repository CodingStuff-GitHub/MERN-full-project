import express from "express";
import {
  createOrder,
  getSingleOrder,
  getLoggedUserOrders,
} from "../controllers/orderController.js";

export const router = express.Router();

import { isAuthenticated, AuthorizedRoles } from "../middleware/auth.js";

// Creates a new order
router.route("/order/new").post(isAuthenticated, createOrder);

// Gets a single order.
router.route("/order/:id").get(isAuthenticated, getSingleOrder);

// Gets all orders for a user.
router.route("/orders").get(isAuthenticated, getLoggedUserOrders);
