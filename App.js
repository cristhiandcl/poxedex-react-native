import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignInScreen from "./screens/SignInScreen";

const client = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

export default function App() {
  const Stack = createNativeStackNavigator();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    let tempPokemons = [];
    async function getPokemons() {
      for (let i = 1; i <= 20; i++) {
        const response = await client.get(`pokemon/${i}`);
        tempPokemons.push(response.data);
      }
      setPokemons([...tempPokemons]);
    }
    getPokemons();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
