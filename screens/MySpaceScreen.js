import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import app from "../firebaseConfig";
import { useSelector } from "react-redux";
import { getPokemons } from "../slices/pokemonsSlice";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftCircleIcon } from "react-native-heroicons/solid";

const auth = getAuth(app);
const MySpaceScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const pokemons = useSelector(getPokemons).filter(
    (pokemon) => pokemon.isSaved
  );
  console.log(pokemons.length);
  const renderPokemons = pokemons?.map((pokemon) => (
    <TouchableOpacity
      key={pokemon.id}
      onPress={() => navigation.push("PokemonDetails", { name: pokemon.name })}
      className="items-center justify-center"
    >
      {/* <View > */}
      <Image
        className={pokemons.length > 1 ? "h-[180] w-[180]" : "h-[260] w-[260]"}
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
  ));

  return (
    <View
      className={`${
        pokemons?.length === 0 && "justify-center"
      } relative space-y-8 mt-10 h-full pb-20 items-center`}
    >
      <TouchableOpacity
        className="absolute top-0 left-4"
        onPress={navigation.goBack}
      >
        <ArrowLeftCircleIcon size={50} color="green" />
      </TouchableOpacity>
      <View className="pt-6">
        <Text className="text-2xl font-extrabold text-center">
          {user.displayName} <Text className="text-red-600">Pokedex</Text>
        </Text>
        <View className="w-2/4 flex-row mx-auto opacity-50">
          <Text className="font-extrabold text-xs text-green-700 text-center">
            Here you're gonna find your favorite Pokemons
          </Text>
        </View>
      </View>
      <ScrollView
        className={pokemons.length === 0 && "hidden"}
        showsVerticalScrollIndicator={false}
      >
        {renderPokemons}
      </ScrollView>
    </View>
  );
};

export default MySpaceScreen;
