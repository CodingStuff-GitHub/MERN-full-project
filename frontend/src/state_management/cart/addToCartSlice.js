import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const grandTotalCalculator = () => {
  let grandTotal = 0;
  if (JSON.parse(localStorage.getItem("productsInCart"))) {
    JSON.parse(localStorage.getItem("productsInCart")).map(
      (product) => (grandTotal += product.totalPriceThisProduct)
    );
  }
  return grandTotal;
};
const initialState = {
  loading: false,
  grandTotal: grandTotalCalculator(),
  numberOfItemsinCart: JSON.parse(localStorage.getItem("productsInCart"))
    ? JSON.parse(localStorage.getItem("productsInCart")).length
    : 0,
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
    productData.singleProduct.totalPriceThisProduct =
      productData.singleProduct.price * quantity;
    return productData;
  }
);
export const fetchRemoveFromCart = createAsyncThunk(
  "removeFromCartTypePrefix",
  async ({ id }) => {
    return axios.get(`/api/v1/product/${id}`).then((response) => response.data);
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
      state.productsInCart.map((product, index) => {
        if (product._id === action.payload.singleProduct._id) {
          state.productsInCart.splice(index, 1);
          state.numberOfItemsinCart -= 1;
        }
        return product;
      });
      state.numberOfItemsinCart += 1;
      state.productsInCart.push(action.payload.singleProduct);
      localStorage.setItem(
        "productsInCart",
        JSON.stringify(state.productsInCart)
      );
      state.grandTotal = grandTotalCalculator();
    });
    builder.addCase(fetchAddToCart.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    });

    builder.addCase(fetchRemoveFromCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRemoveFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.productsInCart.map((product, index) => {
        if (product._id === action.payload.singleProduct._id) {
          state.productsInCart.splice(index, 1);
          state.numberOfItemsinCart -= 1;
        }
        return product;
      });
      localStorage.setItem(
        "productsInCart",
        JSON.stringify(state.productsInCart)
      );
      state.grandTotal = grandTotalCalculator();
    });
    builder.addCase(fetchRemoveFromCart.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    });
  },
});

export const addToCartReducer = addToCartSlice.reducer;
