import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getPokemons } from "../slices/pokemonsSlice";
import Pokemon from "./Pokemon";
import { useNavigation } from "@react-navigation/native";

// const client = axios.create({
//   baseURL: "",
// });

const Pokemons = () => {
  const pokemons = useSelector(getPokemons);
  // console.log(pokemons);
  const navigation = useNavigation();

  const renderPokemons = pokemons.map((pokemon) => (
    <TouchableOpacity
      key={pokemon.id}
      onPress={() => navigation.push("PokemonDetails", { pokemon })}
    >
      <Pokemon pokemon={pokemon} />
    </TouchableOpacity>
  ));

  return (
    <View className="items-center p-4 flex-row justify-center flex-wrap gap-8">
      {renderPokemons}
    </View>
  );
};

export default Pokemons;
