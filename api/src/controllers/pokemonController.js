require('dotenv').config();
const axios = require('axios');
const { v4:uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const { Pokemon, Type } = require('../db');
const URL = 'https://pokeapi.co/api/v2/';
const URL_P = `${URL}pokemon`;

/**
 * It gets all the pokemons from the database and from the pokeapi, and if there's a name in the query,
 * it searches for that pokemon in the database and if it doesn't find it, it searches for it in the
 * pokeapi.
 * @param req - the request object
 * @param res - the response object
 * @param next - A function to call when the middleware is complete.
 * @returns An array of objects.
 */
const getPokemons = async (req, res, next) => {
  let pokemonsPages = [];
  let pokemonProps = [];
  const { name } = req.query;
  //SI EXISTE UN NAME EN EL SEARCH
  if(name) {
    try {
      //BUSCAMOS EN LA BD pokemons
      let pokemonFound = await Pokemon.findOne({
        where: {
          name: { [Op.iLike]: `%${name}` },
        },
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      if(pokemonFound) {
        let pokemonNameDB = {
          id: pokemonFound.id,
          name: pokemonFound.name,
          hp: pokemonFound.hp,
          attack: pokemonFound.attack,
          defense: pokemonFound.defense,
          speed: pokemonFound.speed,
          height: pokemonFound.height,
          weight: pokemonFound.weight,
          image: pokemonFound.image,
          types: pokemonFound.types.map(t => {
            return ({
              name: t.name,
              imgType: `https://typedex.app/images/ui/types/dark/${t.name}.svg`
            });
          }),
        }
        return res.status(200).send([pokemonNameDB]);
      } else {
        //BUSCAMOS EN LA POKEAPI
        const pokemonNameAPI = await axios.get(`${URL_P}/${name.toLowerCase().trim()}`);
        if(pokemonNameAPI) {
          pokemonFound = {
            id: pokemonNameAPI.data.id,
            name: pokemonNameAPI.data.name,
            hp: pokemonNameAPI.data.stats[0].base_stat,
            attack: pokemonNameAPI.data.stats[1].base_stat,
            defense: pokemonNameAPI.data.stats[2].base_stat,
            speed: pokemonNameAPI.data.stats[5].base_stat,
            height: pokemonNameAPI.data.height,
            weight: pokemonNameAPI.data.weight,
            image: pokemonNameAPI.data.sprites.other.dream_world.front_default,
          }
          let types = pokemonNameAPI.data.types.map(t => {
            return ({
              name: t.type.name,
              imgType: `https://typedex.app/images/ui/types/dark/${t.type.name}.svg`
            });
          });
          pokemonFound = {...pokemonFound, types: types}
          return res.status(200).send([pokemonFound])
        };
      };
    } catch {
      //next(error);
      res.status(400).send('SORRY!! Something went wrong in your search');
    }
  } else {
    //SI NO HAY NAME POR QUERY, ARROJA TODOS LOS POKEMONES
    try {
      let pokemonsDB = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      });
      for(let i = 0; i < pokemonsDB.length; i++) {
        pokemonProps.push({
          id: pokemonsDB[i].id,
          name: pokemonsDB[i].name,
          hp: pokemonsDB[i].hp,
          attack: pokemonsDB[i].attack,
          defense: pokemonsDB[i].defense,
          speed: pokemonsDB[i].speed,
          height: pokemonsDB[i].height,
          weight: pokemonsDB[i].weight,
          image: pokemonsDB[i].image,
          createdDB: pokemonsDB[i].createdDB,
          types: pokemonsDB[i].types.map(t => {
            return ({
              name: t.name,
              imgType: `https://typedex.app/images/ui/types/dark/${t.name}.svg`
            });
          }),
        });
      };
      //MUESTRA EN 2 PARTES DE A 20 LOS 40 POKEMONES
      let newURL = `${URL_P}`;
      for(let i = 0; i < 2; i++) {
        const pokemonsAPI = await axios.get(newURL);
        const onePokemon = await pokemonsAPI.data.results.map((p) =>{
          return p.url;
        });
        for(let i = 0; i < onePokemon.length; i++) {
          const url = await axios(onePokemon[i]);
          pokemonsPages.push({
            id: url.data.id,
            name: url.data.name,
            hp: url.data.stats[0].base_stat,
            attack: url.data.stats[1].base_stat,
            defense: url.data.stats[2].base_stat,
            speed: url.data.stats[5].base_stat,
            height: url.data.height,
            weight: url.data.weight,
            image: url.data.sprites.other.home.front_default,
            types: url.data.types.map(t => {
                return ({
                  name: t.type.name,
                  imgType: `https://typedex.app/images/ui/types/dark/${t.type.name}.svg`})})
          });
        };
        newURL = pokemonsAPI.data.next;
      };
      const pokemonsFound = [...pokemonProps, ...pokemonsPages];
      pokemonsFound.length === 0 ? res.status(400).send('Something went wrong') :
      res.status(200).send(pokemonsFound);
    } catch {
      //next(error);
      res.status(400).send('SORRY!! Something went with the data.');
    }
  }
};

/**
 * It's a function that searches for a pokemon by id, if the id is found in the database, it returns
 * the data from the database, if it is not found in the database, it searches for the id in the API
 * and returns the data from the API.
 * </code>
 * @param req - request
 * @param res - the response object
 * @param next - A function to be called to proceed to the next middleware.
 * @returns An array of objects.
 */
const getPokemonID = async (req, res, next) => {
  try {
    const { id } = req.params;
    //BUSCAMOS EN LA BD pokemons CON LA INCLUSIÓN DE QUE SI TIENE EL ID '-' EN SU ESTRUCTURA
    if(id.includes('-')) {
      const getIdDB = await Pokemon.findOne({
          where: {id: id},
          include:[
            {
              model: Type,
              attributes: { exclude: ['pokemons_types'] },
              through: { attributes: [] }
            }
          ],
      });
      return res.status(200).send([getIdDB]);
    }
     //BUSCAMOS EN LA API POKEMOS EL ID
    else {
      const gameSearchIdAPI = (await axios.get(`${URL_P}/${id}`)).data;
      let getIdAPI = {
        id: gameSearchIdAPI.id,
        name: gameSearchIdAPI.name,
        hp: gameSearchIdAPI.stats[0].base_stat,
        attack: gameSearchIdAPI.stats[1].base_stat,
        defense: gameSearchIdAPI.stats[2].base_stat,
        speed: gameSearchIdAPI.stats[5].base_stat,
        height: gameSearchIdAPI.height,
        weight: gameSearchIdAPI.weight,
        image: gameSearchIdAPI.sprites.other.dream_world.front_default,
      }
      let types = gameSearchIdAPI.types.map(t => {
        return ({
          name: t.type.name,
          imgType: `https://typedex.app/images/ui/types/dark/${t.type.name}.svg`
        });
      });
      getIdAPI = {...getIdAPI, types: types};
      return res.status(200).send([getIdAPI]);
    }
  } catch {
    //console.log(error);
    res.status(400).send('SORRY!! Something went with the ID.');
  }
};

/**
 * It creates a new pokemon and adds the type to the pokemon.
 * @param req - request
 * @param res - the response object
 * @param next - a function that you call to pass control to the next matching route.
 * @returns {
 *     "name": "Bulbasaur",
 *     "hp": 45,
 *     "attack": 49,
 *     "defense": 49,
 *     "speed": 45,
 *     "height": 0.7,
 *     "weight": 6.9,
 *     "image": "https://raw.githubusercontent.com/PokeAPI/sprites
 */
const postPokemon = async (req, res, next) => {
  try {
    const {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      types
    } = req.body;
    if(name) {
      let getTypeDB = await Type.findAll({
        where: { name: types },
      });
      const newPokemon = await Pokemon.create({
          name,
          hp,
          attack,
          defense,
          speed,
          height,
          weight,
          image,
        });
      newPokemon.addType(getTypeDB);
      return res.status(200).send(newPokemon);
    }
  } catch {
    //next(error);
    res.status(404).send('SORRY!! Something went wrong in create pokemon.');
  }
};

const deletePokemon = async (req, res, next) => {
  const { id } = req.params;
  try {
    if(id) {
      await Pokemon.destroy({
        where: { id: id }
      });
    }
    res.status(201).send({ message: 'The pokemon was successfully deleted'})
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getPokemons,
  getPokemonID,
  postPokemon,
  deletePokemon
};