import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchText: "",
  },
  reducers: {
    clearSearchText: (state) => {
      state.searchText = "";
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { clearSearchText, setSearchText } = searchSlice.actions;
export default searchSlice.reducer;
