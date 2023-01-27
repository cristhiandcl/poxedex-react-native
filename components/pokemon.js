import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native-animatable";
import { useSelector } from "react-redux";
import { getPokemon } from "../slices/filterPokemonSlice";

function Pokemon({ pokemon, types }) {
  const navigation = useNavigation();
  const filteredPokemon = useSelector(getPokemon);

  const type = types.filter((type) => type.pokemon_id === pokemon.id)[0];

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push("PokemonDetails", {
          name: pokemon.name,
          onUserScreen: false,
        })
      }
      className="items-center justify-center"
    >
      <Image
        className={
          filteredPokemon?.length === 1 ? "h-[220] w-[220]" : "h-[80] w-[80]"
        }
        source={{
          uri: pokemon?.sprites.other["official-artwork"].front_default,
          // priority: FastImage.priority.high,
        }}
      />
      <Text className="text-gray-300 font-extrabold text-xs text-center">
        N.°{pokemon?.id}
      </Text>
      <Text className="text-black font-extrabold text-center ">
        {pokemon?.name[0].toUpperCase() + pokemon?.name.slice(1)}
      </Text>
      <View className="mb-8">
        {type?.type?.map((type) => {
          const t = type.toLowerCase();
          const location = "../assets/types/" + t + ".png";
          console.log(location);
          // return <Image source={require(location)} className="h-6 w-6" />;
        })}
      </View>
    </TouchableOpacity>
  );
}

export default Pokemon;
