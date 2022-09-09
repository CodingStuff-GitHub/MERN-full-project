import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orderInfo: JSON.parse(localStorage.getItem("orderDetails")) || {},
  err: "",
};

const confirmOrderSlice = createSlice({
  name: "confirmOrderSlice",
  initialState,
  reducers: {
    saveConfirmOrderInfo: (state, action) => {
      state.orderInfo = action.payload;
      sessionStorage.setItem("orderDetails", JSON.stringify(state.orderInfo));
    },
    removeConfirmOrderInfo: (state) => {
      sessionStorage.removeItem("orderDetails");
    },
  },
});
export const confirmOrderReducer = confirmOrderSlice.reducer;
export const { removeConfirmOrderInfo, saveConfirmOrderInfo } =
  confirmOrderSlice.actions;
