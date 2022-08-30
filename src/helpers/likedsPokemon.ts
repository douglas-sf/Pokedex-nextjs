import { getLocalStorageData, setLocalStorageData } from './localStorage';

const LIKED_POKEMONS_KEY = 'likedPokemons';

export function getLikedPokemonsIds(): number[] {
  const likedPokemons = getLocalStorageData(LIKED_POKEMONS_KEY);

  if (!likedPokemons) return [];

  return likedPokemons;
}

export function setLikedPokemonsIds(ids: number[]) {
  return setLocalStorageData(LIKED_POKEMONS_KEY, ids);
}
