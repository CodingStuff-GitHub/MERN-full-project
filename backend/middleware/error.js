import { ErrorHandler } from "../utils/errorHandler.js";

export default (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //CastError Handling
  if (err.name === "CastError") {
    err.message = `Resource Not Found. Invalid : ${err.path}`;
    //400 for bad request
    err = new ErrorHandler(err.message, 400);
  }
  //Duplicate Key Error
  if (err.code === 11000) {
    err.message = `Duplicate. Invalid : ${Object.keys(err.keyValue)}`;
    err = new ErrorHandler(err.message, 400);
  }
  //JWT error handling
  if (err.code === "JsonWebTokenError") {
    err.message = "JWT is Invalid, Please try again.";
    err = new ErrorHandler(err.message, 400);
  }
  //JWT expired error handling
  if (err.code === "TokenExpiredError") {
    err.message = "JWT is expired, Please try again.";
    err = new ErrorHandler(err.message, 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    err: err.message,
  });
};
