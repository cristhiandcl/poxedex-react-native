import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./slices/pokemonsSlice";
import pokemonReducer from "./slices/pokemonSlice";
import pokemonToFilterReducer from "./slices/filterPokemonSlice";
import pokemonsDataReducer from "./slices/pokemonsDataSlice";

// import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    pokemon: pokemonReducer,
    pokemonToFilter: pokemonToFilterReducer,
    pokemonsData: pokemonsDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // thunk: {
      //   extraArgument: myCustomApiService,
      // },
      serializableCheck: false,
    }),
});
