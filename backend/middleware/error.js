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

  return res.status(err.statusCode).json({
    success: false,
    err: err.message,
  });
};
