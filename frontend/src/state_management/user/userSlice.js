import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: {},
  err: "",
  isAuthenticated: false,
};

export const fetchUserLogin = createAsyncThunk(
  "userLoginTypePrefix",
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
export const fetchUserRegister = createAsyncThunk(
  "userRegisterTypePrefix",
  async (userData) => {
    const configuration = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const url = `/api/v1/register`;
    return axios.post(url, userData, configuration).then(
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
    builder.addMatcher(
      isAnyOf(fetchUserLogin.pending, fetchUserRegister.pending),
      (state) => {
        state.loading = true;
        state.err = "";
        state.user = {};
        state.isAuthenticated = false;
      }
    );
    builder.addMatcher(
      isAnyOf(fetchUserLogin.fulfilled, fetchUserRegister.fulfilled),
      (state, action) => {
        state.loading = false;

        if (action.payload.success) {
          state.isAuthenticated = true;
          state.user = action.payload;
          state.err = "";
        } else {
          state.isAuthenticated = false;
          state.user = {};
          state.err = action.payload.err;
        }
      }
    );
    builder.addMatcher(
      isAnyOf(fetchUserLogin.rejected, fetchUserRegister.rejected),
      (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
        state.err = action.error.message;
      }
    );
  },
});

export const userReducer = userSlice.reducer;
