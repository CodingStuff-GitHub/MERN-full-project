import React, { Fragment } from "react";
import Hero from "../layout/Hero/Hero";
import ProductCard from "./ProductCard";

const product = {
  _id: "Product",
  name: "Blue Mobile",
  images: [{ url: "https://jdkasjdl.com" }],
  price: "3000",
};

const Home = () => {
  return (
    <Fragment>
      <Hero />
      {/* Heading */}
      <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8">
        <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white text-center">
          Featured Products
        </h1>
      </div>
      {/* Featired Products */}
      <div>
        <ProductCard product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
