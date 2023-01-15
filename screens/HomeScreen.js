import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/solid";
import app from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import Pokemons from "../components/Pokemons";

const auth = getAuth(app);

const HomeScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

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

  return (
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
        animation="bounceInUp"
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="mb-4 text-2xl font-extrabold text-center text-green-700">
          Pokemons
        </Text>
        <Pokemons />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
