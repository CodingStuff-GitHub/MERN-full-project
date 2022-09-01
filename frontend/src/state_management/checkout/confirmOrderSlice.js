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
      console.log(action.payload);
      state.orderInfo = action.payload;
      sessionStorage.setItem("orderDetails", JSON.stringify(state.orderInfo));
    },
  },
});
export const confirmOrderReducer = confirmOrderSlice.reducer;
export const { saveConfirmOrderInfo } = confirmOrderSlice.actions;
