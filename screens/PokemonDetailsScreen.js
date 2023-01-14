import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import PokemonDetails from "../components/PokemonDetails";

const PokemonDetailsScreen = () => {
  const {
    params: { pokemon },
  } = useRoute();

  return (
    <View>
      <PokemonDetails pokemon={pokemon} />
    </View>
  );
};

export default PokemonDetailsScreen;
