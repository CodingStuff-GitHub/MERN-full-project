import asyncPromiseError from "../middleware/asyncPromiseError.js";
import User from "../models/userModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const registerUser = asyncPromiseError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name: name,
    email: email,
    password: password,
    avatar: {
      public_id: "Sample_ID",
      url: "Sample_URL",
    },
  });

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    token,
  });
});

export const loginUser = asyncPromiseError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter an email and password.", 400));
  }
  //select password because password was select:false in userSchema
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatch = user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    token,
  });
});
