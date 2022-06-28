import asyncPromiseError from "../middleware/asyncPromiseError.js";
import User from "../models/userModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { jwtCookie } from "../utils/JWTcookie.js";

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
  jwtCookie(user, 201, res);
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

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  jwtCookie(user, 200, res);
});
