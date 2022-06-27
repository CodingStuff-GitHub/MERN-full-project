import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

export const router = express.Router();

//Register a user
router.route("/register").post(registerUser);

// Login user.
router.route("/login").post(loginUser);
