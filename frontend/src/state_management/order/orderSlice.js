import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getData = (paymentIntent) => {
  const shippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));
  const productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
  const grandTotal = JSON.parse(
    sessionStorage.getItem("orderDetails")
  ).grandTotal;

  const data = {
    shippingInfo: {
      address: shippingDetails.address,
      state: shippingDetails.stateName,
      country: shippingDetails.countryName,
      pincode: shippingDetails.pincode,
      phoneNo: shippingDetails.phoneNumber,
    },
    orderItems: productsInCart.map((product) => {
      return {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.images[0].url,
        product: product._id,
      };
    }),
    paymentInfo: {
      id: paymentIntent.id,
      status: paymentIntent.status,
    },
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: grandTotal,
  };

  return data;
};

const initialState = {
  loading: false,
  orderInfo: [],
  err: "",
};

export const fetchCreateOrder = createAsyncThunk(
  "createOrderTypePrefix",
  async ({ paymentIntent }) => {
    const configuration = { headers: { "Content-Type": "application/json" } };

    return axios
      .post(`/api/v1/order/new`, getData(paymentIntent), configuration)
      .then(
        (response) => response.data,
        (error) => {
          return error.response.data;
        }
      );
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCreateOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orderInfo = action.payload;
    });
    builder.addCase(fetchCreateOrder.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    });
  },
});

export const orderReducer = orderSlice.reducer;
