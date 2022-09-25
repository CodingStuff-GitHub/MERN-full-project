import React, { useEffect, useRef, useState } from "react";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminSummary from "./AdminSummary";
import AdminUsers from "./AdminUsers";

const Dashboard = () => {
  const [summaryOption, setSummaryOption] = useState(false);
  const [usersOption, setUsersOption] = useState(false);
  const [productsOption, setProductsOption] = useState(false);
  const [ordersOption, setOrdersOption] = useState(false);
  useEffect(() => {
    // Default
  }, []);

  return (
    <>
      <div className="w-full bg-gray-200">
        <div className="flex flex-col lg:flex-row flex-no-wrap">
          {/* Sidebar starts */}
          <div className="flex flex-row w-full lg:justify-start justify-evenly lg:flex-col lg:relative lg:w-64 lg:h-screen shadow bg-gray-100 py-6">
            <div
              onClick={() => {
                setSummaryOption(true);
                setUsersOption(false);
                setProductsOption(false);
                setOrdersOption(false);
              }}
              className={`pl-6 cursor-pointer text-sm leading-3 tracking-normal pb-4 pt-5  ${
                summaryOption
                  ? "bg-blue-500 text-white hover:text-white"
                  : "text-gray-600 hover:text-indigo-700"
              } `}
            >
              <span className="ml-2">Summary</span>
            </div>{" "}
            <div
              onClick={() => {
                setSummaryOption(false);
                setUsersOption(true);
                setProductsOption(false);
                setOrdersOption(false);
              }}
              className={`pl-6 cursor-pointer text-sm leading-3 tracking-normal pb-4 pt-5  ${
                usersOption
                  ? "bg-blue-500 text-white hover:text-white"
                  : "text-gray-600 hover:text-indigo-700"
              } `}
            >
              <span className="ml-2">All Users</span>
            </div>
            <div
              onClick={() => {
                setSummaryOption(false);
                setProductsOption(true);
                setUsersOption(false);
                setOrdersOption(false);
              }}
              className={`pl-6 cursor-pointer text-sm leading-3 tracking-normal pb-4 pt-5  ${
                productsOption
                  ? "bg-blue-500 text-white hover:text-white"
                  : "text-gray-600 hover:text-indigo-700"
              } `}
            >
              <span className="ml-2">All Products</span>
            </div>
            <div
              onClick={() => {
                setSummaryOption(false);
                setOrdersOption(true);
                setUsersOption(false);
                setProductsOption(false);
              }}
              className={`pl-6 cursor-pointer text-sm leading-3 tracking-normal pb-4 pt-5  ${
                ordersOption
                  ? "bg-blue-500 text-white hover:text-white"
                  : "text-gray-600 hover:text-indigo-700"
              } `}
            >
              <span className="ml-2">All Orders</span>
            </div>
          </div>
          {/* Sidebar ends */}
          <div className="w-full">
            <div className="container mx-auto md:w-4/5 w-11/12 px-6">
              {summaryOption ? <AdminSummary /> : null}
              {usersOption ? <AdminUsers /> : null}
              {productsOption ? <AdminProducts /> : null}
              {ordersOption ? <AdminOrders /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
