import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
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

export const fetchPasswordUpdate = createAsyncThunk(
  "userPasswordTypePrefix",
  async (passwordData) => {
    const configuration = { headers: { "Content-Type": "application/json" } };
    const url = `/api/v1/password/update`;
    return axios.put(url, passwordData, configuration).then(
      (response) => response.data,
      (error) => {
        return error.response.data;
      }
    );
  }
);

export const fetchForgotPassword = createAsyncThunk(
  "forgotPasswordTypePrefix",
  async (email) => {
    const configuration = { headers: { "Content-Type": "application/json" } };
    const url = `/api/v1/password/forgot`;
    return axios.post(url, email, configuration).then(
      (response) => response.data,
      (error) => {
        return error.response.data;
      }
    );
  }
);

export const fetchResetPassword = createAsyncThunk(
  "resetPasswordTypePrefix",
  async (data) => {
    const configuration = { headers: { "Content-Type": "application/json" } };
    const url = `/api/v1/password/reset/${data.token}`;
    return axios
      .put(
        url,
        { password: data.password, confirmPassword: data.confirmPassword },
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

const updateSlice = createSlice({
  name: "updateSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        fetchPasswordUpdate.pending,
        fetchUserUpdate.pending,
        fetchForgotPassword.pending,
        fetchResetPassword.pending
      ),
      (state) => {
        state.loading = true;
        state.message = "";
        state.err = "";
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchUserUpdate.fulfilled,
        fetchPasswordUpdate.fulfilled,
        fetchForgotPassword.fulfilled,
        fetchResetPassword.fulfilled
      ),
      (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.err = action.payload.err;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchUserUpdate.rejected,
        fetchPasswordUpdate.rejected,
        fetchForgotPassword.rejected,
        fetchResetPassword.rejected
      ),
      (state, action) => {
        state.loading = false;
        state.message = "";
        state.err = action.error.message;
      }
    );
  },
});

export const updateReducer = updateSlice.reducer;
