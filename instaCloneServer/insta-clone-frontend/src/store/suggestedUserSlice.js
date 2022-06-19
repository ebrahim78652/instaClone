import { createSlice } from "@reduxjs/toolkit";

const suggestedUserSlice = createSlice({
  name: "suggestedUser",
  initialState: {},
  reducers: {
    userSearched(state, action) {
      console.log(`reducer called. The payload is: ${action.payload}`);
      state.suggestedUser = action.payload;
    },
    userRemoved(state) {
      console.log("reducer called: suggested user is being removed from state");
      state.user = null;
    },
  },
});

console.log(suggestedUserSlice.actions);
console.log(suggestedUserSlice.reducer);

export const suggestedUserActions = suggestedUserSlice.actions;
export const suggestedUserReducers = suggestedUserSlice.reducer;
