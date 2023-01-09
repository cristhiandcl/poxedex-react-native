import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/photos",
});

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    client.get("?_limit=10").then((response) => {
      console.log(response.data);
      setPokemons(response.data);
    });
  }, []);

  return (
    <View className="w-2/3 space-y-8">
      <Text className="text-center font-extrabold text-2xl text-green-800">
        Pokemons
      </Text>
      {pokemons?.map((pokemon) => (
        <View
          key={pokemon.id}
          className="items-center space-y-2 border p-2 rounded"
        >
          <Text className="text-center">{pokemon.title}</Text>
          <Image
            source={{ uri: pokemon.url }}
            className="h-20 w-20 rounded-full"
          />
        </View>
      ))}
    </View>
  );
};

export default Pokemons;
