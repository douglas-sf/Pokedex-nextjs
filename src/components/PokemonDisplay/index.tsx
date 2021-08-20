import { usePagination } from '../../hooks/usePagination';
import { Card } from '../Card';
import { Loading } from '../Loading';

export function PokemonDisplay() {
  const { pokemons } = usePagination();

  if (pokemons.length <= 0) {
    return <Loading />;
  }

  return (
    <main>
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
    </main>
  );
}
