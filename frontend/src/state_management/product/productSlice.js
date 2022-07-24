import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  products: [],
  err: "",
};

export const fetchProducts = createAsyncThunk(
  "productsTypePrefix",
  async (options) => {
    let url = `/api/v1/products?
    keyword=${options.keyword}
    &page=${options.currentPage}
    &price[gte]=${options.priceValue[0]}&price[lte]=${options.priceValue[1]}`;
    return axios.get(url).then((response) => response.data);
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
      state.productsCount = action.payload.productsCount;
      state.resultsPerPage = action.payload.resultsPerPage;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    });
  },
});

export const productReducer = productSlice.reducer;
