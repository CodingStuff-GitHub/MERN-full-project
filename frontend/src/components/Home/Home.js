import React, { Fragment, useEffect } from "react";
import Hero from "../layout/Hero/Hero";
import ProductCard from "./ProductCard.js";
import Metadata from "../layout/Metadata";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../state_management/product/productSlice";
import Loader from "../layout/Loader/Loader";
import ErrorView from "../layout/ErrorPage/ErrorView";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, err } = useSelector((state) => state.productStore);

  useEffect(() => {
    const options = {
      currentPage: 1,
      keyword: "",
      priceValue: [0, 25000],
    };
    dispatch(fetchProducts(options));
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      {!loading && err ? <ErrorView /> : null}
      {!loading && products ? (
        <>
          <Metadata title="ExOFusion" />
          <Hero />
          {/* Heading */}
          <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white text-center">
              Featured Products
            </h1>
          </div>
          {/* Featired Products */}
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
        </>
      ) : null}
    </Fragment>
  );
};

export default Home;
