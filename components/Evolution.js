import { View, Text, Image } from "react-native";
import React from "react";
import { getPokemonsData } from "../slices/pokemonsDataSlice";
import { getPokemons } from "../slices/pokemonsSlice";
import { useSelector } from "react-redux";

const Evolution = ({ name }) => {
  const pokemons = useSelector(getPokemons);

  const evolution = useSelector(getPokemonsData)
    .filter((data) => data.length === 484)[0]
    .filter((pokemon) => pokemon.pokemon_name === name)[0]?.evolutions;

  return (
    <View className="">
      {evolution === undefined && (
        <Text className="text-red-600 font-extrabold text-lg">
          This Pokemon does not evolve
        </Text>
      )}
      {evolution?.map((evo) => (
        <Image
          key={evo.pokemon_id}
          source={{
            uri:
              evo.pokemon_name &&
              pokemons.filter((pokemon) => pokemon.name === evo.pokemon_name)[0]
                ?.sprites.other["official-artwork"].front_default,
          }}
          className="w-80 h-80"
        />
      ))}
    </View>
  );
};

export default Evolution;
