import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemon: [],
};

export const pokemonsSlice = createSlice({
  name: "pokemonToFilter",
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPokemon } = pokemonsSlice.actions;

export const getPokemon = (state) => state.pokemonToFilter.pokemon;

export default pokemonsSlice.reducer;
