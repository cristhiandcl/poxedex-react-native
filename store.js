import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./slices/pokemonsSlice";
import usuarioReducer from "./slices/usuarioSlice";
// import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    usuario: usuarioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // thunk: {
      //   extraArgument: myCustomApiService,
      // },
      serializableCheck: false,
    }),
});
