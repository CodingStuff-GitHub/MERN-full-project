import express from "express";
import errorMiddleware from "./middleware/error.js";

const app = express();

app.use(express.json());

import { router as productRoutes } from "./routes/productRoutes.js";
import { router as userRoutes } from "./routes/userRoutes.js";

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);

// Applies the error middleware to the application.
app.use(errorMiddleware);

export default app;
