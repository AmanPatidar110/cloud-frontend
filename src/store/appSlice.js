import { createSlice } from "@reduxjs/toolkit";

// create a slice
export const appSlice = createSlice({
  name: "app",
  initialState: {},
  reducers: {
    setUser: (state, { payload }) => {
      console.log("Saving user in redux", payload);
      state.user = payload;
    },
  },
});

export const { setUser } = appSlice.actions;
