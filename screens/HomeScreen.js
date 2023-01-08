import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/solid";
import app from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);

const HomeScreen = () => {
  const navigation = useNavigation();
  const {
    params: { user },
  } = useRoute();
  console.log(user);

  const signOutButton = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <View className="relative flex-1">
      <View className="flex-1 items-center justify-center">
        <TouchableOpacity
          onPress={signOutButton}
          className="absolute top-10 right-4"
        >
          <ArrowLeftOnRectangleIcon size={40} color="green" />
        </TouchableOpacity>
        <Text className="font-extrabold text-2xl p-2 text-center">
          Home of {user?.displayName || user?.email.replace("@gmail.com", "")}
        </Text>
        <Image
          source={{ uri: user?.photoURL }}
          className="h-20 w-20 rounded-full"
        />
      </View>
    </View>
  );
};

export default HomeScreen;
