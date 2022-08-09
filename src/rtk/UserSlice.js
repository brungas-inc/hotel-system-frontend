import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, status } from "../utils/constants";

const initialState = {
  error: null,
  user: {},
  status: status.idle,
  permissions: [],
  role: null,
};

export const getUser = createAsyncThunk("user/getUser", async (userid) => {
  try {
    const response = await window.axios.get(`${BASE_URL}users/${userid}`, {
      headers: { Authorization: `Bearer ${window.$api_token}` },
    });
    return response.data.data;
  } catch (error) {
    if (error.response.status == 401 || error.response.status == 403)
      window.location.href = "/";
    return error.response.data;
  }
});

const UserSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = status.pending;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = status.succeeded;
        state.user = { ...action.payload };
        state.role = action.payload?.role;
        state.permissions = action.payload?.role?.permissions;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = status.failed;
        state.error = action.error?.data;
      });
  },
});

export const getCurrentUser = (state) => state.user;
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;
export const getCurrentRole = (state) => state.user.role;

export default UserSlice.reducer;
