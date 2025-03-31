import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import cartReducer from '../features/cart/cartSlice';
import counterReducer from '../features/counter/counterSlice';
import searchReducer from '../features/search/searchSlice';
import shopReducer from '../features/shop/shopSlice';
import userReducer from '../features/user/userSlice';

/* import { authApi } from '../services/authService';
import { shopApi } from '../services/shopService'; */

const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer,
    search: searchReducer,
    shop: shopReducer,
    user: userReducer,
    /* [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer, */
  },
  /* middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(authApi.middleware) */
});

setupListeners(store.dispatch);

export default store;
