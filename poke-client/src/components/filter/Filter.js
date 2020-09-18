import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import styles from "../../styles/filter.module.scss";
import CollectionFilter from "./CollectionFilter";
import NewCollection from "./NewCollection";
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

    const [searchValue, setSearchValue] = useState("");

    // For Regions, when I restructure PokeAPI data
    // useEffect(() => {
    //     console.log(context);
    //     P.getRegionsList()
    //         .then((res) => {
    //             setRegions(res.results);
    //             var obj = {};
    //             for (let i = 0; i < res.results.length; i++) {
    //                 obj[res.results[i].name] = false;
    //             }
    //             setSelected(obj);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    const toggleFilters = () => {
        console.log(context);
        setShowFilter(!showFilter);
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
                            <>
                                <CollectionFilter
                                    selected={selected}
                                    setSelected={setSelected}
                                    setPokemon={setPokemon}
                                />
                                <NewCollection 
                                    submitCollection={submitCollection}
                                    togglePicking={togglePicking}
                                />
                            </>
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
