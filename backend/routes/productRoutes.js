import express from "express";
import { getAllProducts } from "../controllers/productController.js";

export const router = express.Router();

router.route("/products").get(getAllProducts);
