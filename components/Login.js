import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Login = () => {
  const [userData, onChangeText] = React.useState({
    email: null,
    password: null,
  });

  return (
    <View className="flex-1 border-2 items-center justify-center">
      <View className="w-2/3 space-y-6">
        <View className="space-y-2">
          <Text className="font-extrabold">E-mail</Text>
          <TextInput
            className="border-2 p-2"
            value={userData.email}
            onChangeText={onChangeText}
            placeholder="Email"
          />
        </View>
        <View className="space-y-2">
          <Text className="font-extrabold">Password</Text>
          <TextInput
            className="border-2 p-2"
            value={userData.email}
            onChangeText={onChangeText}
            placeholder="Password"
          />
        </View>
        <TouchableOpacity className="bg-green-500 p-2 rounded">
          <Text className="text-center font-bold text-white">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-500 p-2 rounded">
          <Text className="text-center font-bold text-white">
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
