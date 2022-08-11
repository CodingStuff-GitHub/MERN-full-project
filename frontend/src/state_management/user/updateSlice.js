import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  message: "",
  err: "",
};

export const fetchUserUpdate = createAsyncThunk(
  "userUpdateTypePrefix",
  async (userData) => {
    const configuration = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const url = `/api/v1/profile/update`;
    return axios.put(url, userData, configuration).then(
      (response) => response.data,
      (error) => {
        return error.response.data;
      }
    );
  }
);

const updateSlice = createSlice({
  name: "updateSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserUpdate.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.err = "";
    });
    builder.addCase(fetchUserUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.err = "";
    });
    builder.addCase(fetchUserUpdate.rejected, (state, action) => {
      state.loading = false;
      state.message = "";
      state.err = action.error.message;
    });
  },
});

export const updateReducer = updateSlice.reducer;
