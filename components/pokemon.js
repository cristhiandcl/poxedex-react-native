import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import { useSelector } from "react-redux";
import { getPokemon } from "../slices/filterPokemonSlice";

function Pokemon({ pokemon, type }) {
  const navigation = useNavigation();
  const filteredPokemon = useSelector(getPokemon);
  console.log(type);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push("PokemonDetails", {
          name: pokemon.name,
          onUserScreen: false,
        })
      }
      className="items-center justify-center"
    >
      <Image
        className={
          filteredPokemon?.length === 1 ? "h-[220] w-[220]" : "h-[80] w-[80]"
        }
        source={{
          uri: pokemon?.sprites.other["official-artwork"].front_default,
          // priority: FastImage.priority.high,
        }}
      />
      <Text className="text-gray-300 font-extrabold text-xs text-center">
        N.°{pokemon?.id}
      </Text>
      <Text className="text-black font-extrabold text-center mb-8">
        {pokemon?.name[0].toUpperCase() + pokemon?.name.slice(1)}
      </Text>
      <View>
        {type[0]?.type.map((type) => (
          <Text key={type[0].pokemon_id}>{type}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );
}

export default Pokemon;
