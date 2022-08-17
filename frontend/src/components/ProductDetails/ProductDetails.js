import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../state_management/product/singleProductSlice";
import Loader from "../layout/Loader/Loader";
import ErrorView from "../layout/ErrorPage/ErrorView";
import Stars from "../layout/Stars/Stars";
import ReviewCard from "./ReviewCard";
import Metadata from "../layout/Metadata";
import Carousel from "./Carousel";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, err } = useSelector(
    (state) => state.singleProductStore
  );
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  const productStockView =
    product && product.stock > 0 ? (
      <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
        In Stock
      </span>
    ) : (
      <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
        Out of Stock
      </span>
    );
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      {!loading && err ? <ErrorView /> : null}
      {!loading && product ? (
        <>
          <Metadata title={product.name} />
          {/* Product Details*/}
          <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
            {/* Images (Full Left)*/}
            <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
              <Carousel product={product} />
            </div>
            <div className="md:hidden">
              <Carousel product={product} />
            </div>

            {/* Description (Full Right) */}
            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
              <div className="border-b border-gray-200 pb-6">
                <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">
                  {product.category}
                </p>
                <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
                  {product.name}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:mt-0 lg:row-span-3">
                <p className=" mt-2 text-3xl text-gray-900">₹{product.price}</p>

                {/* Reviews */}
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <Stars
                        num_of_stars={product.rating.toFixed(2)}
                        num_of_reviews={product.numOfReviews}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>{productStockView}</div>

              {/* Qunatity Picker */}
              <div className="flex mt-4 mb-4">
                <div>
                  <label
                    htmlFor="default-input"
                    className="block text-sm font-medium text-gray-900 dark:text-gray-300"
                  ></label>
                  <input
                    type="Number"
                    id="default-input"
                    placeholder={1}
                    min={1}
                    max={5}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                {/* Add to Cart button */}
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
                    font-medium rounded-lg text-sm mx-2 px-5"
                >
                  Add to Cart
                </button>
              </div>

              <div>
                <h1>About this Product</h1>
                <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-1">
                  {product.description}
                </p>
              </div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
                    font-medium rounded-lg text-sm my-5 p-3"
              >
                Submit a Review
              </button>
            </div>
          </div>

          {/* Review Details*/}
          <div>
            <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
              <div className="flex flex-col justify-start items-start w-full space-y-8">
                {/* Review Main Heading */}
                <div className="flex justify-start items-start mx-10">
                  <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                    Reviews
                  </p>
                </div>
                {/* Review Cards */}
                {product.reviews &&
                  product.reviews.map((singleReview, index) => (
                    <ReviewCard key={index} review={singleReview} />
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </Fragment>
  );
};

export default ProductDetails;
