import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
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
