import express from "express";
import { createOrder } from "../controllers/orderController.js";

export const router = express.Router();

// Creates a new order
router.route("/order").post(createOrder);
