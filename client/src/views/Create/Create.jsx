import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import { getTypes, clear, getPokemons } from '../../actions'; // eslint-disable-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import Ash from '../../images/Landing/Ash2.png';
import styles from './Create.module.css';

export default function Create() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);
  const [errors, setErrors] = useState({});
  const history = useHistory(); // eslint-disable-line no-unused-vars

  const [input, setInput] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    image: '',
    types: [],
  });

  let noEmpty = /\S+/;
  let validateName = /^[a-z]+$/i;
  let validateNum = /^\d+$/;
  let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
  let rangeScore = /^([1-9]|([1-9][0-9]))$/;
  let rangeWeight = /^\d{1,4}(\.\d{3})*(,\d{1,2})?$/;
  let rangeHeight = /^\d{1,3}(\.\d{3})*(,\d{1,2})?$/;

  function validate(input) {
    let errors = {};
    if (!noEmpty.test(input.name) || !validateName.test(input.name) || input.name.length < 3) {
    errors.name = "Name required. Requires name of 3 characters or more";
    }
    if (!validateNum.test(input.hp) || !rangeScore.test(input.hp)) {
        errors.hp = "Number required. Hp required between 1 and 99";
    }
    if (!validateNum.test(input.attack) || !rangeScore.test(input.attack)) {
        errors.attack = "Number required. Attack required between 1 and 99";
    }
    if (!validateNum.test(input.defense) || !rangeScore.test(input.defense)) {
        errors.defense = "Number required. Defense required between 1 and 99";
    }
    if (!validateNum.test(input.speed) || !rangeScore.test(input.speed)) {
        errors.speed = "Number required. Speed required between 1 and 99";
    }
    if (!rangeHeight.test(input.height)) {
        errors.height = "Number required. Height required between 1 and 999,99";
    }
    if (!rangeWeight.test(input.weight)) {
        errors.weight = "Number required. Weight required between 1 and 9999,99";
    }
    if (!validateUrl.test(input.image)) {
    errors.image = "URL required";
    }

    return errors;
  };

  function handlerChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function handlerSelectType(e) {
    if(input.types.includes(e.target.value)) {
      alert('Type exists already')
    } else {
      if(input.types.length < 2) {
        setInput({
          ...input,
          types: [...input.types, e.target.value],
        });
        e.target.value = 'Select type';
      } else {
        alert('You cannot change more than two pokemon types.')
      }
    }
  };

  function handlerDelete(e) {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== e)
    });
  };

  function handlerReset(e) {
    e.preventDefault();
    if(pokemons.length === 1) {
      dispatch(clear(dispatch));
    }
    history.push("/home");
  };

  async function handlerSubmit(e) {
    e.preventDefault();
    let exists = pokemons?.filter(p => p.name === input.name)
    if(
      errors.name ||
      errors.hp ||
      errors.attack ||
      errors.defense ||
      errors.speed ||
      errors.height ||
      errors.weight ||
      errors.image
    ) {
      alert('An error was found. Verify the form!');
    }
    else if(input.name.length === 0) {
      alert('Cannot create pokemon without name')
    }
    else if(exists[0]) {
      alert('Pokemon already exists')
    }
    else if(input.types.length === 0) {
        alert('Cannot create pokemon without types')
      }
    else {
      await axios.post('http://localhost:3001/pokemons', input);
      setInput({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        types: [],
      });
      dispatch(clear(dispatch));
      history.push("/home");
      //alert('Se creo el pokemon');
      //window.location.href = `http://localhost:3000/home`;
    }
  };

  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={(e) => handlerSubmit(e)} className={styles.form}>
          <h1 className={styles.title}>Create Pokemon</h1>

          <label className={styles.label}>Name</label>
          {errors.name&&<span className={styles.spanError}>{errors.name}</span>}
          <input className={errors.name ?
            styles.danger : styles.input}
            type='text' name='name'
            value={input.name} placeholder='ej: Bulbasaur'
            onChange={(e) => handlerChange(e)}/>

          <label className={styles.label}>Life score</label>
          {errors.hp&&<span className={styles.spanError}>{errors.hp}</span>}
          <input className={errors.hp ?
            styles.danger : styles.input}
            type='text' name='hp'
            value={input.hp} placeholder='ej: 42'
            onChange={(e) => handlerChange(e)}/>

          <label className={styles.label}>Attack score</label>
          {errors.attack&&<span className={styles.spanError}>{errors.attack}</span>}
          <input className={errors.attack ?
            styles.danger : styles.input}
            type='text' name='attack'
            value={input.attack} placeholder='ej: 42'
            onChange={(e) => handlerChange(e)}/>

          <label className={styles.label}>Defense score</label>
          {errors.defense&&<span className={styles.spanError}>{errors.defense}</span>}
          <input className={errors.defense ?
            styles.danger : styles.input}
            type='text' name='defense'
            value={input.defense} placeholder='ej: 42'
            onChange={(e) => handlerChange(e)}/>

          <label className={styles.label}>Speed score</label>
          {errors.speed&&<span className={styles.spanError}>{errors.speed}</span>}
          <input className={errors.speed ?
            styles.danger : styles.input}
            type='text' name='speed'
            value={input.speed} placeholder='ej: 42'
            onChange={(e) => handlerChange(e)}/>

          <label className={styles.label}>Height score</label>
          {errors.height&&<span className={styles.spanError}>{errors.height}</span>}
          <input className={errors.height ?
            styles.danger : styles.input}
            type='text' name='height'
            value={input.height} placeholder='ej: 1,15'
            onChange={(e) => handlerChange(e)}/>

          <label className={styles.label}>Weight score</label>
          {errors.weight&&<span className={styles.spanError}>{errors.weight}</span>}
          <input className={errors.weight ?
            styles.danger : styles.input}
            type='text' name='weight'
            value={input.weight} placeholder='ej: 35,3'
            onChange={(e) => handlerChange(e)}/>

          <label className={styles.label}>URL Image</label>
          {errors.image&&<span className={styles.spanError}>{errors.image}</span>}
          <input className={errors.image ?
            styles.danger : styles.input}
            type='text' name='image'
            value={input.image} placeholder='ej: http://www.imagen.com'
            onChange={(e) => handlerChange(e)}/>

          <label className={styles.label}>Type</label>
          <select className={errors.types?
            styles.dangerSelect : styles.inputSelect}
            name='types' id='types'
            onChange={(e) => handlerSelectType(e)}>
              <option default value={true}>Select type</option>
            {types?.map((type) => <option value={type.name} key={type.id}>{type.name}</option>)}
          </select>

          <div className={input.types.length? styles.typeSelected : styles.hidden}>
            {input.types?.map((e, i) => {
              return (
                <div className={styles.type} key={i}>
                  <div className={styles.pType}>{e}</div>
                  <button className={styles.btnDelete} onClick={() => {
                    handlerDelete(e);
                  }}>
                    X
                  </button>
                </div>)})}
          </div>
          <div className={styles.footer}>
            <button type='submit' className={styles.crearPokemon}>Create</button>
            <button className={styles.home} value='home' onClick={(e) => {
              handlerReset(e);
            }}>
              Home
            </button>
          </div>
        </form>
      </div>
      <div className={styles.imgAsh}>
        <img className={styles.ash} src={Ash} alt="Not Found"/>
      </div>
    </div>
  );
};