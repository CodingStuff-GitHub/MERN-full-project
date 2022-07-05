import Order from "../models/orderModel.js";
import asyncPromiseError from "../middleware/asyncPromiseError.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { updateStock } from "../utils/updateStock.js";

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
  const order = await Order.create({
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

// Get a single order
export const getSingleOrder = asyncPromiseError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order Not Found"), 404);
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// Gets all orders of logged in user
export const getLoggedUserOrders = asyncPromiseError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});

/*
 * Admin Routes
 */
// Get all orders.
export const getAllOrders = asyncPromiseError(async (req, res, next) => {
  const orders = await Order.find();
  let amount = 0;
  orders.forEach((order) => {
    amount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    amount,
    orders,
  });
});

//Update Order Status
export const updateOrder = asyncPromiseError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("This Order is already delivered.", 400));
  }
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.orderStatus;
  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Order status has been updated successfully",
    order,
  });
});
