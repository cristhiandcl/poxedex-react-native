import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { useRoute } from "@react-navigation/native";
import PokemonDetails from "../components/PokemonDetails";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../slices/pokemonsSlice";
import { setPokemon } from "../slices/pokemonSlice";

const PokemonDetailsScreen = () => {
  const pokemons = useSelector(getPokemons);
  const dispatch = useDispatch();
  const {
    params: { name },
  } = useRoute();
  const pokemon = pokemons.filter((pokemon) => pokemon.name === name)[0];

  useMemo(() => {
    dispatch(setPokemon(pokemon));
  }, []);

  return (
    <View>
      <PokemonDetails />
    </View>
  );
};

export default PokemonDetailsScreen;
