import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./slices/pokemonsSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
  },
});
