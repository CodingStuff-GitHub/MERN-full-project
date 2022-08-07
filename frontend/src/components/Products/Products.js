import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Home/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../state_management/product/productSlice";
import Loader from "../layout/Loader/Loader";
import ErrorView from "../layout/ErrorPage/ErrorView";
import {
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Rating,
} from "@mui/material";
import Metadata from "../layout/Metadata";

const categoryList = ["Toy", "Men", "Shirt", "Pant", "Mobile", "Laptop"];
const Products = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [priceValue, setPriceValue] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const dispatch = useDispatch();

  const { loading, products, err, resultsPerPage, productsCount } = useSelector(
    (state) => state.productStore
  );

  useEffect(() => {
    const options = {
      currentPage: currentPage || 1,
      keyword: searchParams.get("keyword") || "",
      category: category || "",
      priceValue: priceValue || [0, 25000],
      rating: ratings || 0,
    };
    dispatch(fetchProducts(options));
  }, [dispatch, searchParams, currentPage, priceValue, category, ratings]);

  const numOfPages = Math.ceil(productsCount / resultsPerPage);
  const pageNumberDisplay = () => {
    let pageNumbers = [];
    for (let i = 0; i < numOfPages; i++) {
      if (i + 1 === currentPage) {
        pageNumbers.push(
          <p
            key={i}
            className="text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2"
          >
            {i + 1}
          </p>
        );
      } else {
        pageNumbers.push(
          <p
            key={i}
            onClick={() => {
              setCurrentPage(i + 1);
            }}
            className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2"
          >
            {i + 1}
          </p>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <>
      <Metadata title="All Products" />
      <div>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col lg:flex-row w-full items-start lg:items-start rounded bg-white">
            {/* Filters */}
            <div className="w-full lg:w-1/5 h-max dark:border-gray-700 lg:h-max border-t lg:border-t-0 lg:border-r lg:border-l lg:rounded-r dark:bg-gray-700 bg-gray-100">
              {/* Price Filter */}
              <div className="p-6">
                <Typography component="legend">Price : </Typography>
                <Slider
                  value={priceValue}
                  onChange={(_event, newPriceValue) => {
                    setPriceValue(newPriceValue);
                  }}
                  valueLabelDisplay="auto"
                  disableSwap
                  min={0}
                  max={25000}
                  step={1000}
                />
              </div>
              {/* Category Filter */}
              <div className="p-6">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={(event) => {
                      setCategory(event.target.value);
                    }}
                  >
                    {categoryList.map((singleCategory) => (
                      <MenuItem value={singleCategory}>
                        {singleCategory}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {/* Ratings Filter */}
              <div className="p-6">
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
            {/* ProductView */}
            {loading ? <Loader /> : null}
            {!loading && products.length > 0 ? (
              <div className="w-full lg:w-4/5 h-100 dark:bg-gray-800">
                <div className="bg-white">
                  <div className="max-w-2xl mx-auto py-12 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      {products &&
                        products.map((singleProduct, index) => (
                          <ProductCard key={index} product={singleProduct} />
                        ))}
                    </div>
                  </div>
                  {/* Pagination */}

                  {numOfPages > 1 && (
                    <>
                      <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
                        <div className="flex items-center justify-between border-t border-gray-200">
                          {pageNumberDisplay()}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : null}
            {!loading && products.length === 0 ? (
              <div
                class="flex p-4 my-4 mx-auto text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  class="inline flex-shrink-0 mr-3 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <div>
                  <span class="font-medium">No Products Found!</span> Try
                  checking your spelling or use less filters.
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {!loading && err ? <ErrorView /> : null}
    </>
  );
};

export default Products;
