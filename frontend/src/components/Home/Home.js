import React, { Fragment, useEffect } from "react";
import Hero from "../layout/Hero/Hero";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard.js";
import Metadata from "../layout/Metadata";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../state_management/product/productSlice";
import { removeConfirmOrderInfo } from "../../state_management/checkout/confirmOrderSlice";
import Loader from "../layout/Loader/Loader";
import ErrorView from "../layout/ErrorPage/ErrorView";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { emptyCart } from "../../state_management/cart/addToCartSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const redirectStatus = searchParams.get("redirect_status");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { loading, products, err } = useSelector((state) => state.productStore);

  useEffect(() => {
    if (redirectStatus === "succeeded") {
      setOpen(true);
      dispatch(emptyCart());
      dispatch(removeConfirmOrderInfo());
    }
    dispatch(fetchProducts({}));
  }, [dispatch, redirectStatus]);

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      {!loading && products ? (
        <>
          <Metadata title="ExOFusion" />
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
              iconMapping={{
                success: (
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 inline w-5 h-5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ),
              }}
            >
              <span className="font-bold">Order Placed Successfully!</span>{" "}
              Thank you for placing an order.{" "}
              <p>You can track status of your orders in Orders page.</p>
            </Alert>
          </Snackbar>
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
      {!loading && err ? <ErrorView /> : null}
    </Fragment>
  );
};

export default Home;
