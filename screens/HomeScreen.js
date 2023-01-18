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
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/solid";
import app from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import Pokemons from "../components/Pokemons";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../slices/pokemonsSlice";
import Input from "../components/Input";
import ClearSearch from "../components/ClearSearch";
// import FastImage from "react-native-fast-image";

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
              <FastImage
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
        <View>
          <Input />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pokemons pokemons={pokemons} />
        </ScrollView>
        <ClearSearch />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
