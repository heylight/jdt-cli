import { createSlice } from "@reduxjs/toolkit";

interface counter {
  value: number;
}

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  } as counter,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});
export type { counter };

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
