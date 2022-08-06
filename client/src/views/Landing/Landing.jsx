import { React } from 'react';
import { Link } from 'react-router-dom';
import pokeball from '../../images/Landing/pokeball.svg';
import Ash from '../../images/Landing/Ash2.png';
import styles from './Landing.module.css';

export default function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.h2}>
        <h2>Welcome to Poke - API</h2>
      </div>
      <div className={styles.p}>
        <p>Click in PokeBall</p>
      </div>
      <div className={styles.link}>
        <Link to = "/home">
          <img className={styles.bola} src={pokeball} alt="Not Found"/>
        </Link>
      </div>
      <div className={styles.ash}>
        <img src={Ash} alt="Not Found"/>
      </div>
    </div>
  );
};
