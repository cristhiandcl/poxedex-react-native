import React from "react";
import { Image, Text, View } from "react-native";

function Pokemon({ pokemon }) {
  return (
    <View>
      <Image
        className="rounded p-4 bg-gray-100 h-[200] w-[200]"
        source={{
          uri: pokemon.sprites.other["official-artwork"].front_default,
        }}
      />
      <Text className="text-gray-300 font-extrabold text-center">
        N.°{pokemon.id}
      </Text>
      <Text className="text-black text-xl font-bold text-center">
        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      </Text>
    </View>
  );
}

export default Pokemon;
