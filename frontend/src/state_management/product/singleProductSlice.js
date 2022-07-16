import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  product: null,
  err: "",
};

export const fetchSingleProduct = createAsyncThunk(
  "singleProductTypePrefix",
  async (id) => {
    return axios.get(`/api/v1/product/${id}`).then((response) => response.data);
  }
);

const singleProductSlice = createSlice({
  name: "singleProductSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.singleProduct;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    });
  },
});

export const singleProductReducer = singleProductSlice.reducer;
