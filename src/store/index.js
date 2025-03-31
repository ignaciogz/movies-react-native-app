import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import cartReducer from '../features/cart/cartSlice';
import cinemaReducer from '../features/cinema/cinemaSlice';
import countersReducer from '../features/counters/countersSlice';
import searchReducer from '../features/search/searchSlice';
import userReducer from '../features/user/userSlice';

/* import { authApi } from '../services/authService'; */
import { cinemaApi } from '../services/cinemaService';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    cinema: cinemaReducer,
    counters: countersReducer,
    search: searchReducer,
    user: userReducer,
    /* [authApi.reducerPath]: authApi.reducer, */
    [cinemaApi.reducerPath]: cinemaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      /* .concat(authApi.middleware) */
      .concat(cinemaApi.middleware)
});

setupListeners(store.dispatch);

export default store;
