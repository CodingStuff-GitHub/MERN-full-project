import asyncPromiseError from "../middleware/asyncPromiseError.js";
import User from "../models/userModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { jwtCookie } from "../utils/JWTcookie.js";
import { sendEmail } from "../utils/sendEmail.js";

// Register a user
export const registerUser = asyncPromiseError(async (req, res, _next) => {
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

// Logs in a user
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

// Logs out a user
export const logoutUser = asyncPromiseError(async (req, res, _next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Forgot password.
export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  const resetToken = user.resetPasswordTokenGenerator();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/forgotPassword/reset/${resetToken}`;

  const message = `Your reset password link is : - \n ${resetPasswordUrl}\n If you did not want to reset your password, ignore it`;
  try {
    const emailSent = sendEmail({
      email: user.email,
      subject: "Reset Password Link",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email to ${user.email} send successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  }
};
