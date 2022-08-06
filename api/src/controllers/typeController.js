require('dotenv').config();
const axios = require('axios');
const fetch = require("node-fetch");
const { Type } = require('../db');
const URL = 'https://pokeapi.co/api/v2/';
const URL_T = `${URL}type`;

/**
 * It fetches data from an API, maps the data, and then uploads it to a database
 * @param req - the request object
 * @param res - the response object
 */
const uploadType = async (req, res) => {
  try {
    const typeAPI = await fetch(URL_T);
    const data = await typeAPI.json();
    const typeName = data.results.map(t => {
      return { name: t.name }
    });
    await Type.bulkCreate(typeName);
    console.log('Los types fueron cargados a la bd!')
  } catch {
    res.status(400).send('Types could not be uploaded to the database.')
  }
};

/* const uploadType = async () => {
  try {
    const typeAPI = await axios(`${URL_T}`);
    const typeName = typeAPI.data.results.map(t => {
      return {
        name: t.name,
      }
    });
    await Type.bulkCreate(typeName);
    console.log('Los types fueron cargados a la bd!')
  } catch {
    res.status(400).send('Types could not be uploaded to the database.')
  }
}; */

/**
 * It takes the data from the API and creates a new table in the database with the data from the API.
 * @param req - request
 * @param res - the response object
 */
const getType = async (req, res) => {
  try {
    const typeAPI = await axios(`${URL_T}`);
    let typeName = await Promise.all(typeAPI.data.results.map(async t => {
      return { name: t.name}
    }));
    typeName.forEach(type => {
      Type.bulkCreate({
        where: { name: type.name },
      })
    });
    const typeTotal = await Type.findAll();
    res.status(200).send(typeTotal);
  } catch {
    res.status(404).send('SORRY!! Something went wrong with the type');
  }
};

module.exports = {
  uploadType,
  getType,
};