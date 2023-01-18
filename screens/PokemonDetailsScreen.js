import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PokemonDetails from "../components/PokemonDetails";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../slices/pokemonsSlice";
import { getPokemon, setPokemon } from "../slices/pokemonSlice";
import { XCircleIcon } from "react-native-heroicons/solid";

const PokemonDetailsScreen = () => {
  const navigation = useNavigation();
  const pokemons = useSelector(getPokemons);
  const dispatch = useDispatch();
  const {
    params: { name },
  } = useRoute();

  useMemo(() => {
    dispatch(
      setPokemon(pokemons.filter((pokemon) => pokemon.name === name)[0])
    );
  }, []);

  const pokemon = useSelector(getPokemon);
  console.log(pokemon);

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
      {/* <PokemonDetails /> */}
    </View>
  );
};

export default PokemonDetailsScreen;
