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
                  <table className="w-full mt-16 whitespace-nowrap">
                    <thead
                      aria-label="table heading"
                      className="w-full h-16 text-left py-6 bg-gray-50 border-gray-200 border-b "
                    >
                      <tr>
                        <th className="text-base font-medium leading-4 text-gray-600 2xl:pl-20 pl-4 lg:pl-10">
                          <p className="pb-1 text-gray-800">Order ID</p>
                          <p className="pb-1 text-gray-600">#{order._id}</p>
                        </th>
                        <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                          <p className="pb-1 text-gray-800">Total</p>
                          <p className="pb-1 text-gray-600">
                            ₹{order.totalPrice}
                          </p>
                        </th>
                        <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                          <p className="pb-1 text-gray-800">
                            Date of Order Placed
                          </p>
                          <p className="pb-1 text-gray-600">23/22/1992</p>
                        </th>
                        <th className="text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                          <p className="pb-1 text-gray-800">Status</p>
                          <p className="pb-1 text-gray-600">
                            <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-1 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                              Processing
                            </span>
                          </p>
                        </th>
                        <th className="text-base font-medium leading-4 text-gray-600 pl-6 2xl:pl-28 2xl:pr-20 pr-4 lg:pr-10"></th>
                      </tr>
                    </thead>
                    <tbody className="w-full text-left">
                      {order.orderItems.map((singleItem) => (
                        <tr className="border-gray-200 border-b">
                          <th className="mt-5 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                            <img
                              className="my-5 leading-4 aspect-square"
                              src={singleItem.image}
                              alt={singleItem.name}
                            />
                          </th>
                          <th className="mt-5 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                            <span className=" text-base leading-4 text-gray-800">
                              {singleItem.name}
                            </span>{" "}
                            -{" "}
                            <span className="leading-4 text-black text-xl">
                              {singleItem.quantity}
                            </span>
                          </th>
                          <th className="my-5  pl-6 lg:pl-20 2xl:pl-52">
                            <p className>₹{singleItem.price}</p>
                          </th>
                          <th className="my-5 text-base font-medium leading-4 text-gray-600 pl-6 lg:pl-20 2xl:pl-52">
                            <Link
                              target="_blank"
                              to={`/product/${singleItem.product}`}
                            >
                              View details
                            </Link>{" "}
                          </th>
                          <th className="my-5 pl-4 lg:pl-12  2xl:pl-28 pr-4 2xl:pr-20"></th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
