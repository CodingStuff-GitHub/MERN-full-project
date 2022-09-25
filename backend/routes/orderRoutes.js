import express from "express";
import {
  createOrder,
  getSingleOrder,
  getLoggedUserOrders,
  updateOrder,
  deleteOrder,
  getAllOrders,
} from "../controllers/orderController.js";

export const router = express.Router();

import { isAuthenticated, AuthorizedRoles } from "../middleware/auth.js";

// Creates a new order
router.route("/order/new").post(isAuthenticated, createOrder);

// Gets a single order.
router.route("/order/:id").get(isAuthenticated, getSingleOrder);

// Gets all orders for a user.
router.route("/orders").get(isAuthenticated, getLoggedUserOrders);

/**
 * Admin Routes
 */
// Update order
router
  .route("/admin/order/:id")
  .put(isAuthenticated, AuthorizedRoles("admin"), updateOrder);

// Delete an order
router
  .route("/admin/order/:id")
  .delete(isAuthenticated, AuthorizedRoles("admin"), deleteOrder);

// Obtain orders for all user.
router
  .route("/admin/orders")
  .get(isAuthenticated, AuthorizedRoles("admin"), getAllOrders);
