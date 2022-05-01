import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { getPokemons } from '../helpers/getPokemonData';

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
  changePage(page: number): Promise<void>;
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

  const maxPages = Math.ceil(count / limit);

  async function changePage(page: number) {
    setPokemons([]);
    setCurrentPage(page);
    await router.push(`/?page=${page}`);
  }

  useEffect(() => {
    getPokemons(currentPage, limit).then(({ count, pokemonList }) => {
      setPokemons(pokemonList);
      setCount(count);
    });
  }, [currentPage, limit]);

  return (
    <PaginationContext.Provider value={{ pokemons, count, limit, currentPage, maxPages, changePage }}>
      {children}
    </PaginationContext.Provider>
  );
}
