import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Home/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../state_management/product/productSlice";
import Loader from "../layout/Loader/Loader";
import ErrorView from "../layout/ErrorPage/ErrorView";

const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const { loading, products, err } = useSelector((state) => state.productStore);
  useEffect(() => {
    dispatch(fetchProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {loading ? <Loader /> : null}
      {!loading && err ? <ErrorView /> : null}
      {!loading && products.length > 0 ? (
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-12 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products &&
                products.map((singleProduct, index) => (
                  <ProductCard key={index} product={singleProduct} />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          class="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
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
            <span class="font-medium">No Products Found!</span> Change a few
            terms up and try searching again.
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
