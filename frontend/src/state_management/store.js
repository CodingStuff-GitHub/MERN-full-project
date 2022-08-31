import { configureStore } from "@reduxjs/toolkit";
import { addToCartReducer } from "./cart/addToCartSlice";
import { shippingInfoReducer } from "./checkout/shippingSlice";
import { productReducer } from "./product/productSlice";
import { singleProductReducer } from "./product/singleProductSlice";
import { updateReducer } from "./user/updateSlice";
import { userReducer } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    productStore: productReducer,
    singleProductStore: singleProductReducer,
    userStore: userReducer,
    updateStore: updateReducer,
    cartStore: addToCartReducer,
    shippingInfoStore: shippingInfoReducer,
  },
});
