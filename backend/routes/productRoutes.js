import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";

export const router = express.Router();

// Returns a list of all products
router.route("/products").get(getAllProducts);

// Create a new product.
router.route("/product/new").post(createProduct);

//Update a product
router.route("/product/:id").put(updateProduct);
