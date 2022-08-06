import React from "react";
import styles from './Paginated.module.css';

export default function Paginated({ firstPokemons, lastPokemons, pokemonsPage, pokemons, changePage, prevPage, nextPage }) {
  const pageNum = [];
  for(let i = 1; i <= Math.ceil(pokemons/pokemonsPage); i++) {
    pageNum.push(i);
  }

  return (
    <nav>
      <ul className={styles.list}>
        <div className={styles.pages}>
          <button className={styles.btn} onClick={prevPage} /* disabled={firstPokemons === 0 ? true : false} */>&laquo;</button>
        </div>
        {pageNum?.map((num) => (
          <li className={styles.items} key={num}>
            <button className={styles.btn} onClick={ () => changePage(num) }>
              {num}
            </button>
          </li>
        ))}
        <div className={styles.pages}>
          <button className={styles.btn} onClick={nextPage} /* disabled={lastPokemons + 1 > pokemons.length ? true : false} */>&raquo;</button>
        </div>
      </ul>
    </nav>
  );
};