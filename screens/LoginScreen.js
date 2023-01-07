import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebaseConfig";

const auth = getAuth(app);

const Login = () => {
  const [userData, onChangeText] = useState({
    email: "",
    password: "",
  });

  const logUser = () => {
    console.log(userData);
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <View className="flex-1 border-2 items-center justify-center">
      <View className="w-2/3 space-y-6">
        <View className="space-y-2">
          <Text className="font-extrabold">E-mail</Text>
          <TextInput
            className="border-2 p-2"
            value={userData.email}
            onChangeText={(data) => onChangeText({ ...userData, email: data })}
            placeholder="Email"
          />
        </View>
        <View className="space-y-2">
          <Text className="font-extrabold">Password</Text>
          <TextInput
            className="border-2 p-2"
            value={userData.password}
            onChangeText={(data) =>
              onChangeText({ ...userData, password: data })
            }
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          className="bg-green-500 p-2 rounded"
          onPress={logUser}
        >
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
