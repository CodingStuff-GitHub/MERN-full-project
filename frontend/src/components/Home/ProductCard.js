import React from "react";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <>
      <Link>
        <div>{product.name}</div>
      </Link>
    </>
  );
};

export default ProductCard;
