import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
} from "../controllers/userController.js";

export const router = express.Router();

//Register a user
router.route("/register").post(registerUser);

// Login a user.
router.route("/login").post(loginUser);

// Logout a user.
router.route("/logout").post(logoutUser);

// Forgot Password.
router.route("/password/forgot").post(forgotPassword);
