import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useState, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/solid";
import app from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import Pokemons from "../components/Pokemons";
import { useSelector } from "react-redux";
import { getPokemons } from "../slices/pokemonsSlice";
import Input from "../components/Input";
import ClearSearch from "../components/ClearSearch";
import Pokemon from "../components/Pokemon";
import { getPokemonsData } from "../slices/pokemonsDataSlice";

const auth = getAuth(app);

const HomeScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [message, setMessage] = useState(true);
  let [renderFullPokemons, setRenderFullPokemons] = useState([]);
  const pokemons = useSelector(getPokemons);
  const types = useSelector(getPokemonsData).filter(
    (elem) => elem.length === 1175
  )[0];
  const filteredtypes = types?.filter(
    (type, index) => type.pokemon_name !== types[index - 1]?.pokemon_name
  );

  const signOutButton = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successfully.
        navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useMemo(() => {
    setTimeout(() => {
      setMessage(false);
    }, 8000);
    setRenderFullPokemons(
      pokemons?.map((pokemon) => (
        <Pokemon pokemon={pokemon} key={pokemon.id} types={filteredtypes} />
      ))
    );
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        className={`relative h-full ${
          Platform.OS === "android" && "mt-8"
        } py-4 space-y-7`}
      >
        {Platform.OS === "ios" && (
          <View className="absolute flex-row top-14 mx-4">
            <TouchableOpacity onPress={signOutButton} className="flex-1">
              <ArrowLeftOnRectangleIcon size={40} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("MySpace")}>
              <Image
                source={
                  user?.photoURL
                    ? { uri: user?.photoURL }
                    : require("../assets/user.png")
                }
                className="h-10 w-10 rounded-full self-center"
              />
            </TouchableOpacity>
          </View>
        )}
        {message ? (
          <Animatable.Text
            animation="slideInUp"
            className={`font-extrabold text-xs text-center ${
              Platform.OS === "ios" ? "pt-12" : "pt-16"
            } text-gray-400 mx-8`}
          >
            Welcome{" "}
            <Text className="text-sm text-green-700">
              {user?.displayName || user?.email.replace("@gmail.com", "")}
            </Text>{" "}
            !!!, nice to have you on board, here you're going to find stats
            about every pokemon you can think of, so feel free to navigate, add
            your favorite pokemons to your personal space, and create your own{" "}
            <Text className="text-red-700 text-sm">poxedex</Text>
          </Animatable.Text>
        ) : (
          <Text className="font-extrabold text-5xl text-center pt-12 text-green-700">
            Pokedex
          </Text>
        )}
        {Platform.OS === "android" && (
          <View className="absolute flex-row top-0 mx-4">
            <TouchableOpacity onPress={signOutButton} className="flex-1">
              <ArrowLeftOnRectangleIcon size={40} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("MySpace")}>
              <Image
                source={
                  user?.photoURL
                    ? { uri: user?.photoURL }
                    : require("../assets/user.png")
                }
                className="h-10 w-10 rounded-full self-center"
              />
            </TouchableOpacity>
          </View>
        )}
        <View>
          <Input />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pokemons renderFullPokemons={renderFullPokemons} />
        </ScrollView>
        <ClearSearch />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
