import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateRoleUser,
  deleteUser,
} from "../controllers/userController.js";

import { isAuthenticated, AuthorizedRoles } from "../middleware/auth.js";

export const router = express.Router();

//Register a user
router.route("/register").post(registerUser);

// Login a user.
router.route("/login").post(loginUser);

// Logout a user.
router.route("/logout").post(logoutUser);

// Forgot Password.
router.route("/password/forgot").post(forgotPassword);

// Reset password
router.route("/password/reset/:token").put(resetPassword);

//Get User Details
router
  .route("/profile")
  .get(isAuthenticated, AuthorizedRoles("admin", "user"), getUserDetails);

//Update Password
router
  .route("/password/update")
  .put(isAuthenticated, AuthorizedRoles("admin", "user"), updatePassword);

// Update a profile
router
  .route("/profile/update")
  .put(isAuthenticated, AuthorizedRoles("admin", "user"), updateProfile);

/**
 * Admin Routes for users
 */

// List all users.
router
  .route("/admin/users")
  .get(isAuthenticated, AuthorizedRoles("admin"), getAllUsers);

//Get a single user
router
  .route("/admin/users/:id")
  .get(isAuthenticated, AuthorizedRoles("admin"), getSingleUser);

// Update an user's role
router
  .route("/admin/users/:id/role")
  .put(isAuthenticated, AuthorizedRoles("admin"), updateRoleUser);

// Delete a user
router
  .route("/admin/users/:id/delete")
  .delete(isAuthenticated, AuthorizedRoles("admin"), deleteUser);
