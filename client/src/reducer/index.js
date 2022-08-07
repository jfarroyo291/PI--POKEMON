import {
  //CREATE_POKEMON,
  GET_POKEMONS,
  GET_TYPES,
  GET_POKEMON_NAME,
  GET_DETAILS,
  FILTER_CREATED,
  FILTER_TYPE,
  FILTER_ORD_NAME,
  FILTER_ORD_ATTACK,
  CLEAR,
  CLEAR_DETAILS,
  GET_ONE_POKEMON
} from '../actions/index';

const initialState = {
  pokemons: [],
  pokemonsCopy: [],
  types: [],
  details: []
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    /* case CREATE_POKEMON:
      return {
        ...state,
      }; */

    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsCopy: action.payload
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case GET_POKEMON_NAME:
      return {
        ...state,
        pokemons: action.payload,
      };

    case GET_ONE_POKEMON:
      if(state.pokemons.length === 1) {
        state.pokemons = state.pokemonsCopy
      }
      return {
        ...state,
        pokemons: state.pokemons
      }

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload
      };

    case CLEAR:
      return {
        ...state,
        pokemons: action.payload
      };

    case CLEAR_DETAILS:
      return {
        ...state,
        details: action.payload
      }

    case FILTER_CREATED:
      let copyPokemonsFC = state.pokemonsCopy;
      let filterCreated = action.payload === 'created' ?
        copyPokemonsFC?.filter((e) => { return (e.createdDB)}) :
        copyPokemonsFC.filter((e) => { return (!e.createdDB)});
        if(filterCreated.length === 0) {
          filterCreated = copyPokemonsFC;
          alert('No Pokemons created!!');
        }
      return {
        ...state,
        pokemons: action.payload === 'all' ? state.pokemonsCopy : filterCreated,
      };

    case FILTER_TYPE:
      let copyPokemonsFP = state.pokemonsCopy;
      let filterType = action.payload === 'all' ?
      copyPokemonsFP : copyPokemonsFP?.filter(t => t.types.some(t => t.name === action.payload));
      if(filterType.length <= 0) {
        filterType = copyPokemonsFP;
        alert('There are no pokemons in the type written!');
      }
      return {
        ...state,
        pokemons: filterType,
      };

    case FILTER_ORD_NAME:
      let copyPokemonsON = state.pokemons;
      if(action.payload === 'Alphabetically') {
        copyPokemonsON = state.pokemons;
      }
      if(action.payload === 'A - Z') {
        copyPokemonsON.sort((a, b) => {
          if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        });
      }
      if(action.payload === 'Z - A') {
        copyPokemonsON.sort((a, b) => {
          if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          return 0;
        })
      }
      return {
        ...state,
        payload: copyPokemonsON,
      };

    case FILTER_ORD_ATTACK:
      let copyPokemonsOR = state.pokemons;
      if(action.payload === 'Attack') {
        copyPokemonsOR = state.pokemons;
      }
      if(action.payload === 'Asc') {
        copyPokemonsOR.sort((a, b) => {
          if(a.attack > b.attack) return 1;
          if(a.attack < b.attack) return -1;
          return 0;
        });
      }
      if(action.payload === 'Desc') {
        copyPokemonsOR.sort((a, b) => {
          if(a.attack < b.attack) return 1;
          if(a.attack > b.attack) return -1;
          return 0;
        })
      }
      return {
        ...state,
        payload: copyPokemonsOR,
      };

    default:
      return {...state};
  };
};

export default rootReducer;