import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
// import FastImage from "react-native-fast-image";

function Pokemon({ pokemon }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      key={pokemon.id}
      onPress={() => navigation.push("PokemonDetails", { pokemon })}
      className="items-center justify-center"
    >
      {/* <View > */}
      <Image
        className="h-[80] w-[80]"
        source={{
          uri: pokemon?.sprites.other["official-artwork"].front_default,
          // priority: FastImage.priority.high,
        }}
      />
      <Text className="text-gray-300 font-extrabold text-xs text-center">
        N.°{pokemon?.id}
      </Text>
      <Text className="text-black font-extrabold text-center mb-8">
        {pokemon?.name[0].toUpperCase() + pokemon?.name.slice(1)}
      </Text>
      {/* </View> */}
    </TouchableOpacity>
  );
}

export default Pokemon;
