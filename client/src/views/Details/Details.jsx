import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetails, clearDetails } from '../../actions';
import styles from './Details.module.css';
import noImage from '../../images/broken.png';
import Loading from '../../components/Loading/Loading';

export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const pokemonSelect = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetails(id))
    return () => dispatch(clearDetails())
  }, [dispatch, id]);

  return (
    <div>
      { pokemonSelect.length > 0 ?
      <div className={styles.container}>
        <div className={styles.containerDetails}>
          <div className={styles.containerHome}>
            <div className={styles.home}>
              <Link to='/home' className={styles.exit}>
                <span className={styles.exit}>Go Home</span>
              </Link>
            </div>
          </div>
          <div className={styles.imageTitle}>
            <img className={styles.image}
            src={/(https?:\/\/.*\.(?:png|jpg|svg))/i.test(pokemonSelect[0].image) ?
            pokemonSelect[0].image : noImage}
            alt="Img Not Found"
            />
            <h1 className={styles.title}>{pokemonSelect[0].name}</h1>
          </div>
          <div>
            <h3 className={styles.subtitles}>Statistics</h3>
            <div className={styles.statsContainer}>
              <div className={styles.statFlex}>
                <span className={styles.value}>{pokemonSelect[0].hp}</span>
                <h5 className={styles.stat}>Hp</h5>
              </div>
              <div className={styles.statFlex}>
                <span className={styles.value}>{pokemonSelect[0].attack}</span>
                <h5 className={styles.stat}>Attack</h5>
              </div>
              <div className={styles.statFlex}>
                <span className={styles.value}>{pokemonSelect[0].defense}</span>
                <h5 className={styles.stat}>Defense</h5>
              </div>
              <div className={styles.statFlex}>
                <span className={styles.value}>{pokemonSelect[0].speed}</span>
                <h5 className={styles.stat}>Speed</h5>
              </div>
            </div>
            <h3 className={styles.subtitles}>Dimensions</h3>
            <div className={styles.dimensionContainer}>
              <div>
                <span className={styles.value}>{pokemonSelect[0].height} m</span>
                <h5 className={styles.stat}>Height</h5>
              </div>
              <div>
                <span className={styles.value}>{pokemonSelect[0].weight} kg</span>
                <h5 className={styles.stat}>Weight</h5>
              </div>
            </div>
            <h3 className={styles.subtitles}>Types</h3>
            {!pokemonSelect[0].createdDB ? (
              <div className={styles.typesContainer}>
                {pokemonSelect[0].types?.map((type, i) => {
                  return (
                    <div key={`${i}t`}>
                      <p className={styles.value}>{type.name}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.typesContainer}>
                {pokemonSelect[0].types?.map((type, i) => {
                  return (
                    <div key={`${i}t1`}>
                      <p className={styles.value}>{type.name}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div> : <div>
          <Loading />
      </div>}
    </div>
  );
};