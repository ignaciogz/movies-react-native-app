import { createSlice } from '@reduxjs/toolkit';

export const cinemaSlice = createSlice({
  name: "cinema",
  initialState: {
    value: {
      selectedMovie: null,
      selectedTicket: {},
      appSelectedSeats: [],
    },
  },
  reducers: {
    setAppSelectedSeats: (state, action) => {
      state.value.appSelectedSeats = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.value.selectedMovie = action.payload;
    },
    setSelectedTicket: (state, action) => {
      state.value.selectedTicket = action.payload;
    },
    resetAppSelectedSeats: (state) => {
      state.value.appSelectedSeats = [];
    },
    resetCinema: (state) => {
      state.value.appSelectedSeats = [];
    },
  },
});

export const { resetAppSelectedSeats, resetCinema, setAppSelectedSeats, setSelectedMovie, setSelectedTicket } = cinemaSlice.actions;
export default cinemaSlice.reducer;
