import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAdminOrders } from "../../state_management/admin/adminOrders/adminOrdersSlice";
import Loader from "../layout/Loader/Loader";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { loading, orderInfo } = useSelector((state) => state.orderAdminStore);
  useEffect(() => {
    dispatch(fetchGetAdminOrders());
  }, [dispatch]);

  return (
    <>
      {loading ? <Loader /> : null}
      {!loading && orderInfo.orders ? (
        <div>
          {orderInfo.orders &&
            orderInfo.orders.map((order) => (
              <div key={order._id} className="w-full mt-8">
                <div className="flex flex-col justify-evenly lg:flex-row  w-full h-full p-6 text-left text-gray-600 bg-gray-50 border-gray-200 border-b">
                  <div className="text-base font-medium leading-4 ">
                    <p className="pb-1 text-gray-800">Order ID</p>
                    <p className="pb-1 text-gray-600">#{order._id}</p>
                  </div>
                  <div className="text-base font-medium leading-4 ">
                    <p className="pb-1 text-gray-800">Total</p>
                    <p className="pb-1 text-gray-600">₹{order.totalPrice}</p>
                  </div>
                  <div className="text-base font-medium leading-4 ">
                    <p className="pb-1 text-gray-800">Date of Order Placed</p>
                    <p className="pb-1 text-gray-600">
                      {new Date(order.paidAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div className="text-base font-medium leading-4 ">
                    <p className="pb-1 text-gray-800">Status</p>
                    <p className="pb-1 text-gray-600">
                      {order.orderStatus === "Processing" && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
                          {order.orderStatus}
                        </span>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                          {order.orderStatus}
                        </span>
                      )}
                      {order.orderStatus === "Delivered" && (
                        <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-1 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                          {order.orderStatus}
                        </span>
                      )}
                      {order.orderStatus === "Not Delivered" && (
                        <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                          {order.orderStatus}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="my-5 mx-8 text-left p-2">
                  {order.orderItems.map((singleItem, index) => (
                    <div
                      key={singleItem.name}
                      className="grid grid-cols-3 lg:grid-rows-3 justify-start md:flex-row border-gray-200 border-b"
                    >
                      <div className="text-base font-medium leading-4">
                        <span className="text-gray-800">
                          {index + 1}. {singleItem.name}
                        </span>
                      </div>
                      <div className="pl-6 text-base font-medium leading-4 text-gray-600">
                        <span>
                          ₹{singleItem.price} X {singleItem.quantity}= ₹
                          {singleItem.price * singleItem.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : null}
    </>
  );
};

export default AdminOrders;
