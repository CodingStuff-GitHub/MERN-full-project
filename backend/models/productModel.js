import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a name of the product"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter a description of the product"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter a price of the product"],
    maxLength: [7, "Please Enter a maximum price of 7 figures"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true],
      },
      url: {
        type: String,
        required: [true],
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter a category of the product"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter a stock of the product"],
    maxLength: [4, "Please Enter a maximum stock of 4 numbers"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      review: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default new mongoose.model("Product", productSchema);
