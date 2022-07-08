import React, { Fragment } from "react";
import Hero from "../layout/Hero/Hero";
import ProductCard from "./ProductCard.js";
import Metadata from "../layout/Metadata";

const product = {
  _id: "Product",
  name: "Blue Mobile",
  images: [
    {
      url: "https://sathya.in/media/47667/catalog/xiaomi-mobile-redmi-9i-sea-blue4gb-ram64gb-storage.jpg",
    },
  ],
  price: "3000",
  num_of_reviews: 253,
  num_of_stars: 4.75,
};

const Home = () => {
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
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
