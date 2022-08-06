const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getPokemons,
  getPokemonID,
  postPokemon,
  deletePokemon
} = require('../controllers/pokemonController');
const { getType } = require('../controllers/typeController');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/types', getType);
router.get('/pokemons', getPokemons);
router.get('/pokemons/:id', getPokemonID);
router.post('/pokemons', postPokemon);
router.delete('/delete/:id', deletePokemon);

module.exports = router;
