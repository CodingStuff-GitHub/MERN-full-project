import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

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
export default mongoose.model("User", userSchema);
