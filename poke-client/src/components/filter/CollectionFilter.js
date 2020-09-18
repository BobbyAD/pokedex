import React, { useContext } from "react";
import { Context } from "../../context/Context";

import styles from "../../styles/collectionFilter.module.scss";

const CollectionFilter = ({selected, setSelected, setPokemon, toggleFiltering}) => {
    const [context, dispatch] = useContext(Context);

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
        // Make Collections an Object in my database:
        // protects against duplicate names
        // reduces this to linear time
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

        toggleFiltering();

        setPokemon(newPokemon);
    };

    return (
        <div className={styles.container}>
            <div className={styles.filterGroup}>
                <h5>Collections:</h5>
                <div className={styles.filterList}>
                    {context.collections.map((collection) => (
                        <button
                            className={
                                selected[collection.name]
                                    ? styles.selected
                                    : styles.unselected
                            }
                            onClick={handleFilterSelect}
                            name={collection.name}
                        >
                            {collection.name}
                        </button>
                    ))}
                </div>
                <button className={styles.filterButton} onClick={handleFilter}>
                    Filter!
                </button>
            </div>
        </div>
    );
};

export default CollectionFilter;
