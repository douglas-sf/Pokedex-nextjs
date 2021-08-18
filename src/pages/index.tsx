import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import { NavMenu } from '../components/NavMenu';

import { getPokemonData } from '../helpers/getPokemonData';

import styles from '../styles/Home.module.scss';

type Pokemon = {
  id: number;
  name: string;
  image: string | null;
  types: string[];
};

type HomeProps = {
  pokemonList: Pokemon[];
  count: number;
};

const limit = 8;

export default function Home({ pokemonList, count }: HomeProps) {
  const [pokemons, setPokemons] = useState(pokemonList);
  const [currentPage, setCurrentPage] = useState(1);

  const navMenuProps = { currentPage, setCurrentPage, count, buttons: 5, limit };

  useEffect(() => {
    const offset = (currentPage - 1) * limit;

    setPokemons([]);

    getPokemonData('/pokemon', { params: { limit, offset } }).then((data) => {
      setPokemons(data.pokemonList);
    });
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokédex</title>
      </Head>

      <h1>Pokédex</h1>

      {pokemons.length > 0 ? (
        <main>
          {pokemons.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </main>
      ) : (
        <Loading />
      )}

      <NavMenu {...navMenuProps} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { count, pokemonList } = await getPokemonData('/pokemon', { params: { limit } });

  return {
    props: {
      pokemonList,
      count,
    },
  };
};
