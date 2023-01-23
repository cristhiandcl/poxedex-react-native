import { View } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import Pokemon from "./Pokemon";
import { getPokemon } from "../slices/filterPokemonSlice";

// const client = axios.create({
//   baseURL: "",
// });

const Pokemons = ({ renderFullPokemons }) => {
  const filteredPokemon = useSelector(getPokemon);

  return (
    <View>
      <View
        className={`flex-col items-center justify-center mt-20 ${
          filteredPokemon.length > 0 ? "blocked" : "hidden"
        }`}
      >
        {filteredPokemon?.map((pokemon) => (
          <Pokemon pokemon={pokemon} key={pokemon.id} />
        ))}
      </View>
      <View
        className={`items-center justify-between px-4 flex-row flex-wrap ${
          filteredPokemon.length > 0 ? "hidden" : "block"
        }`}
      >
        {renderFullPokemons}
      </View>
    </View>
  );
};

export default Pokemons;
