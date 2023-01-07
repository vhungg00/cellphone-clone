import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoading: false,
  error: "",
  isLogin: false,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.error = "";
      state.isLogin = true;
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    logoutSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = {};
      state.error = "";
      state.isLogin = false;
    },
    userPending: (state, { payload }) => {
      state.isLoading = true;
    },
    userSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.success = true;
    },
    userReset: (state, { payload }) => {
      state.isLoading = false;
      state.user = {};
      state.error = "";
      state.success = false;
      state.isLogin = false;
    },
    userFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = "failed";
    },
  },
});

const { reducer, actions } = userSlice;

export const { 
    loginPending, 
    loginSuccess,
    loginFail,
    userPending,
    userReset,
    userSuccess,
    userFailed, 
    logoutSuccess } = actions;

export default reducer;
