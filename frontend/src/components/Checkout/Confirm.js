import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveConfirmOrderInfo } from "../../state_management/checkout/confirmOrderSlice";

const Confirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { numberOfItemsinCart, productsInCart, grandTotal } = useSelector(
    (state) => state.cartStore
  );
  const { shippingInfo } = useSelector((state) => state.shippingInfoStore);
  const delivaryAddress =
    shippingInfo.address +
    ", " +
    shippingInfo.stateName +
    ", " +
    shippingInfo.countryName +
    " - " +
    shippingInfo.pincode;
  const googleMapUrl = `https://www.google.com/maps?q=${delivaryAddress}&output=embed`;
  const saveOrderDetails = () => {
    dispatch(saveConfirmOrderInfo({ grandTotal }));
  };
  return (
    <>
      <div className="2xl:container 2xl:mx-auto py-14 px-4 md:px-6 xl:px-20">
        <div className="flex flex-col justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8">
          <div className="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full ">
            <h3 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 w-full  md:text-left text-gray-800">
              Order Summary
            </h3>
            <p className="text-base leading-none mt-4 text-gray-800">
              Number of Items :{" "}
              <span className="font-semibold">{numberOfItemsinCart}</span>
            </p>
            {/* Items Summary Div */}
            <div className="flex justify-center items-center w-full mt-8  flex-col space-y-4 ">
              {productsInCart.map((product) => (
                <div className="flex md:flex-row justify-start items-start md:items-center  border border-gray-200 w-full">
                  <div className="w-40 md:w-32">
                    <img
                      className="block w-full h-full object-center object-cover aspect-square"
                      src={product.images[0].url}
                      alt={product.name}
                    />
                  </div>
                  <div className="flex justify-start md:justify-between items-start md:items-center  flex-col md:flex-row w-full p-4 md:px-8">
                    <div className="flex flex-col md:flex-shrink-0  justify-start items-start">
                      <h3 className="text-lg md:text-xl  w-full font-semibold leading-6 md:leading-5  text-gray-800">
                        {product.name}
                      </h3>
                      <div className="flex flex-row justify-start  space-x-4 md:space-x-6 items-start mt-4 ">
                        <p className="text-sm leading-none text-gray-600">
                          Category:{" "}
                          <span className="text-gray-800">
                            {" "}
                            {product.category}
                          </span>
                        </p>
                        <p className="text-sm leading-none text-gray-600">
                          Quantity:{" "}
                          <span className="text-gray-800">
                            {" "}
                            {product.quantity}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-4 md:mt-0 md:justify-end items-center w-full ">
                      <p className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Billing Summary Div */}
            <div className="flex flex-col-reverse justify-center w-full xl:flex-row">
              <div className="px-5 basis-1/2 flex flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full">
                <div className="flex justify-start items-start flex-col md:flex-row  w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8  lg:w-full">
                  <div className="flex jusitfy-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4  text-gray-800">
                      Ordered by:
                    </p>
                    <p className="text-sm leading-5 text-gray-600">
                      {shippingInfo.firstName +
                        " " +
                        shippingInfo.lastName +
                        " - " +
                        shippingInfo.phoneNumber}
                    </p>
                  </div>
                  <div className="flex jusitfy-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4  text-gray-800">
                      Shipping Address
                    </p>
                    <p className="text-sm leading-5 text-gray-600">
                      {delivaryAddress}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-4 w-full">
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between  w-full">
                      <p className="text-base leading-4 text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base leading-4 text-gray-600">
                        ₹{grandTotal}
                      </p>
                    </div>
                    <div className="flex justify-between  w-full">
                      <p className="text-base leading-4 text-gray-800">
                        Discount{" "}
                      </p>
                      <p className="text-base leading-4 text-gray-600">0</p>
                    </div>
                    <div className="flex justify-between  w-full">
                      <p className="text-base leading-4 text-gray-800">
                        Shipping
                      </p>
                      <p className="text-base leading-4 text-gray-600">FREE</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base font-semibold leading-4 text-gray-800">
                      Total
                    </p>
                    <p className="text-base font-semibold leading-4 text-gray-600">
                      ₹{grandTotal}
                    </p>
                  </div>
                  <div className="flex w-full justify-center items-center pt-1 md:pt-4  xl:pt-8 space-y-6 md:space-y-8 flex-col">
                    <button
                      onClick={() => {
                        saveOrderDetails();
                        navigate("/checkout/payment");
                      }}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 py-5 focus:outline-none focus:ring-offset-2  w-full text-base font-medium leading-4"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-10 basis-1/2 mt-8 xl:mt-10">
                <iframe
                  title="Contact"
                  src={googleMapUrl}
                  width="100%"
                  height="100%"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm;
