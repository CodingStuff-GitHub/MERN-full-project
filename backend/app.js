import cookieParser from "cookie-parser";
import express from "express";
import errorMiddleware from "./middleware/error.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

import { router as productRoutes } from "./routes/productRoutes.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as orderRoutes } from "./routes/orderRoutes.js";

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);

// Applies the error middleware to the application.
app.use(errorMiddleware);

export default app;
