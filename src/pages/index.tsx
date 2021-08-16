import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { Card } from '../components/Card';
import { NavMenu } from '../components/NavMenu';

import { getPokemonData } from '../helpers/getPokemonData';

import styles from '../styles/Home.module.scss';

type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

type HomeProps = {
  pokemonList: Pokemon[];
  count: number;
  next: string | null;
  previous: string | null;
};

export default function Home({ pokemonList, count, next, previous }: HomeProps) {
  const [pokemons, setPokemons] = useState(pokemonList);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const navMenuProps = { currentPage, setCurrentPage, count, buttons: 9, limit };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokédex</title>
      </Head>

      <h1>Pokédex</h1>

      <main>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </main>

      <NavMenu {...navMenuProps} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { count, next, pokemonList, previous } = await getPokemonData('/pokemon', { params: { limit: 8 } });

  return {
    props: {
      pokemonList,
      count,
      next,
      previous,
    },
  };
};
