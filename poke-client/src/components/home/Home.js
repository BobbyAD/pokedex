import React from 'react'
import styles from "../../styles/home.module.scss";
import Filter from '../filter/Filter';
import AllPokemon from '../pokemon/AllPokemon';

const Home = () => {
    return (
        <div className={styles.container}>
            <Filter />
            <AllPokemon />
        </div>
    )
}

export default Home
