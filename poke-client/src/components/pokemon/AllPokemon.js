import React, { useState, useEffect } from "react";
import { Pokedex } from "pokeapi-js-wrapper";
import PokemonCard from "./PokemonCard";
import Filter from "../filter/Filter";

import styles from "../../styles/allPokemon.module.scss";

const P = new Pokedex();

const AllPokemon = () => {
    // TODO: implement infinite scrolling
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [forwardDisabled, setForwardDisabled] = useState(false);
    const [backDisabled, setBackDisabled] = useState(true);

    const [newCollection, setNewCollection] = useState([]);

    useEffect(() => {
        resetList();
    }, []);

    const resetList = () => {
        P.getPokemonsList({
            // the original 150 + Mew
            limit: 20,
            offset: 0,
        })
            .then((res) => {
                setPokemon(res.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const back = () => {
        if (offset > 0) {
            P.getPokemonsList({
                limit: 20,
                offset: offset - 20,
            })
                .then((res) => {
                    setPokemon(res.results);
                })
                .catch((err) => {
                    console.log(err);
                });
            setOffset(offset - 20);
            if (offset === 1050) {
                setForwardDisabled(false);
            }
            if (offset === 20) {
                setBackDisabled(true);
            }
        }
    };

    const forward = () => {
        if (offset < 1030) {
            P.getPokemonsList({
                limit: 20,
                offset: offset + 20,
            })
                .then((res) => {
                    setPokemon(res.results);
                })
                .catch((err) => {
                    console.log(err);
                });
            setOffset(offset + 20);
            if (offset === 1030) {
                setForwardDisabled(true);
            }
            if (offset === 0) {
                setBackDisabled(false);
            }
        }
    };

    return (
        <div className={styles.container}>
            <Filter P={P} setPokemon={setPokemon} resetList={resetList}/>
            {pokemon.map((pokemon) => (
                <PokemonCard pokemon={pokemon} P={P} />
            ))}
            <div className={styles.pagination}>
                <button onClick={back} disabled={backDisabled}>
                    Back
                </button>
                <button onClick={forward} disabled={forwardDisabled}>
                    Forward
                </button>
            </div>
        </div>
    );
};

export default AllPokemon;
