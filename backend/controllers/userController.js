import asyncPromiseError from "../middleware/asyncPromiseError.js";
import User from "../models/userModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { jwtCookie } from "../utils/JWTcookie.js";
import crypto from "crypto";

// Register a user
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
export const logoutUser = asyncPromiseError(async (req, res, next) => {
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
export const forgotPassword = asyncPromiseError(async (req, res, next) => {
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
    res.status(200).json({
      success: true,
      message: `Email to ${user.email} send successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  }
});

// Resets the user's password.
export const resetPassword = asyncPromiseError(async (req, res, next) => {
  // Generates hash of reset token to compare with the database one
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  //Search the user and it should not be expired
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset Link is invalid or expired.", 400));
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  return res.redirect("/login");
});

// Get user details.
export const getUserDetails = asyncPromiseError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// Updates the user's password.
export const updatePassword = asyncPromiseError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = user.comparePassword(req.body.oldPassword);

  // Returns an error if the old password is invalid.
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid old password.", 400));
  }

  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesnot match.", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  jwtCookie(user, 200, res);
});

// Updates a user's profile
export const updateProfile = asyncPromiseError(async (req, res, next) => {
  // TODO: Add avatar
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newUserData);
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

/**
 * Admin Routes
 */

// Get all users.
export const getAllUsers = asyncPromiseError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get a single user by id
export const getSingleUser = asyncPromiseError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Update Role of user
export const updateRoleUser = asyncPromiseError(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Role updated successfully",
  });
});

// Deletes a user.
export const deleteUser = asyncPromiseError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User doesnot exist", 404));
  }
  // TODO: Remove avatar
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
