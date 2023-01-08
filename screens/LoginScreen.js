import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import app from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

const auth = getAuth(app);
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [userData, onChangeText] = useState({
    email: "",
    password: "",
  });
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "8939602846-p68pru6fb4skkbfgs5jv09bbsrpng5qr.apps.googleusercontent.com",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      console.log(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

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

  const signInWithGoogle = () => {};

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
          className="bg-green-500 p-2 rounded flex-row items-center justify-center space-x-2"
          onPress={() => {
            promptAsync();
          }}
          disabled={!request}
        >
          <Image source={require("../assets/google.png")} className="h-6 w-6" />
          <Text className="text-center font-bold text-white">
            Login with Google
          </Text>
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
