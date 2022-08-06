import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, clear } from '../../actions';
import Nav from '../../components/Nav/Nav';
import Filters from '../../components/Filters/Filters';
import Paginated from '../../components/Paginated/Paginated';
import Cards from '../../components/Cards/Cards';
import Loading from '../../components/Loading/Loading';
import styles from './Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  const [pageCurr, setPageCurr] = useState(1);
  const [pokemonsPage, setPokemonsPage] = useState(12); // eslint-disable-line no-unused-vars
  const [ord, setOrd] = useState(''); //eslint-disable-line no-unused-vars

  const lastPokemons = pageCurr * pokemonsPage;
  const firstPokemons = lastPokemons - pokemonsPage;
  const currPokemons = pokemons?.slice(
    firstPokemons,
    lastPokemons
  );
  //console.log(currPokemons);

  function changePage(page) {
    setPageCurr(page);
  };

  function nextPage() {
    if(lastPokemons < pokemons.length) setPageCurr(pageCurr + 1)
  };

  function prevPage() {
    if(pageCurr > 1) setPageCurr(pageCurr - 1);
  };

  function handlerReset(e) {
    e.preventDefault();
    dispatch(clear(dispatch));
    dispatch(getPokemons());
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {pokemons?.length > 0 ? (
        <div>
          <Nav setPageCurr={setPageCurr}/>
          <div className={styles.paginated}>
            <Paginated
            pokemonsPage={pokemonsPage}
            pokemons={pokemons?.length}
            changePage={changePage}
            nextPage={nextPage}
            prevPage={prevPage}
            />
          </div>
          <div className={styles.home}>
            <div className={styles.cards}>
              <Cards currPokemons={currPokemons} />
            </div>
          </div>
          <div className={styles.filters}>
            <Filters setPageCurr={setPageCurr} setOrd={setOrd} />
            <button className={styles.btn} onClick={(e) => {
              handlerReset(e);
            }}>
              Clear Filters
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};