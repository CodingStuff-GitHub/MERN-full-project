import express from "express";

const app = express();

app.use(express.json());

// Returns a list of product routes.
import { router as productRoutes } from "./routes/productRoutes.js";

app.use("/api/v1", productRoutes);

export default app;
