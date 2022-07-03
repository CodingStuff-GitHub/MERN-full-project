import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getAllReviews,
  deleteReview,
} from "../controllers/productController.js";

import { isAuthenticated, AuthorizedRoles } from "../middleware/auth.js";

export const router = express.Router();

// Returns a list of all products
router.route("/products").get(getAllProducts);

// Get a single product
router.route("/product/:id").get(getSingleProduct);

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

//Create or update a product review
router.route("/review").put(isAuthenticated, createProductReview);

// Get all reviews for a product
router.route("/reviews").get(getAllReviews);

// Delete a review
router.route("/review").delete(isAuthenticated, deleteReview);
