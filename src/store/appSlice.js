import { createSlice } from "@reduxjs/toolkit";

// create a slice
export const appSlice = createSlice({
  name: "app",
  initialState: {
    showLoader: false,
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    loginUser: (state, { payload }) => {
      console.log("Saving user in redux", payload);
      state.user = { ...payload };
      state.isAuthenticated = true;
    },
    logoutUser: (state, { payload }) => {
      console.log("Loging-out", payload);
      state.user = null;
      state.isAuthenticated = false;
    },
    setShowLoader: (state, { payload }) => {
      state.showLoader = payload;
    },
  },
});

export const { loginUser, setShowLoader, logoutUser } = appSlice.actions;
