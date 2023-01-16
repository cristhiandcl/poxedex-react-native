import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, setPokemons } from "../slices/pokemonsSlice";
import * as Animatable from "react-native-animatable";
import { pokemonsData } from "../pokemonsData";

const ClearSearch = () => {
  const pokemons = useSelector(getPokemons);
  const dispatch = useDispatch();

  const clearFilter = () => {
    dispatch(setPokemons(pokemonsData));
  };

  return (
    <View>
      {pokemons.length <= 1 && (
        <Animatable.View animation="fadeInDownBig" className="mb-12">
          <TouchableOpacity
            className="w-1/4 rounded-full p-2 self-center bg-green-700"
            onPress={clearFilter}
          >
            <Text className="text-center text-xs font-extrabold text-white">
              Clear Filter
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );
};

export default ClearSearch;
