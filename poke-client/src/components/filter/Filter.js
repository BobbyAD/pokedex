import React, { useContext, useEffect, useState } from "react";
import { createCollection, getCollections } from "../../auth/authorization";
import { Context } from "../../context/Context";
import styles from "../../styles/filter.module.scss";
import Search from "./Search";

const Filter = ({
    P,
    setPokemon,
    submitCollection,
    togglePicking,
    resetList,
}) => {
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

        const newPokemon = [];

        const selectedFilters = [];

        // These next two blocks are absolutely awful
        // TODO: Clean this up
        for (let s of Object.keys(selected)) {
            if (selected[s] === true) {
                selectedFilters.push(s);
            }
        }

        // O(n^3)
        for (let p of selectedFilters) {
            context.collections.map((col) => {
                if (col.name === p) {
                    col.pokemon.map((pok) => {
                        newPokemon.push(pok);
                    });
                }
            });
        }

        setPokemon(newPokemon);
    };

    const handleCollectionValue = (e) => {
        setCollectionValue(e.target.value);
    };

    const addCollection = (e) => {
        e.preventDefault();
        const name = collectionValue;
        submitCollection(name);
        setCollectionValue("");
    };

    const handleReset = () => {
        resetList();
        setSearchValue("");
        for (let k of Object.keys(selected)) {
            selected[k] = false;
        }
    };

    // TODO: break out in to components
    return (
        <div className={styles.container}>
            <div className={styles.filterContainer}>
                <div className={styles.downArrow} onClick={toggleFilters}>
                    v <p>FILTERS</p> v
                </div>
                {showFilter ? (
                    <div className={styles.filters}>
                        {/* <div className={styles.filterGroup}>
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
                        </div> */}
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
                                    <button
                                        className={styles.filterButton}
                                        onClick={handleFilter}
                                    >
                                        Filter!
                                    </button>
                                    <div>
                                        <form onSubmit={addCollection}>
                                            <label>
                                                Collection Name:
                                                <input
                                                    type="text"
                                                    value={collectionValue}
                                                    onChange={
                                                        handleCollectionValue
                                                    }
                                                />
                                            </label>
                                            <button type="submit">Add!</button>
                                        </form>
                                        <button onClick={togglePicking}>
                                            Pick some Pokemon!
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        <Search
                            P={P}
                            setPokemon={setPokemon}
                            setSearchValue={setSearchValue}
                            searchValue={searchValue}
                            resetList={resetList}
                        />
                        <button onClick={handleReset} className={styles.reset}>
                            Reset
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Filter;
