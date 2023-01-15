import React from "react";
import { Image, Text, View } from "react-native";

function Pokemon({ pokemon }) {
  return (
    <View className="items-center justify-center">
      <Image
        className="h-[80] w-[80]"
        source={{
          uri: pokemon?.sprites.other["official-artwork"].front_default,
        }}
      />
      <Text className="text-gray-300 font-extrabold text-xs text-center">
        N.°{pokemon?.id}
      </Text>
      <Text className="text-black font-extrabold text-center">
        {pokemon?.name[0].toUpperCase() + pokemon?.name.slice(1)}
      </Text>
    </View>
  );
}

export default Pokemon;
