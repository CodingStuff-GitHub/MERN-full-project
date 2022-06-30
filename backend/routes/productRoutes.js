import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} from "../controllers/productController.js";

import { isAuthenticated, AuthorizedRoles } from "../middleware/auth.js";

export const router = express.Router();

// Returns a list of all products
router.route("/products").get(getAllProducts);

// Create a new product.
router
  .route("/admin/product/new")
  .post(isAuthenticated, AuthorizedRoles("admin"), createProduct);

//Note: You can also do route.route(...).get(...).delete(...).put(...) for same route

//Update a product
router
  .route("/admin/product/:id")
  .put(isAuthenticated, AuthorizedRoles("admin"), updateProduct);

// Delete a product
router
  .route("/admin/product/:id")
  .delete(isAuthenticated, AuthorizedRoles("admin"), deleteProduct);

// Get a single product
router.route("/product/:id").get(getSingleProduct);
