import Product from "../models/productModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";

// Create a new product
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
};

// Get all products
export const getAllProducts = async (_req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

// Update a product
export const updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  // Returns 404 if product is not found
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  // Finds a product and updates it.
  product = await Product.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Returns 200 if product is updated
  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
};

// Delete/Remove a product.
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  // Returns 404 if product is not found
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  await product.delete();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

// Get single product by id.
export const getSingleProduct = async (req, res, next) => {
  const singleProduct = await Product.findById(req.params.id);
  if (!singleProduct) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    singleProduct,
  });
};
