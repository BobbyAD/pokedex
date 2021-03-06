// testing pokedex-promise-v2 package
// TODO: This will be where I get data from my databases, after restructuring pokeAPI for my app

const router = require("express").Router();

const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

// GET BY NAME
router.get("/name/:name", (req, res) => {
    const name = req.params.name;
    P.getPokemonByName(name)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json({error: err});
        })
})

module.exports = router;