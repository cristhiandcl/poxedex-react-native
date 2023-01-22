import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import app from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { KEYS } from "../keys";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  useEffect(() => {}, []);
  const [userData, onChangeText] = useState({
    email: "",
    password: "",
  });
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: KEYS.expoClientId,
    androidClientId: KEYS.androidClientId,
    iosClientId: KEYS.iosClientId,
  });

  const navigation = useNavigation();

  // LogIn With Google
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then((result) => {
        (async () => {
          const user = result.user.displayName;
          await setDoc(
            doc(db, "users", result.user.uid),
            { user: `${user}` },
            { merge: true }
          );
        })();
        navigation.navigate("Home");
      });
    }
  }, [response]);

  // LogIn with Email and Password
  const logUser = () => {
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        onChangeText({ email: "", password: "" });
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        Alert.alert(
          "Login",
          error.message.replace("Firebase: Error (auth/", "").replace(").", ""),
          [{ text: "OK" }]
        );
      });
  };

  // Create user with Email and Password
  const createUser = () => {
    console.log(userData);
    navigation.navigate("SignIn");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        className="flex-1 items-center justify-center"
        onPress={() => Keyboard.dismiss()}
      >
        <Text className="text-4xl text-center text-green-700 font-extrabold mb-2">
          Welcome to the POKEDEX
        </Text>
        <Text className="w-3/4 text-center text-gray-400 font-extrabold text-xs mb-14 opacity-50">
          Login if you already have an account or create one to get access to
          your poxedex
        </Text>
        <View className="w-2/3 space-y-6">
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
          <TouchableOpacity
            className="bg-green-500 p-2 rounded flex-row items-center justify-center space-x-2"
            onPress={() => {
              promptAsync();
            }}
            disabled={!request}
          >
            <Image
              source={require("../assets/google.png")}
              className="h-6 w-6"
            />
            <Text className="text-center font-bold text-white">
              Login with Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-500 p-2 rounded"
            onPress={createUser}
          >
            <Text className="text-center font-bold text-white">
              Don't Have an Account ?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
