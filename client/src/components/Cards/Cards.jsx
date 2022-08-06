import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';

export default function Cards({currPokemons}) {
  return (
    <div className={styles.container}>
      {currPokemons?.map((pokemon, b) => {
        return (
          <div key={b}>
            <Card
              id={pokemon.id}
              image={pokemon.image}
              name={pokemon.name}
              types={pokemon.types}
              createdDB={pokemon.createdDB}
            />
          </div>
        )
      })}
    </div>
  )
}