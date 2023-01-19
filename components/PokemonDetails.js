import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { XCircleIcon, XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getPokemon } from "../slices/pokemonSlice";

const PokemonDetails = () => {
  const pokemon = useSelector(getPokemon);
  const renderAbilities = pokemon.abilities.map((ability) => (
    <Text>{ability.ability.name}</Text>
  ));

  return (
    <View className="bg-green-700 rounded-3xl flex-row flex-wrap items-center space-x-6 justify-around mx-8 space-y-4 p-6">
      <View className="">
        <Text className="font-extrabold text-xl text-white">Height</Text>
        <Text className="font-extrabold text-lg">
          {Math.round(pokemon.height * 0.1)} m
        </Text>
      </View>
      <View>
        <Text className="font-extrabold text-xl text-white">Category</Text>
        <Text className="font-extrabold text-lg">Pokemon</Text>
      </View>
      <View>
        <Text className="font-extrabold text-xl text-white">Weight</Text>
        <Text className="font-extrabold text-lg">
          {Math.round(pokemon.weight * 0.1)} Kg
        </Text>
      </View>
      <View>
        <Text className="font-extrabold text-xl text-white">Abilities</Text>
        {/* <Text className="font-extrabold text-lg">Abilities</Text> */}
        {renderAbilities}
      </View>

      <View>
        <Text className="font-extrabold text-xl text-white">Habitat</Text>
        <Text className="font-extrabold text-lg">Pokemon-world</Text>
      </View>
    </View>
  );
};

export default PokemonDetails;
