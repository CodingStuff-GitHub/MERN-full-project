import { configureStore } from "@reduxjs/toolkit";
import { orderAdminReducer } from "./admin/adminOrders/adminOrdersSlice";
import { addToCartReducer } from "./cart/addToCartSlice";
import { confirmOrderReducer } from "./checkout/confirmOrderSlice";
import { shippingInfoReducer } from "./checkout/shippingSlice";
import { orderReducer } from "./order/orderSlice";
import { productReducer } from "./product/productSlice";
import { singleProductReducer } from "./product/singleProductSlice";
import { reviewReducer } from "./review/reviewSlice";
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
    confirmOrderInfoStore: confirmOrderReducer,
    orderStore: orderReducer,
    reviewStore: reviewReducer,
    orderAdminStore: orderAdminReducer,
  },
});
