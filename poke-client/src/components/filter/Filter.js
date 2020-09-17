import React, { useEffect, useState } from "react";
import styles from "../../styles/filter.module.scss";

const Filter = ({ P, pokemon }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [regions, setRegions] = useState([]);
    const [selected, setSelected] = useState({});

    useEffect(() => {
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

    return (
        <div className={styles.container}>
            <div className={styles.filterContainer}>
                <div className={styles.downArrow} onClick={toggleFilters}>
                    v <p>FILTERS</p> v
                </div>
                {showFilter ? (
                    <div className={styles.filters}>
                        <div className={styles.filterGroup}>
                            <h5>Region: (not functional -- need to restructure PokeAPI data)</h5>
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
                        <button
                            className={styles.filterButton}
                            onClick={handleFilter}
                        >
                            Filter!
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
