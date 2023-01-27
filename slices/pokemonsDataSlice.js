import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const pokemonsDataSlice = createSlice({
  name: "pokemonsData",
  initialState,
  reducers: {
    setPokemonsData: (state, action) => {
      state.data = [...state.data, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPokemonsData } = pokemonsDataSlice.actions;

export const getPokemonsData = (state) => state.pokemonsData.data;

export default pokemonsDataSlice.reducer;
