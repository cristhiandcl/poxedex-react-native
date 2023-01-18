import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { MagnifyingGlassCircleIcon } from "react-native-heroicons/solid";
import { useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";
import { filterPokemon } from "../slices/pokemonsSlice";

const Input = () => {
  const dispatch = useDispatch();
  const [pokemonName, onChangeText] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const filterPokemons = () => {
    dispatch(filterPokemon(pokemonName));
    Keyboard.dismiss();
    onChangeText("");
  };

  const onChange = (value) => {
    onChangeText(value);
    // console.log(value);
  };
  return (
    <View>
      {!isTouched ? (
        <TouchableOpacity
          onPress={() => {
            setIsTouched(true);
          }}
          className="mx-3"
        >
          <MagnifyingGlassCircleIcon size={40} color="green" />
        </TouchableOpacity>
      ) : (
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
      )}
    </View>
  );
};

export default Input;
