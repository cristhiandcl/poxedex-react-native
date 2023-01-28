import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { useEffect, useMemo } from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignInScreen from "./screens/SignInScreen";
import { store } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setPokemons } from "./slices/pokemonsSlice";
import PokemonDetailsScreen from "./screens/PokemonDetailsScreen";
import MySpaceScreen from "./screens/MySpaceScreen";
import { pokemons as pokemonsData } from "./pokemonsDataModify";
import { getPokemonsData, setPokemonsData } from "./slices/pokemonsDataSlice";

const client = axios.create({ baseURL: "https://pogoapi.net/" });

function AppWrapper() {
  const Stack = createNativeStackNavigator();

  const dispatch = useDispatch();
  const urls = [
    "/api/v1/pokemon_names.json",
    "/api/v1/pokemon_types.json",
    "/api/v1/pokemon_evolutions.json",
  ];

  useMemo(() => {
    (async () => {
      await Promise.all(
        urls.map((url) =>
          client.get(url).then((res) => {
            dispatch(setPokemonsData(res.data));
            !Array.isArray(res.data) &&
              dispatch(
                setPokemons(
                  pokemonsData.map((pokemon, index) => ({
                    ...pokemon,
                    name: res.data[index + 1].name,
                  }))
                )
              );
          })
        )
      );
    })();
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
