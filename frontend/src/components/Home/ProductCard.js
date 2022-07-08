import React from "react";
import Stars from "../layout/Stars/Stars";

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img
          className="p-8 rounded-t-lg w-full h-full object-center object-cover hover:opacity-75"
          src={product.images[0].url}
          alt={product.name}
          width={50}
          height={50}
        />
      </div>
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
        <Stars
          num_of_stars={product.num_of_stars.toFixed(2)}
          num_of_reviews={product.num_of_reviews}
        />
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ₹{product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
