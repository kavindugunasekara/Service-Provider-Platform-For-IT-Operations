import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
