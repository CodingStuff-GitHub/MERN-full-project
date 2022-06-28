import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} from "../controllers/productController.js";
import { isAuthenticated } from "../middleware/auth.js";

export const router = express.Router();

// Returns a list of all products
router.route("/products").get(getAllProducts);

// Create a new product.
router.route("/product/new").post(isAuthenticated, createProduct);

//Note: You can also do route.route(...).get(...).delete(...).put(...) for same route

//Update a product
router.route("/product/:id").put(isAuthenticated, updateProduct);

// Delete a product
router.route("/product/:id").delete(isAuthenticated, deleteProduct);

// Get a single product
router.route("/product/:id").get(getSingleProduct);
