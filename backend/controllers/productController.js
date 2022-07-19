import AsyncPromiseError from "../middleware/asyncPromiseError.js";
import Product from "../models/productModel.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import { ErrorHandler } from "../utils/errorHandler.js";

// Create a new product
export const createProduct = AsyncPromiseError(async (req, res) => {
  req.body.user = req.user.id;
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
  const resultsPerPage = 8;
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

// Create or Update a product review.
export const createProductReview = AsyncPromiseError(
  async (req, res, _next) => {
    const { rating, comment, productid } = req.body;
    const newReview = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productid);

    // Checks if the current user already has a review.
    const isReviewed = product.reviews.find((review) => {
      return review.user.toString() === newReview.user.toString();
    });

    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user.id.toString()) {
          review.rating = newReview.rating;
          review.comment = newReview.comment;
        }
      });
      product.rating = (
        (product.rating * (product.numOfReviews - 1) + newReview.rating) /
        product.numOfReviews
      ).toFixed(2);
    } else {
      product.reviews.push(newReview);
      product.numOfReviews += 1;
      product.rating = (
        (product.rating * (product.numOfReviews - 1) + rating) /
        product.numOfReviews
      ).toFixed(2);
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      product,
    });
  }
);

//Get all the reviews of a product
export const getAllReviews = AsyncPromiseError(async (req, res, next) => {
  const product = await Product.findOne(req.params.productId);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete a review
export const deleteReview = AsyncPromiseError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  let deletedReview = null;
  const reviews = product.reviews.filter((review) => {
    if (review._id.toString() !== req.query.reviewId.toString()) {
      console.log("First Run");
      return review;
    } else {
      console.log("Second Run");
      deletedReview = review;
    }
  });

  const rating =
    product.rating * product.numOfReviews -
    deletedReview.rating / (product.numOfReviews - 1);
  product.numOfReviews -= 1;

  await Product.findOneAndUpdate(
    req.query.id,
    { rating, reviews },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Review Deleted successfully",
  });
});
