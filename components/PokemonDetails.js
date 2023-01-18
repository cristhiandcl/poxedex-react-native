import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { XCircleIcon, XMarkIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getPokemon } from "../slices/pokemonSlice";

const PokemonDetails = () => {
  const navigation = useNavigation();
  const pokemon = useSelector(getPokemon);

  return (
    <View className="h-full items-center justify-center relative">
      <TouchableOpacity
        className="absolute top-4 right-4"
        onPress={navigation.goBack}
      >
        <XCircleIcon size={50} color="green" />
      </TouchableOpacity>
      <Image
        source={{
          uri: pokemon.sprites.other["official-artwork"].front_default,
        }}
        className="w-80 h-80"
      />
    </View>
  );
};

export default PokemonDetails;
