import React, { useState, useEffect } from "react";
import { Pokedex } from "pokeapi-js-wrapper";
import PokemonCard from "./PokemonCard";

const P = new Pokedex();

const AllPokemon = () => {
    // TODO: implement infinite scrolling
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        P.getPokemonsList({
            // the original 150 + Mew
            limit: 151,
            offset: 0,
        }).then((res) => {
            // console.log(res.results);
            setPokemon(res.results);
        });
    }, []);

    return (
        <div>
            {
                pokemon.map((pokemon) => {
                    return <PokemonCard pokemon={pokemon} P={P} />
                })
            }
        </div>
    );
};

export default AllPokemon;
