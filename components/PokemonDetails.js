import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { getPokemon } from "../slices/pokemonSlice";

const PokemonDetails = () => {
  const pokemon = useSelector(getPokemon);

  const renderAbilities = pokemon.abilities.map((ability) => (
    <Text className="font-extrabold text-lg" key={ability.ability.name}>
      {ability.ability.name[0].toUpperCase() + ability.ability.name.slice(1)}
    </Text>
  ));

  return (
    <View className="bg-green-700 rounded-3xl flex-row flex-wrap items-baseline gap-x-4 justify-around mx-8 space-y-4 p-6">
      <View className="">
        <Text className="font-extrabold text-xl text-white">Height</Text>
        <Text className="font-extrabold text-lg">
          {(pokemon.height * 0.1).toFixed(2)} m
        </Text>
      </View>
      <View>
        <Text className="font-extrabold text-xl text-white">Category</Text>
        <Text className="font-extrabold text-lg">Pokemon</Text>
      </View>
      <View>
        <Text className="font-extrabold text-xl text-white ">Weight</Text>
        <Text className="font-extrabold text-lg">
          {(pokemon.weight * 0.1).toFixed(2)} Kg
        </Text>
      </View>
      <View>
        <Text className="font-extrabold text-xl text-white">Abilities</Text>
        <View className="">{renderAbilities}</View>
      </View>

      <View>
        <Text className="font-extrabold text-xl text-white">Habitat</Text>
        <Text className="font-extrabold text-lg">Pokemon-world</Text>
      </View>
    </View>
  );
};

export default PokemonDetails;
