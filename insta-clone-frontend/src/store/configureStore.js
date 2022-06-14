import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./userSlice";
import { suggestedUserReducers } from "./suggestedUserSlice";
const store = configureStore({
  reducer: { userReducers, suggestedUserReducers },
});

export default store;
