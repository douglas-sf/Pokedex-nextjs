import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import { NavMenu } from '../components/NavMenu';

import { PaginationProvider, Pokemon } from '../contexts/Pagination';

import { getPokemons } from '../helpers/getPokemonData';

import { usePagination } from '../hooks/usePagination';

import styles from '../styles/Home.module.scss';

type HomeProps = {
  pokemonList: Pokemon[];
  registers: number;
};

const limit = 8;

export default function Home({ pokemonList, registers }: HomeProps) {
  const router = useRouter();
  const { pokemons } = usePagination();

  const { page } = router.query;
  const pageNumber = page ? Number(page) : 1;

  return (
    <PaginationProvider pokemonList={pokemonList} registers={registers} page={pageNumber}>
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

        <NavMenu buttons={5} />
      </div>
    </PaginationProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page } = context.query;

  const pageNumber = page ? Number(page) : 1;

  const { count: registers, pokemonList } = await getPokemons(pageNumber, limit);

  return {
    props: {
      pokemonList,
      registers,
    },
  };
};
