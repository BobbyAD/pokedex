import React from "react";

import styles from "../../styles/search.module.scss";

const Search = ({ P, setPokemon, searchValue, setSearchValue, resetList }) => {
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

    // TODO: Fuzzy search - requires restructuring PokeAPI data
    return (
        <form onSubmit={handleSearchSubmit} className={styles.form}>
            <label className={styles.label}>
                <h4>Search by Name (name must be exact):</h4>
            </label>
            <input type="text" value={searchValue} onChange={handleSearch} className={styles.field} />
            <button type="submit" className={styles.button}>
                Search!
            </button>
        </form>
    );
};

export default Search;
