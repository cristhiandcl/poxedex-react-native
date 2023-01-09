import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const auth = getAuth(app);

const SignInScreen = () => {
  const [userData, onChangeText] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  // Create user with Email and Password
  const createUser = () => {
    console.log(userData);
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // Signed in
        setErrorMessage("");
        const user = userCredential.user;
        //
        Alert.alert("Sign In", "User Created Successfully", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(
          error.message.replace("Firebase: Error (auth/", "").replace(").", "")
        );
        console.log(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        className="flex-1 items-center justify-center"
        onPress={() => Keyboard.dismiss()}
      >
        <View className="w-2/3 space-y-6">
          <View className="space-y-2">
            <Text className="font-extrabold">Name</Text>
            <TextInput
              className="border-2 p-2"
              value={userData.name}
              onChangeText={(data) => onChangeText({ ...userData, name: data })}
              placeholder="Name"
            />
          </View>
          <View className="space-y-2">
            <Text className="font-extrabold">E-mail</Text>
            <TextInput
              className="border-2 p-2"
              value={userData.email}
              onChangeText={(data) =>
                onChangeText({ ...userData, email: data })
              }
              placeholder="Email"
              autoCapitalize="none"
            />
            {(errorMessage.includes("email") ||
              errorMessage.includes("user-not-found")) && (
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
            className="bg-blue-500 p-2 rounded"
            onPress={createUser}
          >
            <Text className="text-center font-bold text-white">
              Create Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-500 p-2 rounded"
            onPress={navigation.goBack}
          >
            <Text className="text-center font-bold text-white">Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
