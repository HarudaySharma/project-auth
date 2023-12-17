import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    siginInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // data coming from req
      state.loading = false;
      state.error = 2;
      // error => 1 -> error , 2 -> successfull, 0 -> initial
    },
    siginInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { siginInStart, signInSuccess, siginInFailure } =
  userSlice.actions;

export default userSlice.reducer;
