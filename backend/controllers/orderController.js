import Order from "../models/orderModel.js";
import asyncPromiseError from "../middleware/asyncPromiseError.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import Product from "../models/productModel.js";

//Create a new order
export const createOrder = asyncPromiseError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
    paidAt: Date.now(),
  });
  res.status(201).json({
    success: true,
    order,
  });
});
