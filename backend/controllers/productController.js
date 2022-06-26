import AsyncPromiseError from "../middleware/asyncPromiseError.js";
import Product from "../models/productModel.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import { ErrorHandler } from "../utils/errorHandler.js";

// Create a new product
export const createProduct = AsyncPromiseError(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});
// Get single product by id.
export const getSingleProduct = AsyncPromiseError(async (req, res, next) => {
  const singleProduct = await Product.findById(req.params.id);
  if (!singleProduct) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    singleProduct,
  });
});

// Get all products
export const getAllProducts = AsyncPromiseError(async (req, res) => {
  const productCount = await Product.countDocuments();
  const resultsPerPage = 2;
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await apiFeatures.queryFunction;
  res.status(200).json({
    success: true,
    productCount,
    products,
  });
});

// Update a product
export const updateProduct = AsyncPromiseError(async (req, res, next) => {
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
});

// Delete/Remove a product.
export const deleteProduct = AsyncPromiseError(async (req, res, next) => {
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
});
