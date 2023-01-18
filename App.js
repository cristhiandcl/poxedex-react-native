import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignInScreen from "./screens/SignInScreen";
import { store } from "./store";
import { Provider, useDispatch } from "react-redux";
import { setPokemons } from "./slices/pokemonsSlice";
import PokemonDetailsScreen from "./screens/PokemonDetailsScreen";
import MySpaceScreen from "./screens/MySpaceScreen";
import { pokemonsData } from "./pokemonsData";
// import { AppRegistry } from "react-native";

// const client = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

function AppWrapper() {
  const Stack = createNativeStackNavigator();

  const dispatch = useDispatch();
  // console.log(pokemons);

  useEffect(() => {
    // let tempPokemons = [];
    // (async () => {
    //   for (let i = 1; i <= 200; i++) {
    //     const response = await client.get(`pokemon/${i}`);
    //     tempPokemons.push(response.data);
    //   }
    dispatch(setPokemons(pokemonsData));
    // })();
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
        <Stack.Screen
          name="PokemonDetails"
          component={PokemonDetailsScreen}
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="MySpace"
          component={MySpaceScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

// AppRegistry.registerComponent("pokedex", () => App);
