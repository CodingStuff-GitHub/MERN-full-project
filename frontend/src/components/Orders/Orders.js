import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetOrders } from "../../state_management/order/orderSlice";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const { loading, orderInfo } = useSelector((state) => state.orderStore);
  useEffect(() => {
    dispatch(fetchGetOrders());
  }, [dispatch]);

  return (
    <>
      {loading ? <Loader /> : null}
      {!loading && orderInfo.orders ? (
        <div className="px-4 py-12">
          {/* Desktop Responsive Start */}
          <div className="flex flex-col justify-start items-start">
            <div className="pl-4 lg:px-10 2xl:px-20 flex flex-row justify-center items-end space-x-4">
              <h1 className="text-4xl font-semibold leading-9 text-gray-800">
                Orders
              </h1>
              <p className="text-base leading-4 text-gray-600 pb-1">
                ({orderInfo.orders.length} orders)
              </p>
            </div>
            {orderInfo.orders &&
              orderInfo.orders.map((order) => (
                <>
                  <div className="w-full mt-8">
                    <div className="flex flex-col md:flex-row w-full h-full text-left py-6 bg-gray-50 border-gray-200 border-b">
                      <div className="text-base font-medium leading-4 text-gray-600 pl-6 md:pl-0 2xl:pl-20 lg:pl-10 pt-6">
                        <p className="pb-1 text-gray-800">Order ID</p>
                        <p className="pb-1 text-gray-600">#{order._id}</p>
                      </div>
                      <div className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52 pt-6">
                        <p className="pb-1 text-gray-800">Total</p>
                        <p className="pb-1 text-gray-600">
                          ₹{order.totalPrice}
                        </p>
                      </div>
                      <div className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52 pt-6">
                        <p className="pb-1 text-gray-800">
                          Date of Order Placed
                        </p>
                        <p className="pb-1 text-gray-600">
                          {new Date(order.paidAt).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                      <div className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52 pt-6">
                        <p className="pb-1 text-gray-800">Status</p>
                        <p className="pb-1 text-gray-600">
                          {order.orderStatus === "Processing" && (
                            <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
                              {order.orderStatus}
                            </span>
                          )}
                          {order.orderStatus === "Shipped" && (
                            <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                              {order.orderStatus}
                            </span>
                          )}
                          {order.orderStatus === "Delivered" && (
                            <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-1 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                              {order.orderStatus}
                            </span>
                          )}
                          {order.orderStatus === "Not Delivered" && (
                            <span class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                              {order.orderStatus}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="text-base font-medium leading-4 text-gray-600 pl-6 2xl:pl-28 2xl:pr-20 pr-4 lg:pr-10"></div>
                    </div>
                    <div className="w-full text-left">
                      {order.orderItems.map((singleItem) => (
                        <div className="flex flex-col md:flex-row border-gray-200 border-b">
                          <div className="my-5 text-base font-medium leading-4 text-gray-600 2xl:pl-20 pl-4 lg:pl-10">
                            <img
                              className="leading-4 aspect-square h-48 w-48"
                              src={singleItem.image}
                              alt={singleItem.name}
                            />
                          </div>
                          <div className="my-5 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                            <span className=" text-base leading-4 text-gray-800">
                              {singleItem.name}
                            </span>
                          </div>
                          <div className="my-5  pl-6 lg:pl-20 2xl:pl-52">
                            <p>
                              ₹{singleItem.price} X {singleItem.quantity}
                            </p>
                            <p> = ₹{singleItem.price * singleItem.quantity}</p>
                          </div>
                          <div className="my-5 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                            <button
                              type="button"
                              class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            >
                              <Link
                                target="_blank"
                                to={`/product/${singleItem.product}`}
                              >
                                View details
                              </Link>{" "}
                            </button>
                            <button
                              type="button"
                              class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            >
                              <Link
                                target="_blank"
                                to={`/product/${singleItem.product}`}
                              >
                                Write a Review
                              </Link>{" "}
                            </button>
                          </div>
                          <div className="my-5 pl-4 lg:pl-12  2xl:pl-28 pr-4 2xl:pr-20"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ))}
          </div>
          {/* Desktop Responsive End */}
        </div>
      ) : null}
    </>
  );
};

export default Orders;
