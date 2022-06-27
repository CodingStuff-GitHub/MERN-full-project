import asyncPromiseError from "../middleware/asyncPromiseError.js";
import User from "../models/userModel.js";

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
