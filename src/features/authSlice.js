import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      user: null,
      access_token: null,
      isFetching: false,
      error: false,
      // isAuthenticated: localStorage.getItem("access_token") ? true : false,
    },
    register: {
      username: null,
      password: null,
      email: null,
      isFetching: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.user = action.payload.user;
      state.login.error = false;
      if (action.payload?.access_token) {
        state.login.access_token = action.payload.access_token;
      }
      // state.login.isAuthenticated = true;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
    },

    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action) => {
      const { username, password, email, image } = action.payload;
      state.register.username = username;
      state.register.password = password;
      state.register.email = email;
      state.register.isFetching = false;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
    },

    logout: (state, action) => {
      state.isAuthenticated = false;
      state.login.access_token = null;
      localStorage.clear();
      toast.success("You're logged out");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAccessToken = (state) =>
  state.auth.login.access_token;

export const selectCurrentUser = (state) => state.auth.login.user;
export const selectCurrentUserImage = (state) => state.auth.login.user.image;