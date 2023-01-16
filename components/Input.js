import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MagnifyingGlassCircleIcon } from "react-native-heroicons/solid";
import { useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";
import { filterPokemon } from "../slices/pokemonsSlice";

const Input = () => {
  const dispatch = useDispatch();
  const [pokemonName, onChangeText] = useState("");

  const filterPokemons = () => {
    dispatch(filterPokemon(pokemonName));
    console.log(pokemonName);
    onChangeText("");
  };

  const onChange = (value) => {
    onChangeText(value);
    // console.log(value);
  };
  return (
    <Animatable.View animation="slideInLeft" className="flex-row mx-4">
      <TextInput
        className="border-rounded flex-1"
        placeholder="Type down any Pokemon's name"
        value={pokemonName}
        onChangeText={onChange}
      />
      <TouchableOpacity onPress={filterPokemons}>
        <MagnifyingGlassCircleIcon size={40} color="green" />
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default Input;
