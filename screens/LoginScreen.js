import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  signInWithPopup,
} from "react-native";
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
// import google from "../assets/google.png";

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

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        navigation.navigate("Home");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
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
          className="bg-green-500 p-2 rounded flex-row items-center justify-center space-x-2"
          onPress={signInWithGoogle}
        >
          <Text className="text-center font-bold text-white">
            Login with Google
          </Text>
          <Image source={require("../assets/google.png")} className="h-6 w-6" />
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
