import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  orderInfo: {},
  err: "",
};

export const fetchGetAdminOrders = createAsyncThunk(
  "getAdminOrdersTypePrefix",
  async () => {
    const configuration = { headers: { "Content-Type": "application/json" } };

    return axios.get(`/api/v1/admin/orders`, configuration).then(
      (response) => response.data,
      (error) => {
        return error.response.data;
      }
    );
  }
);
const orderAdminSlice = createSlice({
  name: "orderAdminSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGetAdminOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetAdminOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orderInfo = action.payload;
    });
    builder.addCase(fetchGetAdminOrders.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    });
  },
});

export const orderAdminReducer = orderAdminSlice.reducer;
