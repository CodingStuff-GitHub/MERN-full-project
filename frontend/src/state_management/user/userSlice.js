import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: {},
  err: "",
  isAuthenticated: false,
};

export const fetchUserDetails = createAsyncThunk(
  "userTypePrefix",
  async (loginUserCreds) => {
    const configuration = { headers: { "Content-Type": "application/json" } };
    const url = `/api/v1/login`;
    return axios
      .post(
        url,
        {
          email: loginUserCreds.loginEmail,
          password: loginUserCreds.loginPassword,
        },
        configuration
      )
      .then(
        (response) => response.data,
        (error) => {
          return error.response.data;
        }
      );
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.success ? action.payload : null;
      state.err = action.payload.success ? "" : action.payload.err;
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.err = action.error.message;
    });
  },
});

export const userReducer = userSlice.reducer;
