import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PokemonDetails from "../components/PokemonDetails";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, setPokemons } from "../slices/pokemonsSlice";
import { getPokemon, setPokemon } from "../slices/pokemonSlice";
import { CheckIcon, PlusIcon, XCircleIcon } from "react-native-heroicons/solid";
import PokemonStats from "../components/PokemonStats";

const PokemonDetailsScreen = () => {
  const navigation = useNavigation();
  const pokemons = useSelector(getPokemons);
  const dispatch = useDispatch();
  const pokemon = useSelector(getPokemon);
  const [displayMessage, setDisplayMessage] = useState(false);
  const {
    params: { name },
  } = useRoute();

  useMemo(() => {
    dispatch(
      setPokemon(pokemons?.filter((pokemon) => pokemon.name === name)[0])
    );
  }, [addPokemon]);

  const alert = !pokemon.isSaved
    ? "Added to your Pokedex"
    : "Removed from your Pokedex";

  const addPokemon = () => {
    setDisplayMessage(true);
    setTimeout(() => {
      dispatch(
        setPokemons(
          pokemons.map((pokemon) =>
            pokemon.name === name
              ? { ...pokemon, isSaved: !pokemon.isSaved }
              : pokemon
          )
        )
      );
      setDisplayMessage(false);
    }, 1000);
  };

  return (
    <View className="relative h-full pb-12">
      <TouchableOpacity
        className="absolute top-4 right-4"
        onPress={navigation.goBack}
      >
        <XCircleIcon size={50} color="green" />
      </TouchableOpacity>
      {pokemon.isSaved ? (
        <TouchableOpacity
          className="absolute top-4 left-4"
          onPress={addPokemon}
        >
          <CheckIcon size={45} color="green" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="absolute top-4 left-4"
          onPress={addPokemon}
        >
          <PlusIcon size={45} color="gray" />
        </TouchableOpacity>
      )}
      {displayMessage && (
        <View className="items-center z-10">
          <Text className="font-extrabold absolute top-80 text-lg text-red-600">
            {alert}
          </Text>
        </View>
      )}
      <View className="items-center mt-16">
        <Text className="text-5xl font-extrabold p-0">
          {pokemon?.name[0].toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <Text className="text-gray-300 font-extrabold text-lg text-center p-0">
          N.°{pokemon?.id}
        </Text>
      </View>
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <View className="items-center justify-center space-y-8">
          <Image
            source={{
              uri: pokemon?.sprites.other["official-artwork"].front_default,
            }}
            className="w-80 h-80"
          />
          <View>
            <PokemonDetails />
          </View>
          <View>
            <PokemonStats />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PokemonDetailsScreen;
