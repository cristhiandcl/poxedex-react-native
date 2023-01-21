import { View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getPokemons } from "../slices/pokemonsSlice";
import Pokemon from "./Pokemon";

// const client = axios.create({
//   baseURL: "",
// });

const Pokemons = () => {
  const pokemons = useSelector(getPokemons);

  const renderPokemons = pokemons?.map((pokemon) => (
    <Pokemon pokemon={pokemon} key={pokemon.id} />
  ));

  return (
    <View
      className={
        pokemons.length > 1
          ? "items-center justify-between px-4 flex-row flex-wrap"
          : pokemons?.length <= 1 &&
            "flex-col items-center justify-center mt-20"
      }
    >
      {renderPokemons}
    </View>
  );
};

export default Pokemons;
