import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import userSlice from "./slice/userSlice";
import type { user } from "./slice/userSlice";
import type { counter } from "./slice/counterSlice";

interface RootState {
  user: user;
  counter: counter;
}

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice,
  },
});

export type { RootState };
