import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
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
        <TouchableOpacity
          onPress={signOutButton}
          className="absolute top-10 right-4"
        >
          <ArrowLeftOnRectangleIcon size={40} color="green" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={signOutButton}
          className="absolute top-10 right-4"
        >
          <ArrowLeftOnRectangleIcon size={40} color="green" />
        </TouchableOpacity>
      )}
      <Text className="font-extrabold text-2xl text-center text-green-700">
        Home of {user?.displayName || user?.email.replace("@gmail.com", "")}
      </Text>
      <Image
        source={
          user?.photoURL
            ? { uri: user?.photoURL }
            : require("../assets/user.png")
        }
        className="h-20 w-20 rounded-full self-center"
      />
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
