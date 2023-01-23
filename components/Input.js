import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { MagnifyingGlassCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import { getPokemons } from "../slices/pokemonsSlice";
import { setPokemon } from "../slices/filterPokemonSlice";

const Input = () => {
  const dispatch = useDispatch();
  const [pokemonName, onChangeText] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const pokemons = useSelector(getPokemons);
  const wrongAnswer = "You must type down a valid Pokemon's name";
  const names = pokemons.map((pokemon) => pokemon.name);

  const filterPokemons = () => {
    if (names.includes(pokemonName.toLowerCase().trim())) {
      dispatch(
        setPokemon(
          pokemons.filter(
            (pokemon) => pokemon.name === pokemonName.toLowerCase().trim()
          )
        )
      );
      Keyboard.dismiss();
      onChangeText("");
    } else {
      setIsTriggered(true);
      setTimeout(() => {
        setIsTriggered(false);
      }, 3000);
    }
  };

  const onChange = (value) => {
    onChangeText(value);
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
      {isTriggered && (
        <Text className="text-red-500 font-extrabold text-xs text-center opacity-50">
          {wrongAnswer}
        </Text>
      )}
    </View>
  );
};

export default Input;
