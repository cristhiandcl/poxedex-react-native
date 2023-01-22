import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { getPokemon } from "../slices/pokemonSlice";
import ProgressBar from "./ProgressBar";

const PokemonStats = () => {
  const pokemon = useSelector(getPokemon);
  const max =
    pokemon.stats && Math.max(...pokemon.stats?.map((stat) => stat.base_stat));

  const RenderStats = pokemon.stats?.map((stat, index) => (
    <View className="items-center w-screen px-10" key={index}>
      <Text className="font-extrabold text-lg">
        {stat.stat.name.includes("-")
          ? stat.stat.name[0].toUpperCase() +
            stat.stat.name.slice(1, 8) +
            stat.stat.name[8].toUpperCase() +
            stat.stat.name.slice(9)
          : stat.stat.name[0].toUpperCase() + stat.stat.name.slice(1)}
      </Text>
      <ProgressBar progress={stat.base_stat} max={max} />
    </View>
  ));
  return (
    <View className="space-y-4">
      <Text className="font-extrabold text-center text-3xl">Stats</Text>
      {RenderStats}
    </View>
  );
};

export default PokemonStats;
