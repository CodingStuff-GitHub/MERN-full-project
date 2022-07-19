import React, { useEffect } from "react";
import ProductCard from "../Home/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../state_management/product/productSlice";
import Loader from "../layout/Loader/Loader";
import ErrorView from "../layout/ErrorPage/ErrorView";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, products, err } = useSelector((state) => state.productStore);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? <Loader /> : null}
      {!loading && err ? <ErrorView /> : null}
      {!loading && products ? (
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
      ) : null}
      ;
    </>
  );
};

export default Products;
