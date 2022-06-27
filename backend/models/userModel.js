import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name."],
    maxlength: [30, "Please enter a name of at most 30 characters."],
    minlength: [4, "Please enter a name of at least 4 characters."],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [8, "Please enter a password of at least 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

/*Hashing of password
 *Using function keyword because cannot use 'this' in arrow function
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// Creates a signature for the JWT token.
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compares password
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
