import React, { useContext, useEffect, useState } from "react";
import { createCollection } from "../../auth/authorization";
import { Context } from "../../context/Context";
import styles from "../../styles/filter.module.scss";

const Filter = ({ P, setPokemon, resetList }) => {
    const [context, dispatch] = useContext(Context);
    const [showFilter, setShowFilter] = useState(false);
    const [regions, setRegions] = useState([]);
    const [selected, setSelected] = useState({});

    const [collectionValue, setCollectionValue] = useState("");
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        console.log(context);
        P.getRegionsList()
            .then((res) => {
                setRegions(res.results);
                var obj = {};
                for (let i = 0; i < res.results.length; i++) {
                    obj[res.results[i].name] = false;
                }
                setSelected(obj);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const toggleFilters = () => {
        console.log(context);
        setShowFilter(!showFilter);
    };

    const handleFilterSelect = (e) => {
        const obj = { ...selected, [e.target.name]: !selected[e.target.name] };
        setSelected(obj);
    };

    const handleFilter = () => {
        // TODO: Restructure PokeAPI data, and grab this off my own server
        // console.log("Filtering!!!");
        // for (let n of Object.keys(selected)) {
        //     if (selected[n] === true) {
        //         P.getRegionByName(n)
        //             .then((res) => {
        //                 console.log(res);
        //             })
        //             .catch((err) => {
        //                 console.log(err);
        //             });
        //     }
        // }
    };

    const handleCollectionValue = (e) => {
        setCollectionValue(e.target.value);
    };

    const addCollection = (e) => {
        e.preventDefault();
        const data = {
            collection: {
                name: collectionValue,
                pokemon: ["bulbasaur", "charizard"],
            },
        };
        createCollection(data);
    };

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // name: "bulbasaur"
        // url: "https://pokeapi.co/api/v2/pokemon/1/"
        if (searchValue !== "") {
            P.getPokemonByName(searchValue.toLowerCase())
                .then((res) => {
                    setPokemon([
                        {
                            name: res.name,
                            url: `https://pokeapi.co/api/v2/pokemon/${res.id}/`,
                        },
                    ]);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            resetList();
        }
    };

    const handleReset = () => {
        resetList();
        setSearchValue("");
        for (let k of Object.keys(selected)) {
            selected[k] = false;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.filterContainer}>
                <div className={styles.downArrow} onClick={toggleFilters}>
                    v <p>FILTERS</p> v
                </div>
                {showFilter ? (
                    <div className={styles.filters}>
                        <div className={styles.filterGroup}>
                            <h5>
                                Region: (not functional -- need to restructure
                                PokeAPI data)
                            </h5>
                            <div className={styles.filterList}>
                                {regions.map((region) => (
                                    <button
                                        className={
                                            selected[region.name]
                                                ? styles.selected
                                                : styles.unselected
                                        }
                                        onClick={handleFilterSelect}
                                        name={region.name}
                                    >
                                        {region.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {context.loggedIn ? (
                            <div className={styles.filters}>
                                <div className={styles.filterGroup}>
                                    <h5>Collections:</h5>
                                    <div className={styles.filterList}>
                                        {context.collections.map(
                                            (collection) => (
                                                <button
                                                    className={
                                                        selected[
                                                            collection.name
                                                        ]
                                                            ? styles.selected
                                                            : styles.unselected
                                                    }
                                                    onClick={handleFilterSelect}
                                                    name={collection.name}
                                                >
                                                    {collection.name}
                                                </button>
                                            )
                                        )}
                                    </div>
                                    <form onSubmit={addCollection}>
                                        <label>
                                            Collection Name:
                                            <input
                                                type="text"
                                                value={collectionValue}
                                                onChange={handleCollectionValue}
                                            />
                                        </label>
                                        <button type="submit">Add!</button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        <button
                            className={styles.filterButton}
                            onClick={handleFilter}
                        >
                            Filter!
                        </button>
                        <form onSubmit={handleSearchSubmit}>
                            <label>
                                Search by name (name must be exact):
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={handleSearch}
                                />
                            </label>
                            <button type="submit">Submit!</button>
                        </form>
                        <button onClick={handleReset}>Reset</button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Filter;
