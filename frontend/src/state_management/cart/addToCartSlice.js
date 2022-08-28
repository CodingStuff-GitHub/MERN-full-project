import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  productsInCart: JSON.parse(localStorage.getItem("productsInCart")) || [],
  err: "",
};

export const fetchAddToCart = createAsyncThunk(
  "addToCartTypePrefix",
  async ({ id, quantity }) => {
    const productData = await axios
      .get(`/api/v1/product/${id}`)
      .then((response) => response.data);
    productData.singleProduct.quantity = quantity;
    return productData;
  }
);

const addToCartSlice = createSlice({
  name: "addToCartSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAddToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.productsInCart.push(action.payload.singleProduct);
      localStorage.setItem(
        "productsInCart",
        JSON.stringify(state.productsInCart)
      );
    });
    builder.addCase(fetchAddToCart.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    });
  },
});

export const addToCartReducer = addToCartSlice.reducer;
