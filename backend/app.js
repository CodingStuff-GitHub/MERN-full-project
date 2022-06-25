import express from "express";
import errorMiddleware from "./middleware/error.js";

const app = express();

app.use(express.json());

// Returns a list of product routes.
import { router as productRoutes } from "./routes/productRoutes.js";

app.use("/api/v1", productRoutes);

// Applies the error middleware to the application.
app.use(errorMiddleware);

export default app;
