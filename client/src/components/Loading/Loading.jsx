import React from "react";
import pokeGif from '../../images/pokemon-pokeball.gif';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <img className={styles.preloader} src={pokeGif} alt='Gif'/>
      <div className={styles.fontLoader}>Loading...</div>
    </div>
  )
}