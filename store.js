import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./slices/pokemonsSlice";
import pokemonReducer from "./slices/pokemonSlice";

// import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // thunk: {
      //   extraArgument: myCustomApiService,
      // },
      serializableCheck: false,
    }),
});
