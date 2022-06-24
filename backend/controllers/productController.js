import Product from "../models/productModel.js";

// Get all products for the current route
export const getAllProducts = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Route is working successfully",
  });
};

// Create a new product
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};
