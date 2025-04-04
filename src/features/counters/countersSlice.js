import { createSlice } from '@reduxjs/toolkit';

const countersSlice = createSlice({
  name: 'counters',
  initialState: {
    drink: 0,
    popcorn: 0,
    snacks: 0,
  },
  reducers: {
    increment: (state, action) => {
      const itemName = action.payload;
      if (state.hasOwnProperty(itemName)) {
        state[itemName] += 1;
      }
    },
    decrement: (state, action) => {
      const itemName = action.payload;
      if (state.hasOwnProperty(itemName) && state[itemName] > 0) {
        state[itemName] -= 1;
      }
    },
    resetCounter: (state, action) => {
      const itemName = action.payload;
      if (state.hasOwnProperty(itemName)) {
        state[itemName] = 0;
      }
    },
    resetAllCounters: (state) => {
      Object.keys(state).forEach((itemName) => {
        state[itemName] = 0;
      });
    },
  },
});

export const { increment, decrement, resetCounter, resetAllCounters } = countersSlice.actions;
export default countersSlice.reducer;
