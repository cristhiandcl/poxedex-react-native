import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { getPokemonsData } from "../slices/pokemonsDataSlice";
import { getPokemons } from "../slices/pokemonsSlice";
import { useSelector } from "react-redux";
import { typesImages } from "../types";
import { useNavigation } from "@react-navigation/native";

const Evolution = ({ name }) => {
  const navigation = useNavigation();
  const pokemons = useSelector(getPokemons);

  const evolution = useSelector(getPokemonsData)
    .filter((data) => data.length === 484)[0]
    .filter((pokemon) => pokemon.pokemon_name === name)[0]?.evolutions;

  const types = useSelector(getPokemonsData).filter(
    (elem) => elem.length === 1175
  )[0];

  const filteredtypes = types?.filter(
    (type, index) => type.pokemon_name !== types[index - 1]?.pokemon_name
  );

  const type = filteredtypes?.filter((type) => type.pokemon_name === name)[0];

  const evoPokemon = (name) => {
    navigation.navigate("PokemonDetails", {
      name,
      onUserScreen: false,
    });
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {evolution === undefined && (
        <Text className="text-red-600 font-extrabold text-lg">
          This Pokemon does not evolve
        </Text>
      )}
      {evolution?.map((evo) => (
        <View className="w-screen items-center">
          <TouchableOpacity onPress={() => evoPokemon(evo.pokemon_name)}>
            <Image
              key={evo.pokemon_id}
              source={{
                uri:
                  evo.pokemon_name &&
                  pokemons.filter(
                    (pokemon) => pokemon.name === evo.pokemon_name
                  )[0]?.sprites.other["official-artwork"].front_default,
              }}
              className="w-60 h-60"
            />
          </TouchableOpacity>
          <Text className="text-green-800 font-extrabold text-center text-lg">
            {evo?.pokemon_name}
          </Text>
          <View className="flex-row mx-auto space-x-2">
            {type?.type?.map((type) => {
              const icon = typesImages[type.toLowerCase()].image;
              return <Image source={icon} className="w-16 h-20" key={type} />;
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Evolution;
