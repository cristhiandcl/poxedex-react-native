import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useCallback, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassCircleIcon,
} from "react-native-heroicons/solid";
import app from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import Pokemons from "../components/Pokemons";
import { useDispatch, useSelector } from "react-redux";
import {
  filterPokemon,
  getPokemons,
  setPokemons,
} from "../slices/pokemonsSlice";
import { debounce } from "lodash";
import { pokemonsData } from "../pokemonsData";
import Input from "../components/Input";

const auth = getAuth(app);

const HomeScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isTouched, setIsTouched] = useState(false);

  const pokemons = useSelector(getPokemons);
  // const backUp = useSelector(getPokemons);

  const signOutButton = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const clearFilter = () => {
    dispatch(setPokemons(pokemonsData.slice(0, 40)));
  };

  // const changeTextDebouncer = debounce(onChange, 600);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        className={`relative h-full ${
          Platform.OS === "android" && "mt-4"
        } py-4 space-y-7`}
      >
        {Platform.OS === "ios" ? (
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
        ) : (
          <TouchableOpacity
            onPress={signOutButton}
            className="absolute top-10 right-4"
          >
            <ArrowLeftOnRectangleIcon size={40} color="green" />
          </TouchableOpacity>
        )}
        <Animatable.Text
          animation="slideInUp"
          className="font-extrabold text-xs text-center pt-12 text-gray-400 mx-8"
        >
          Welcome{" "}
          <Text className="text-sm text-green-700">
            {user?.displayName || user?.email.replace("@gmail.com", "")}
          </Text>{" "}
          !!!, nice to have you on board, here you're going to find stats about
          every pokemon you can think of, so feel free to navigate, add your
          favorite pokemons to your personal space, and create your own{" "}
          <Text className="text-red-700 text-sm">poxedex</Text>
        </Animatable.Text>
        {/* {!isTouched ? (
          <TouchableOpacity
            onPress={() => {
              setIsTouched(true);
            }}
            className="mx-3"
          >
            <MagnifyingGlassCircleIcon size={40} color="green" />
          </TouchableOpacity>
        ) : ( */}
        <View>
          <Input />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pokemons pokemons={pokemons} />
        </ScrollView>
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
