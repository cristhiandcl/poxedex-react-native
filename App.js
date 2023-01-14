import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignInScreen from "./screens/SignInScreen";
import { store } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getPokemons, setPokemons } from "./slices/pokemonsSlice";

const client = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

function AppWrapper() {
  const Stack = createNativeStackNavigator();
  // const [pokemons, setPokemons] = useState([]);
  const dispatch = useDispatch();
  const pokemons = useSelector(getPokemons);
  // const pokemons = useSelector((state) => state.pokemons.value);

  useEffect(() => {
    let tempPokemons = [];
    async function getPokemons() {
      for (let i = 1; i <= 20; i++) {
        const response = await client.get(`pokemon/${i}`);
        tempPokemons.push(response.data);
      }
      // setPokemons([...tempPokemons]);
      dispatch(setPokemons(tempPokemons));
    }
    getPokemons();
  }, []);

  console.log(pokemons);

  return (
    <NavigationContainer>
      {/* <Provider store={store}> */}
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
      {/* </Provider> */}
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
