import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  products: [],
  err: "",
};

export const fetchProducts = createAsyncThunk(
  "productsTypePrefix",
  async () => {
    return axios.get("/api/v1/products").then((response) => response.data);
  }
);

const productSlice = createSlice({
  name: "productsNamedSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    });
  },
});

export const productReducer = productSlice.reducer;
