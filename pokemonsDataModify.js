import { pokemonsData } from "./pokemonsData";

const names = [
  "deoxys-normal",
  "wormadam-plant",
  "giratina-altered",
  "shaymin-land",
  "basculin-red-striped",
  "darmanitan-standard",
  "tornadus-incarnate",
  "thundurus-incarnate",
  "landorus-incarnate",
  "keldeo-ordinary",
  "meloetta-aria",
  "meowstic-male",
  "aegislash-shield",
  "pumpkaboo-average",
  "gourgeist-average",
  "oricorio-baile",
  "lycanroc-midday",
  "wishiwashi-solo",
  "minior-red-meteor",
  "mimikyu-disguised",
  "toxtricity-amped",
  "eiscue-ice",
  "indeedee-male",
  "morpeko-full-belly",
  "urshifu-single-strike",
  "basculegion-male",
  "enamorus-incarnate",
];

const pokemons = pokemonsData.map((pokemon) => ({
  ...pokemon,
  isSaved: false,
  name: names.includes(pokemon.name)
    ? pokemon.name.split("-")[0]
    : pokemon.name,
}));

export { pokemons };
