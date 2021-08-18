import axios, { AxiosRequestConfig } from 'axios';

import { api } from '../services/api';

type Result = {
  name: string;
  url: string;
};

type Data = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
};

type PokemonData = {
  id: number;
  name: string;
  image: string | null;
  types: string[];
};

export async function getPokemonData(url: string, configs: AxiosRequestConfig = {}) {
  const { data } = await api.get(url, { ...configs });

  const { count, results } = data as Data;

  const promises = results.map(async ({ url }) => {
    const { data } = await axios.get(url);

    const { id, name, types: apiTypes, sprites } = data;
    const image = sprites.other['official-artwork'].front_default;
    const types = apiTypes.map(({ type }) => type.name);

    return { id, name, image, types };
  });

  const pokemonList: PokemonData[] = await Promise.all(promises);

  return { count, pokemonList };
}
