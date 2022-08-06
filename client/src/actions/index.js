import axios from 'axios';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const CLEAR = 'CLEAR';
export const CLEAR_DETAILS = 'CLEAR_DETAILS';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
export const FILTER_CREATED = 'FILTER_CREATED';
export const FILTER_ORD_NAME = 'ORD_NAME';
export const FILTER_TYPE = 'FILTER_TYPE';
export const FILTER_ORD_ATTACK = 'ORD_ATTACK';
export const GET_DETAILS = 'GET_DETAILS';
export const GET_POKEMON_DB = 'GET_POKEMON_DB';

/* export function createPokemon(payload) {
  return async () => {
    const pokemonCreated = await axios.post('http://localhost:3001/pokemons', payload);
    return pokemonCreated
  };
}; */

export function getPokemons() {
  return async (dispatch) => {
    //try {
      await fetch('http://localhost:3001/pokemons')
      .then(res => res.json())
      .then(pokemons => {
        return dispatch ({
          type: GET_POKEMONS,
          payload:pokemons
        })
      })
      .catch((err) => { console.log(err) })
      /* return dispatch({
        type: GET_POKEMONS,
        payload: json.data
      }) */
    /* } catch (error) {
      console.log(error)
    } */
  };
};

/* export function getPokemonsDB() {
  return async (dispatch) => {
    let json = await axios.get('http://localhost:3001/pokemonsdb');
    return dispatch ({
      type: GET_POKEMON_DB,
      payload: json.data
    })
  };
}; */

export function getPokemonName(name) {
  return async (dispatch) => {
    try {
      let json = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
      return dispatch({
        type: GET_POKEMON_NAME,
        payload: json.data
      });
    } catch(error) {
      alert(`Pokemon ${name} not found`);
      window.location.href = 'http://localhost:3000/home';
      console.log(error);
    }
  };
};

export function getTypes() {
  return (dispatch) => {
    axios('http://localhost:3001/types')
    .then((json) => {
      return dispatch ({
        type: GET_TYPES,
        payload: json.data
      })
    })
    .catch((err) => { console.log(err) })
  };
};

export function getDetails(id) {
  return async (dispatch) => {
    try {
      let json = await axios.get(`http://localhost:3001/pokemons/${id}`)
      return dispatch ({
        type: GET_DETAILS,
        payload: json.data
      });
    } catch {
      alert(`The specified id does not exist`);
      //console.log(error);
      window.location.href = `http://localhost:3000/home`;
    }
  };
};

export function clear() {
  return {
    type: CLEAR,
    payload: []
  }
};

export function clearDetails() {
  return (dispatch) => {
    return dispatch ({
      type: CLEAR_DETAILS,
      payload: []
    })
  }
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

export function filterType(payload) {
  return {
    type: FILTER_TYPE,
    payload,
  };
};

export function filterOrdName(payload) {
  return {
    type: FILTER_ORD_NAME,
    payload,
  };
};

export function filterOrdAttack(payload) {
  return {
    type: FILTER_ORD_ATTACK,
    payload,
  };
};