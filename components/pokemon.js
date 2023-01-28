import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import { useSelector } from "react-redux";
import { getPokemon } from "../slices/filterPokemonSlice";
import { typesImages } from "../types";

function Pokemon({ pokemon, types }) {
  const navigation = useNavigation();
  const filteredPokemon = useSelector(getPokemon);

  const type = types?.filter((type) => type.pokemon_id === pokemon.id)[0];

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
      <Text className="text-black font-extrabold text-center ">
        {pokemon?.name[0].toUpperCase() + pokemon?.name.slice(1)}
      </Text>
      <View className="mb-8 flex-row">
        {type?.type?.map((type) => {
          const icon = typesImages[type.toLowerCase()].image;
          return <Image source={icon} className="w-8 h-10" key={type} />;
        })}
      </View>
    </TouchableOpacity>
  );
}

export default Pokemon;
