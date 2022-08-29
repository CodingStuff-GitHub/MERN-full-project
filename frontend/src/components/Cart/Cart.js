import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRemoveFromCart } from "../../state_management/cart/addToCartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productsInCart, grandTotal } = useSelector(
    (state) => state.cartStore
  );
  const removeItem = (id) => {
    dispatch(fetchRemoveFromCart({ id }));
  };
  return (
    <>
      <div
        className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
        id="chec-div"
      >
        <div
          className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
          id="checkout"
        >
          <div className="flex md:flex-row flex-col justify-end" id="cart">
            {/*Cart Items*/}
            <div
              className=" w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
              id="scroll"
            >
              {" "}
              <div
                className="flex items-center pb-2 text-gray-500 hover:text-gray-600 cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
                <p className="text-sm pl-2 leading-none">Back To Home</p>
              </div>
              <p className="text-5xl font-black leading-10  mb-14 text-gray-800 pt-3">
                Cart
              </p>
              {/* All Items in Cart */}
              {productsInCart.map((product) => (
                <div key={product._id}>
                  {" "}
                  <div className="md:flex items-center py-8 border-t border-gray-200">
                    <div className="w-1/4">
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-center object-cover aspect-square"
                      />
                    </div>
                    <div className="md:pl-3 md:w-3/4">
                      <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                        {product.category}
                      </p>
                      <div className="flex items-center justify-between w-full pt-1">
                        <p className="text-base font-black leading-none text-gray-800">
                          {product.name}
                        </p>
                        <p className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                          x{product.quantity}
                        </p>
                      </div>
                      <p className="text-xs leading-3 text-gray-600 pt-2">
                        Price per item : ₹{product.price}
                      </p>

                      <div className="flex items-center justify-between pt-5 pr-6">
                        <div className="flex itemms-center">
                          <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                            <button
                              onClick={() => {
                                removeItem(product._id);
                              }}
                            >
                              Remove
                            </button>
                          </p>
                        </div>
                        <p className="text-base font-black leading-none text-gray-800">
                          ₹{product.totalPriceThisProduct}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Cart Summary */}
            <div className="xl:w-1/2 md:w-1/3 w-full bg-gray-100 h-full">
              <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                <div>
                  <p className="text-4xl font-black leading-9 text-gray-800">
                    Summary
                  </p>
                  <div className="flex items-center justify-between pt-16">
                    <p className="text-base leading-none text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-none text-gray-800">
                      ₹{grandTotal}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base leading-none text-gray-800">FREE</p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800">
                      Delivary Charges
                    </p>
                    <p className="text-base leading-none text-gray-800">FREE</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                    <p className="text-2xl leading-normal text-gray-800">
                      Total
                    </p>
                    <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                      ₹{grandTotal}
                    </p>
                  </div>
                  <button className="text-base leading-none w-full py-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
