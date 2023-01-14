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
import Pokemon from "./pokemon";
import { useNavigation } from "@react-navigation/native";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/photos",
});

const Pokemons = () => {
  const pokemons = useSelector(getPokemons);
  // console.log(pokemons);
  const navigation = useNavigation();

  const renderPokemons = pokemons.map((pokemon) => (
    <TouchableOpacity
      key={pokemon.id}
      onPress={() => navigation.push("PokemonDetails", { pokemon })}
      className="border-2 p-2 border-green-900 rounded-full"
    >
      <Pokemon pokemon={pokemon} />
    </TouchableOpacity>
  ));

  return (
    <View className="w-2/3 space-y-8">
      <Text className="text-center font-extrabold text-2xl text-green-800">
        Pokemons
      </Text>
      <View className="items-center space-y-6">{renderPokemons}</View>
    </View>
  );
};

export default Pokemons;
