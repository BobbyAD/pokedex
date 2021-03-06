// TODO: implement infinite scrolling
import React, { useState, useEffect, useContext } from "react";
import { Pokedex } from "pokeapi-js-wrapper";
import PokemonCard from "./PokemonCard";
import Filter from "../filter/Filter";

import { createCollection, getCollections } from "../../auth/authorization";
import { Context } from "../../context/Context";

import styles from "../../styles/allPokemon.module.scss";

const P = new Pokedex();

const AllPokemon = () => {
    const [context, dispatch] = useContext(Context);
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [forwardDisabled, setForwardDisabled] = useState(false);
    const [backDisabled, setBackDisabled] = useState(true);

    const [picking, setPicking] = useState(false);
    const [filtering, setFiltering] = useState(false);

    const [newCollection, setNewCollection] = useState({});

    useEffect(() => {
        resetList();
    }, []);

    useEffect(() => {
        console.log(picking);
    }, [picking]);

    const addPokemon = (newPokemon) => {
        setNewCollection({...newCollection, [newPokemon.name]: newPokemon.url})
    };

    const removePokemon = (name) => {
        let updatedCollection = {...newCollection}
        delete updatedCollection[name];
        setNewCollection(updatedCollection);
    }

    const togglePicking = () => {
        setPicking(!picking);
    };

    const toggleFiltering = () => {
        setFiltering(!filtering);
    }

    const submitCollection = (name) => {
        let formattedCollection = [];

        for (let k of Object.keys(newCollection)) {
            formattedCollection.push({
                name: k,
                url: newCollection[k]
            })
        }

        const data = {
            collection: {
                name: name,
                pokemon: formattedCollection,
            },
        };

        createCollection(data).then((col) => {
            setNewCollection({});
            getCollections().then((collections) => {
                console.log(collections);
                dispatch({
                    type: "GET_COLLECTIONS",
                    payload: collections,
                });
            });
        });

        setPicking(false);
    };

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
        setFiltering(false);
    };

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
            <Filter
                P={P}
                setPokemon={setPokemon}
                togglePicking={togglePicking}
                toggleFiltering={toggleFiltering}
                submitCollection={submitCollection}
                resetList={resetList}
            />
            {pokemon.map((pokemon) => (
                <PokemonCard
                    pokemon={pokemon}
                    P={P}
                    picking={picking}
                    addPokemon={addPokemon}
                    removePokemon={removePokemon}
                    newCollection={newCollection}
                />
            ))}
            {
                filtering ? <></>:
            <div className={styles.pagination}>
                <button onClick={back} disabled={backDisabled}>
                    Back
                </button>
                <button onClick={forward} disabled={forwardDisabled}>
                    Forward
                </button>
            </div>
}
        </div>
    );
};

export default AllPokemon;
