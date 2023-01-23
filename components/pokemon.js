import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { getPokemon } from "../slices/filterPokemonSlice";

function Pokemon({ pokemon }) {
  const navigation = useNavigation();
  const filteredPokemon = useSelector(getPokemon);

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
    </TouchableOpacity>
  );
}

export default Pokemon;
