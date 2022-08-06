import React from "react";
import { Link } from 'react-router-dom';
import pokeApp from '../../images/pokeApp.png';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Nav.module.css';

export default function Nav({setPageCurr}) {
  return (
    <header>
      <nav className={styles.nav}>
        <img className={styles.img} src={pokeApp} alt="pokeApp" />
        <div className={styles.search}>
          <SearchBar setPageCurr={setPageCurr} />
        </div>
        <div className={styles.create}>
          <Link to='/create'>
            <button className={styles.btn}>
              Insert Pokemon
            </button>
          </Link>
        </div>
      </nav>
    </header>
  )
}