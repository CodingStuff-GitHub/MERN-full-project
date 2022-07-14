import React, { Fragment, useEffect } from "react";
import Hero from "../layout/Hero/Hero";
import ProductCard from "./ProductCard.js";
import Metadata from "../layout/Metadata";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../state_management/product/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.productStore);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Fragment>
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
            {!loading &&
              products.map((singleProduct, index) => (
                <ProductCard key={index} product={singleProduct} />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
