import { View, Text } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import app from "../firebaseConfig";

const auth = getAuth(app);
const MySpaceScreen = () => {
  const user = auth.currentUser;
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-4xl font-extrabold text-center">
        {user.displayName} Pokedex
      </Text>
    </View>
  );
};

export default MySpaceScreen;
