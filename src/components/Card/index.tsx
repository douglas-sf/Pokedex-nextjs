import Image from 'next/image';

import styles from './Card.module.scss';

type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

type CardProps = {
  pokemon: Pokemon;
};

export function Card({ pokemon }: CardProps) {
  const { id, name, image, types } = pokemon;
  const [firstType] = types;

  return (
    <article className={styles.card}>
      <header>
        <h1>{name}</h1>
        <h2>#{id}</h2>
      </header>
      <div className={`${styles.background} bg-${firstType}`}>
        <Image src={image} alt={name} width={300} height={300} />
      </div>
      <footer>
        {types.map((type, index) => (
          <div key={index} className={`type ${type}`}>
            {type}
          </div>
        ))}
      </footer>
    </article>
  );
}
