import React from 'react'
import styles from "../../styles/home.module.scss";
import AllPokemon from '../pokemon/AllPokemon';

const Home = () => {
    return (
        <div className={styles.container}>
            <AllPokemon />
        </div>
    )
}

export default Home
