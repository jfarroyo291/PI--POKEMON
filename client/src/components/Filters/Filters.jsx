import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  filterCreated,
  filterOrdName,
  filterType,
  filterOrdAttack
} from '../../actions';
import styles from './Filters.module.css';

export default function Filters({ setPageCurr, setOrd }) {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handlerFilterCreate(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setPageCurr(1);
  };

  function handlerFilterOrdAlph(e) {
    e.preventDefault();
    dispatch(filterOrdName(e.target.value));
    setPageCurr(1);
    setOrd(e.target.value);
  };

  function handlerFilterTypes(e) {
    e.preventDefault();
    dispatch(filterType(e.target.value));
    setPageCurr(1);
  };

  function handlerFilterOrdAttack(e) {
    e.preventDefault();
    dispatch(filterOrdAttack(e.target.value));
    setPageCurr(1);
    setOrd(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cat}>
        <h4 className={styles.h4}>Filters</h4>
        <div className={styles.label}>
          <label>
            Created - API
          </label>
        </div>
        <select className={styles.select} onChange={(e) =>{
          handlerFilterCreate(e);
        }}>
          <option value='all'>ALL</option>
          <option value='api'>API</option>
          <option value='created'>CREATED</option>
        </select>
        <div className={styles.label}>
          <label>
            Types
          </label>
        </div>
        <select className={styles.select} onChange={(e) =>{
          handlerFilterTypes(e);
        }}>
          <option value='all'>ALL</option>
          {types?.map((e) => {
            return (
              <option key={e.id} value={e.name}>
                {e.name.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <h4 className={styles.h4}>Order By</h4>
        <select onChange={(e) =>{
          handlerFilterOrdAttack(e);
        }} className={styles.select}>
          <option className={styles.order}>Attack</option>
          <option value='Asc'>ASC</option>
          <option value='Desc'>DESC</option>
        </select>

        <select onChange={(e) =>{
          handlerFilterOrdAlph(e);
        }} className={styles.select}>
          <option className={styles.order}>Alphabetically</option>
          <option value='A - Z'>A - Z</option>
          <option value='Z - A'>Z - A</option>
        </select>
      </div>
    </div>
  );
}