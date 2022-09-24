import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  review: {},
  err: "",
};

export const fetchCreateReview = createAsyncThunk(
  "createReviewTypePrefix",
  async (reviewData) => {
    const configuration = { headers: { "Content-Type": "application/json" } };
    const url = `/api/v1/review`;
    console.log(url);
    return axios.put(url, reviewData, configuration).then(
      (response) => response.data,
      (error) => {
        return error.response.data;
      }
    );
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {
    clearReviewStore: (state) => {
      state.loading = false;
      state.review = {};
      state.err = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreateReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateReview.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload;
    });
    builder.addCase(fetchCreateReview.rejected, (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    });
  },
});

export const reviewReducer = reviewSlice.reducer;
export const { clearReviewStore } = reviewSlice.actions;
