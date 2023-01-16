import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
};

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = [...action.payload];
    },
    filterPokemon: (state, action) => {
      const temp = state.pokemons.filter(
        (pokemon) => pokemon.name === action.payload.toLowerCase().trim()
      );
      state.pokemons = [...temp];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPokemons, filterPokemon } = pokemonsSlice.actions;

export const getPokemons = (state) => state.pokemons.pokemons;

export default pokemonsSlice.reducer;
