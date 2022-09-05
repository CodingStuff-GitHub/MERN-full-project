import cookieParser from "cookie-parser";
import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import errorMiddleware from "./middleware/error.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

import { router as productRoutes } from "./routes/productRoutes.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as orderRoutes } from "./routes/orderRoutes.js";
import { router as paymentRoutes } from "./routes/paymentRoutes.js";

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

// Applies the error middleware to the application.
app.use(errorMiddleware);

export default app;
