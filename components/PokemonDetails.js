import { View, Text, Image } from "react-native";
import React from "react";

const PokemonDetails = ({ pokemon }) => {
  return (
    <View>
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
