import { createSlice } from '@reduxjs/toolkit';

import { generateItemID } from '../../utils/helpers';

const initialStateValue = {
  id: Date.now(),
  user: "",
  updatedAt: new Date().toLocaleString(),
  screeningMovieID: null,
  screeningTitle: "",
  screeningDate: {},
  screeningTime: "",
  totalCandyBar: 0,
  totalTickets: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    addCartItems: (state, { payload }) => {
      const updatedItems = state.value.items.filter((item) => item.type !== payload.type);

      if(payload.type === "Movie") {
        state.value.user = payload.user;
        state.value.screeningMovieID = payload.movieID;
        state.value.screeningTitle = payload.movieTitle;
        state.value.screeningDate = payload.screeningDate;
        state.value.screeningTime = payload.screeningTime;

        for (let i = 0; i < payload.seats.length; i++) {
          const seat = payload.seats[i];
          updatedItems.push({
            id: generateItemID(state.value.user, i),
            user: state.value.user,
            type: payload.type,
            seat: {
              column: seat.column,
              number: seat.number,
              row: seat.row,
            },
            movieID: payload.movieID,
            movieTitle: payload.movieTitle,
            date: payload.screeningDate,
            time: payload.screeningTime,
            price: payload.price,
          });
        }
      } else if (payload.type === "CandyBar") {
        for (let i = 0; i < payload.products.length; i++) {
          const product = payload.products[i];
          updatedItems.push({
            id: generateItemID(state.value.user, i),
            user: state.value.user,
            type: payload.type,
            ...product,
          });
        }
      };
      updateCartState(state, updatedItems);
    },
    removeCartItem: (state, { payload }) => {
      const updatedItems = state.value.items.filter((item) => item.id !== payload);
      updateCartState(state, updatedItems);
    },
    resetCart: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { addCartItems, removeCartItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;

const getTotalOfType = (type, items) => {
  const filteredItems = items.filter((item) => item.type === type);

  if(type === "Movie") {
    return filteredItems.reduce((total, currentItem) => (total += currentItem.price), 0);
  } else if (type === "CandyBar") {
    return filteredItems.reduce((total, currentItem) => (total +=  currentItem.price * currentItem.quantity), 0);
  }
}

const updateCartState = (state, updatedItems) => {
  const totalTickets = getTotalOfType("Movie", updatedItems);
  const totalCandyBar = getTotalOfType("CandyBar", updatedItems);

  state.value = {
    ...state.value,
    id: Date.now(),
    items: updatedItems,
    totalCandyBar,
    totalTickets,
    updatedAt: new Date().toLocaleString(),
  };
}