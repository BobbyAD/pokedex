import React, { useState, useEffect } from "react";
import { Pokedex } from "pokeapi-js-wrapper";
import PokemonCard from "./PokemonCard";

import styles from "../../styles/allPokemon.module.scss";

const P = new Pokedex();

const AllPokemon = () => {
    // TODO: implement infinite scrolling
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        P.getPokemonsList({
            // the original 150 + Mew
            limit: 20,
            offset: 0,
        }).then((res) => {
            // console.log(res.results);
            setPokemon(res.results);
        });
    }, []);

    const back = () => {

    }

    const forward = () => {

    }

    return (
        <div className={styles.container}>
            {pokemon.map((pokemon) => (
                <PokemonCard pokemon={pokemon} P={P} />
            ))}
            <div className={styles.pagination}>
                <button onClick={back}>Back</button>
                <button onClick={forward}>Forward</button>
            </div>
        </div>
    );
};

export default AllPokemon;
