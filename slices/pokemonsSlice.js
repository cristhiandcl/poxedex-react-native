import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
};

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.value = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPokemons } = pokemonsSlice.actions;

export const getPokemons = (state) => state.pokemons;

export default pokemonsSlice.reducer;
