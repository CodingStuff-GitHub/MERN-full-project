import { ErrorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncPromiseError from "./asyncPromiseError.js";

export const isAuthenticated = asyncPromiseError(async (req, _res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to access this page"));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  //{id : _id}
  req.user = await User.findById(decodedData.id);
  next();
});
