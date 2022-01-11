import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import userSlice from "./slice/userSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice,
  },
});
