import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./product/productSlice";
import { singleProductReducer } from "./product/singleProductSlice";

export const store = configureStore({
  reducer: {
    productStore: productReducer,
    singleProductStore: singleProductReducer,
  },
});
