import Image from 'next/image';

import styles from './Card.module.scss';

type Pokemon = {
  id: number;
  name: string;
  image?: string;
  types: string[];
};

type CardProps = {
  pokemon: Pokemon;
};

export function Card({ pokemon }: CardProps) {
  const { id, name, image, types } = pokemon;
  const [firstType] = types;

  const resultName = name.replace(/\-(female|male|f|m)$/, (substring, gender) => {
    if (gender === 'f' || gender === 'female') return ' \u2640';
    if (gender === 'm' || gender === 'male') return ' \u2642';
  });

  return (
    <article className={styles.card}>
      <header>
        <h1>{resultName}</h1>
        <h2>#{id}</h2>
      </header>
      <div className={`${styles.background} bg-${firstType}`}>
        {image && <Image src={image} alt={name} width={900} height={900} />}
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
