import express from "express";
import { getAllProducts } from "../controllers/productController.js";

export const router = express.Router();

// Returns a list of all products
router.route("/products").get(getAllProducts);
