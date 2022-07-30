import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  products: [],
  err: "",
};

export const fetchProducts = createAsyncThunk(
  "productsTypePrefix",
  async ({ category, keyword, currentPage, priceValue, rating }) => {
    const options = {
      category: category || "",
      keyword: keyword || "",
      currentPage: currentPage || 1,
      priceValue: priceValue || [0, 25000],
      rating: rating || 0,
    };
    let url = "";
    if (options.category !== "") {
      url = `/api/v1/products?keyword=${options.keyword}&price[gte]=${options.priceValue[0]}&price[lte]=${options.priceValue[1]}&category=${options.category}&rating[gte]=${options.rating}&page=${options.currentPage}`;
    } else {
      url = `/api/v1/products?keyword=${options.keyword}&price[gte]=${options.priceValue[0]}&price[lte]=${options.priceValue[1]}&rating[gte]=${options.rating}&page=${options.currentPage}`;
    }
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
