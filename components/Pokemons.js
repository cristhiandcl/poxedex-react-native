import { View } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import Pokemon from "./Pokemon";
import { getPokemon } from "../slices/filterPokemonSlice";
import { getPokemonsData } from "../slices/pokemonsDataSlice";

const Pokemons = ({ renderFullPokemons }) => {
  const filteredPokemon = useSelector(getPokemon);
  const types = useSelector(getPokemonsData).filter(
    (elem) => elem.length === 1175
  )[0];

  const filteredtypes = types?.filter(
    (type, index) => type.pokemon_name !== types[index - 1]?.pokemon_name
  );

  return (
    <View>
      <View
        className={`flex-col items-center justify-center mt-12 ${
          filteredPokemon.length > 0 ? "blocked" : "hidden"
        }`}
      >
        {filteredPokemon?.map((pokemon) => (
          <Pokemon pokemon={pokemon} key={pokemon.id} types={filteredtypes} />
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
