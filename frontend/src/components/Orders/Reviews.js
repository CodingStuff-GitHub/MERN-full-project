import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../Home/ProductCard";
import { fetchSingleProduct } from "../../state_management/product/singleProductSlice";
import { Typography, Rating } from "@mui/material";

const Reviews = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [ratings, setRatings] = useState(0);
  const { product } = useSelector((state) => state.singleProductStore);
  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);
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
                    <Typography component="legend">Ratings : </Typography>
                    <Rating
                      name="simple-controlled"
                      value={ratings}
                      onChange={(_event, newRating) => {
                        setRatings(newRating || 0);
                      }}
                    />
                  </div>
                </div>
                <div className="w-full mt-6">
                  <div className="flex flex-col">
                    <label
                      className="text-sm font-semibold text-gray-800 mb-2"
                      htmlFor="message"
                    >
                      Comment
                    </label>
                    <textarea
                      placeholder
                      name="message"
                      className="border-gray-300 border mb-4 rounded py-2 text-sm outline-none resize-none px-3 focus:border focus:border-indigo-700"
                      rows={8}
                      id="message"
                      defaultValue={""}
                    />
                  </div>
                  <button
                    type="submit"
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
