import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../Home/ProductCard";
import { fetchSingleProduct } from "../../state_management/product/singleProductSlice";
import { Rating } from "@mui/material";
import {
  clearReviewStore,
  fetchCreateReview,
} from "../../state_management/review/reviewSlice";

const Reviews = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { product } = useSelector((state) => state.singleProductStore);
  const { review } = useSelector((state) => state.reviewStore);

  useEffect(() => {
    dispatch(clearReviewStore());
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  const handleSubmit = () => {
    const reviewData = {
      productid: productId,
      rating,
      comment,
    };
    dispatch(fetchCreateReview(reviewData)).then(() =>
      dispatch(fetchSingleProduct(productId))
    );
  };
  return (
    <>
      {product ? (
        <div className="container mx-auto pt-16">
          <div className="lg:flex">
            <div className="xl:w-2/5 lg:w-2/5 bg-blue-200 py-16 xl:rounded-bl rounded-tl rounded-tr xl:rounded-tr-none">
              <div className="xl:w-5/6 xl:px-0 px-8 mx-auto">
                <div className="flex pb-4 items-center justify-center">
                  <ProductCard product={product} />
                </div>
              </div>
            </div>
            <div className="xl:w-3/5 lg:w-3/5 bg-white h-full pt-5 pb-5 xl:pr-5 xl:pl-0 rounded-tr rounded-br">
              <div id="contact" className=" py-4 px-8 rounded-tr rounded-br">
                <h1 className="text-4xl text-gray-800 font-extrabold mb-6">
                  Enter Your Review
                </h1>
                <div className="flex w-full flex-wrap">
                  <div className="w-2/4 max-w-xs">
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Ratings
                    </p>
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      defaultValue={5}
                      onChange={(_event, newRating) => {
                        setRating(newRating || 1);
                      }}
                    />
                  </div>
                </div>
                <div className="w-full mt-6">
                  <div className="flex flex-col">
                    <div
                      className="text-sm font-semibold text-gray-800 mb-2"
                      htmlFor="message"
                    >
                      Comment
                    </div>
                    <textarea
                      name="message"
                      className="border-gray-300 border mb-4 rounded py-2 text-sm outline-none resize-none px-3 focus:border focus:border-indigo-700"
                      rows={8}
                      id="message"
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      defaultValue={""}
                    />
                  </div>
                  {review.message ? (
                    <div
                      className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                      role="alert"
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 inline w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="font-medium">Ratings submitted</span>{" "}
                      Thank you for giving your review. {review.message}
                    </div>
                  ) : null}

                  <button
                    onClick={handleSubmit}
                    className="focus:outline-none bg-blue-700 transition duration-150 ease-in-out hover:bg-blue-600 rounded text-white px-8 py-3 text-sm leading-6"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Reviews;
