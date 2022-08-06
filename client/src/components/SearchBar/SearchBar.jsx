import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getPokemonName, clear } from '../../actions'; // eslint-disable-line no-unused-vars
import styles from './SearchBar.module.css';

export default function SearchBar({setPageCurr}) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handlerChange(e) {
    e.preventDefault();
    setName(e.target.value);
  };

  function handlerSubmit(e) {
    e.preventDefault();
    if(name) {
      dispatch(clear(dispatch));
      dispatch(getPokemonName(name));
      setName('');
      setPageCurr(1);
    } else {
      alert('Writer a Pokemon!')
    }
  };

  return (
    <div className={styles.search}>
      <form action='' onSubmit={(e) => {
        handlerSubmit(e);
      }}>
        <input type="text"
        placeholder="Search pokemon..."
        onChange={(e) => {
          handlerChange(e);
        }}
        value={name}
        className={styles.formSearch}/>
        <button type="submit" className={styles.btn}>
          Search
        </button>
      </form>
    </div>
  );
};