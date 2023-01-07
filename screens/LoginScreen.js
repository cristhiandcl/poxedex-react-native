import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [userData, onChangeText] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const logUser = () => {
    console.log(userData);
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // Signed in
        setErrorMessage("");
        const user = userCredential.user;
        navigation.navigate("Home", { user: user.uid });
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(
          error.message.replace("Firebase: Error (auth/", "").replace(").", "")
        );
      });
  };

  const createUser = () => {
    console.log(userData);

    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // Signed in
        setErrorMessage("");
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Home", { user: user.uid });
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(
          error.message.replace("Firebase: Error (auth/", "").replace(").", "")
        );
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
          {errorMessage.includes("email") && (
            <Text className="font-extrabold text-red-600 text-xs">
              {errorMessage}
            </Text>
          )}
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
          {errorMessage.includes("password") && (
            <Text className="font-extrabold text-red-600 text-xs">
              {errorMessage}
            </Text>
          )}
        </View>
        <TouchableOpacity
          className="bg-green-500 p-2 rounded"
          onPress={logUser}
        >
          <Text className="text-center font-bold text-white">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded"
          onPress={createUser}
        >
          <Text className="text-center font-bold text-white">
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
