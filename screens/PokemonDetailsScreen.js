import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PokemonDetails from "../components/PokemonDetails";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, setPokemons } from "../slices/pokemonsSlice";
import { getPokemon, setPokemon } from "../slices/pokemonSlice";
import { CheckIcon, PlusIcon, XCircleIcon } from "react-native-heroicons/solid";
import PokemonStats from "../components/PokemonStats";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import app from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);

const PokemonDetailsScreen = () => {
  const navigation = useNavigation();
  const pokemons = useSelector(getPokemons);
  const pokemon = useSelector(getPokemon);
  const [names, setNames] = useState([]);
  const dispatch = useDispatch();
  const [displayMessage, setDisplayMessage] = useState(false);
  const {
    params: { name },
  } = useRoute();
  const user = getAuth(app).currentUser;

  useMemo(() => {
    dispatch(
      setPokemon(pokemons?.filter((pokemon) => pokemon.name === name)[0])
    );
  }, []);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setNames(docSnap.data().saved);
    })();
  }, [displayMessage]);

  const alert = !names?.includes(name)
    ? "Added to your Pokedex"
    : "Removed from your Pokedex";

  const addPokemon = () => {
    setDisplayMessage(true);

    (async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      await setDoc(
        doc(db, "users", user.uid),
        {
          saved: docSnap.data().saved.includes(name)
            ? arrayRemove(name)
            : arrayUnion(name),
        },
        { merge: true }
      );
    })();
    setTimeout(() => {
      setDisplayMessage(false);
    }, 1000);
  };

  return (
    <View className="relative h-full pb-12">
      <TouchableOpacity
        className="absolute top-4 right-4"
        onPress={navigation.goBack}
      >
        <XCircleIcon size={50} color="green" />
      </TouchableOpacity>
      {names?.includes(name) ? (
        <TouchableOpacity
          className="absolute top-4 left-4"
          onPress={addPokemon}
        >
          <CheckIcon size={45} color="green" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="absolute top-4 left-4"
          onPress={addPokemon}
        >
          <PlusIcon size={45} color="gray" />
        </TouchableOpacity>
      )}
      {displayMessage && (
        <View className="items-center z-10">
          <Text className="font-extrabold absolute top-80 text-lg text-red-600">
            {alert}
          </Text>
        </View>
      )}
      <View className="items-center mt-16">
        <Text className="text-5xl font-extrabold p-0">
          {pokemon.name &&
            pokemon?.name[0].toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <Text className="text-gray-300 font-extrabold text-lg text-center p-0">
          N.°{pokemon?.id}
        </Text>
      </View>
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <View className="items-center justify-center space-y-8">
          <Image
            source={{
              uri:
                pokemon.name &&
                pokemon?.sprites.other["official-artwork"].front_default,
            }}
            className="w-80 h-80"
          />
          <View>
            <PokemonDetails />
          </View>
          <View>
            <PokemonStats />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PokemonDetailsScreen;
