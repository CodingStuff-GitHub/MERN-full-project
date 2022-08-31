import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
  err: "",
};

const shippingInfoSlice = createSlice({
  name: "shippingInfoSlice",
  initialState,
  reducers: {
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem(
        "shippingDetails",
        JSON.stringify(state.shippingInfo)
      );
    },
  },
});
export const shippingInfoReducer = shippingInfoSlice.reducer;
export const { saveShippingInfo } = shippingInfoSlice.actions;
