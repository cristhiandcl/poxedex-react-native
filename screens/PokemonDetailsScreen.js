import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import PokemonDetails from "../components/PokemonDetails";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../slices/pokemonsSlice";
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
import { typesImages } from "../types";
import { getPokemonsData } from "../slices/pokemonsDataSlice";
import Evolution from "../components/Evolution";
import { useScrollToTop } from "@react-navigation/native";

const db = getFirestore(app);

const PokemonDetailsScreen = () => {
  const navigation = useNavigation();
  const pokemons = useSelector(getPokemons);
  const pokemon = useSelector(getPokemon);
  const [names, setNames] = useState([]);
  const dispatch = useDispatch();
  const [displayMessage, setDisplayMessage] = useState(false);
  const {
    params: { name, onUserScreen },
  } = useRoute();
  const user = getAuth(app).currentUser;
  const scrollViewRef = useRef();

  const types = useSelector(getPokemonsData).filter(
    (elem) => elem.length === 1175
  )[0];

  const filteredtypes = types?.filter(
    (type, index) => type.pokemon_name !== types[index - 1]?.pokemon_name
  );

  const type = filteredtypes?.filter(
    (type) => type.pokemon_id === pokemon.id
  )[0];

  useEffect(() => {
    dispatch(
      setPokemon(pokemons?.filter((pokemon) => pokemon.name === name)[0])
    );
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  }, [name]);

  useMemo(() => {
    (async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setNames(docSnap.data().saved);
    })();
  }, [displayMessage]);

  const alert = !names?.includes(name.toLowerCase())
    ? "Added to your Pokedex"
    : "Removed from your Pokedex";

  const addPokemon = () => {
    (async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      await setDoc(
        doc(db, "users", user.uid),
        {
          saved: docSnap.data().saved?.includes(name.toLowerCase())
            ? arrayRemove(name.toLowerCase())
            : arrayUnion(name.toLowerCase()),
        },
        { merge: true }
      );
    })();
    setDisplayMessage(true);
    setTimeout(() => {
      setDisplayMessage(false);
    }, 800);
  };

  return (
    <View className="relative h-full pb-12">
      <TouchableOpacity
        className={
          Platform.OS === "ios"
            ? "absolute top-4 right-4"
            : "absolute top-10 right-4"
        }
        onPress={navigation.goBack}
      >
        <XCircleIcon size={50} color="green" />
      </TouchableOpacity>
      {!onUserScreen &&
        (names?.includes(name.toLowerCase()) ? (
          <TouchableOpacity
            className={
              Platform.OS === "ios"
                ? "absolute top-4 left-4"
                : "absolute top-10 left-4"
            }
            onPress={addPokemon}
          >
            <CheckIcon size={45} color="green" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className={
              Platform.OS === "ios"
                ? "absolute top-4 left-4"
                : "absolute top-10 left-4"
            }
            onPress={addPokemon}
          >
            <PlusIcon size={45} color="gray" />
          </TouchableOpacity>
        ))}
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
      <ScrollView
        className=""
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
      >
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
            <Text className="font-extrabold text-center text-3xl mb-4">
              About
            </Text>
            <PokemonDetails />
          </View>
          <View>
            <View>
              <Text className="font-extrabold text-center text-3xl mb-4">
                Type
              </Text>
              <View className="mb-8 flex-row mx-auto space-x-4">
                {type?.type?.map((type) => {
                  const icon = typesImages[type.toLowerCase()].image;
                  return (
                    <Image source={icon} className="w-16 h-20" key={type} />
                  );
                })}
              </View>
            </View>
          </View>
          <PokemonStats />
          <Text className="font-extrabold text-center text-3xl mb-4">
            Evolution
          </Text>
          <Evolution name={name} />
        </View>
      </ScrollView>
    </View>
  );
};

export default PokemonDetailsScreen;
