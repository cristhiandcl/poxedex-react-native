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
      className={`relative ${Platform.OS === "android" && "mt-4"} py-4`}
    >
      {Platform.OS === "ios" && (
        <TouchableOpacity
          onPress={signOutButton}
          className="absolute top-10 right-4"
        >
          <ArrowLeftOnRectangleIcon size={40} color="green" />
        </TouchableOpacity>
      )}
      <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
        {Platform.OS === "android" && (
          <TouchableOpacity
            onPress={signOutButton}
            className="absolute top-10 right-4"
          >
            <ArrowLeftOnRectangleIcon size={40} color="green" />
          </TouchableOpacity>
        )}
        <View className="items-center space-y-4">
          <Text className="font-extrabold text-2xl text-center">
            Home of {user?.displayName || user?.email.replace("@gmail.com", "")}
          </Text>
          <Image
            source={{ uri: user?.photoURL }}
            className="h-32 w-32 rounded-full mb-4"
          />
          <Pokemons />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
