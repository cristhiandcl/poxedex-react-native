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
  // console.log(pokemons)

  const renderPokemons = pokemons?.map((pokemon) => (
    <Pokemon pokemon={pokemon} />
  ));

  return (
    <View className="items-center justify-between px-4 flex-row flex-wrap">
      {renderPokemons}
    </View>
  );
};

export default Pokemons;
