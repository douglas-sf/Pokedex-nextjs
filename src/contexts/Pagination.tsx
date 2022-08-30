import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { getPokemons } from '../helpers/getPokemonData';
import { getLikedPokemonsIds, setLikedPokemonsIds } from '../helpers/likedsPokemon';

export type Pokemon = {
  id: number;
  name: string;
  image: string | null;
  types: string[];
};

type PaginationContextData = {
  pokemons: Pokemon[];
  count: number;
  limit: number;
  currentPage: number;
  maxPages: number;
  likedPokemons: number[];
  changePage: (page: number) => Promise<void>;
  toggleLikedPokemon: (pokemonId: number) => void;
};

type PaginationProviderProps = {
  children: ReactNode;
  pokemonList: Pokemon[];
  registers: number;
  page: number;
};

export const PaginationContext = createContext({} as PaginationContextData);

export function PaginationProvider({ children, pokemonList, registers, page }: PaginationProviderProps) {
  const router = useRouter();

  const [pokemons, setPokemons] = useState(pokemonList);
  const [count, setCount] = useState(registers);
  const [limit, setLimit] = useState(8);
  const [currentPage, setCurrentPage] = useState(page);
  const [likedPokemons, setLikedPokemons] = useState<number[]>([]);

  const maxPages = Math.ceil(count / limit);

  async function changePage(page: number) {
    setPokemons([]);
    setCurrentPage(page);
    await router.push(`/?page=${page}`);
  }

  function toggleLikedPokemon(pokemonId: number) {
    const pokemonIsLiked = likedPokemons.some((id) => pokemonId === id);

    const newPokemonLikedList = pokemonIsLiked
      ? [...likedPokemons].filter((id) => id !== pokemonId)
      : [...likedPokemons, pokemonId];

    const sortedList = newPokemonLikedList.sort((a, b) => a - b);

    setLikedPokemonsIds(sortedList);
    setLikedPokemons(sortedList);
  }

  useEffect(() => {
    getPokemons(currentPage, limit).then(({ count, pokemonList }) => {
      setPokemons(pokemonList);
      setCount(count);
    });
  }, [currentPage, limit]);

  useEffect(() => {
    const likedPokemonsList = getLikedPokemonsIds();
    setLikedPokemons(likedPokemonsList);
  }, []);

  return (
    <PaginationContext.Provider
      value={{ pokemons, count, limit, currentPage, maxPages, likedPokemons, changePage, toggleLikedPokemon }}
    >
      {children}
    </PaginationContext.Provider>
  );
}
