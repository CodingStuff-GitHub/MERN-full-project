import { configureStore } from "@reduxjs/toolkit";
import { productReducers } from "./product/productSlice";

export const store = configureStore({
  reducer: {
    productStore: productReducers,
  },
});
