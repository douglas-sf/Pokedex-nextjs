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

export async function getPokemonData(url: string, configs: AxiosRequestConfig = {}) {
  const { data } = await api.get(url, { ...configs });

  const { count, results } = data as Data;

  const pokemonList = [];

  for (const { url } of results) {
    const { data } = await axios.get(url);

    const { id, name, types: apiTypes, sprites } = data;
    const image = sprites.other['official-artwork'].front_default;
    const types = apiTypes.map(({ type }) => type.name);

    const pokemon = { id, name, image, types };

    pokemonList.push(pokemon);
  }

  return { count, pokemonList };
}
