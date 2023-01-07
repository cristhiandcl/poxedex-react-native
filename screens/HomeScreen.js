import { View, Text } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const {
    params: { user },
  } = useRoute();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-extrabold text-2xl">HomeScreen of {user}</Text>
    </View>
  );
};

export default HomeScreen;
