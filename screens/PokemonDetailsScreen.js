import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import PokemonDetails from "../components/PokemonDetails";
import { useSelector } from "react-redux";
import { getPokemons } from "../slices/pokemonsSlice";

const PokemonDetailsScreen = () => {
  const pokemons = useSelector(getPokemons);
  const {
    params: { name },
  } = useRoute();
  const pokemon = pokemons.filter((pokemon) => pokemon.name === name)[0];

  return (
    <View>
      <PokemonDetails pokemon={pokemon} />
    </View>
  );
};

export default PokemonDetailsScreen;
