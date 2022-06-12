import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    loginUser(state, action) {
      console.log(`reducer called. The payload is: ${action.payload}`);
      state.user = action.payload;
    },
    logoutUser(state) {
      console.log("reducer called: user is being logged out");
      state.user = null;
    },
  },
});

console.log(userSlice.actions);
console.log(userSlice.reducer);

export const actions = userSlice.actions;
//
export const userReducers = userSlice.reducer;
