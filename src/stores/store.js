import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./authSlice/authSlice"
import kenoSlice from "./keno/kenoSlice";

export const store = configureStore({
  reducer: {
    User: loginSlice,
    Keno:kenoSlice,
  },
});
