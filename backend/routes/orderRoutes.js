import express from "express";
import { createOrder } from "../controllers/orderController.js";

export const router = express.Router();

import { isAuthenticated, AuthorizedRoles } from "../middleware/auth.js";

// Creates a new order
router.route("/order").post(isAuthenticated, createOrder);
