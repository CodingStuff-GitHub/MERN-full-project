import mongoose from "mongoose";

// Creates a mongoose schema for products
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
    default: 0,
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
      },
      rating: {
        type: Number,
      },
      review: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Export default mongoose model for products
export default mongoose.model("Product", productSchema);
