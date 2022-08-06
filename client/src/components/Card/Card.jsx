import React from "react";
import { Link } from 'react-router-dom';
import noImage from '../../images/broken.png';
import styles from './Card.module.css';

export default function Card({name, image, types, id, createdDB}) {
  return (
    <div className={styles.containerCard}>
      <div className={styles.card}>
        <div className={styles.nameContainer}>
            <h2 className={styles.name}>{name?.toUpperCase()}</h2>
        </div>
        <Link to={`/pokemon/${id}`}>
          <img className={styles.img}
          src={/(https?:\/\/.*\.(?:png|jpg|svg))/i.test(image) ? image : noImage}
          alt={name} width='150px' height='150px' />
        </Link>
        <div className={styles.types}> <div className={styles.ty}>TYPES:</div>
          {!createdDB ? (
            <div>
            {types?.map((a, b) => {
                return (
                  <div className={styles.typesContainer} key={`${b}g`}>
                    <img className={styles.typesImg} src={a.imgType} alt='X' />
                    <p className={styles.text}>{a.name.charAt(0).toUpperCase() + a.name.slice(1)}</p>
                  </div>)
            })}
            </div>
          ) : (
            <div>
              {types?.map((a, b) => {
                return (
                  <div className={styles.typesContainer} key={`${b}g1`}>
                    <img className={styles.typesImg} src={a.imgType} alt='X' />
                    <p className={styles.text}>{a.name.charAt(0).toUpperCase() + a.name.slice(1)}</p>
                  </div>)
              })}
            </div>
          )
          }
        </div>
      </div>
    </div>
  );
};