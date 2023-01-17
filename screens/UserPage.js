import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const UserPage = () => {
  const user = useSelector((state) => state.usuario.token);
  console.log(user);
  return (
    <View className="h-full items-center justify-center">
      <Text className="font-bold mb-4">This is your token</Text>
      <Text className="px-4">{user}</Text>
    </View>
  );
};

export default UserPage;
