import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./product/productSlice";
import { singleProductReducer } from "./product/singleProductSlice";
import { userReducer } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    productStore: productReducer,
    singleProductStore: singleProductReducer,
    userStore: userReducer,
  },
});
