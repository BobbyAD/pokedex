import React, { useEffect, useState } from "react";
import styles from "../../styles/pokemonCard.module.scss";

const PokemonCard = ({ pokemon, P }) => {
    const [pokemonDetails, setPokemonDetails] = useState({});

    useEffect(() => {
        P.getPokemonByName(pokemon.name).then((detail) => {
            const id = detail.id;
            const name = detail.name.toUpperCase();
            const image = detail.sprites.front_default;
            const stats = detail.stats.map((s) => {
                var obj = {
                    stat: s.base_stat,
                };

                switch (s.stat.name) {
                    case "hp":
                        obj["name"] = "HP";
                        break;
                    case "attack":
                        obj["name"] = "Attack";
                        break;
                    case "defense":
                        obj["name"] = "Defense";
                        break;
                    case "special-attack":
                        obj["name"] = "Sp. Atk";
                        break;
                    case "special-defense":
                        obj["name"] = "Sp. Def";
                        break;
                    case "speed":
                        obj["name"] = "Speed";
                        break;
                }

                return obj;
            });
            const details = {
                id: id,
                name: name,
                image: image,
                stats: stats,
            };
            setPokemonDetails(details);
        });
    }, [pokemon]);

    return (
        <section className={styles.container}>
            {pokemonDetails && pokemonDetails.image ? (
                <div className={styles.cardContainer}>
                    <img
                        src={pokemonDetails.image}
                        alt={`Image of ${pokemonDetails.name}`}
                    />
                    <div className={styles.cardRight}>
                        <header>
                            <h3 className={styles.id}>#{pokemonDetails.id}</h3>
                            <h3 className={styles.name}>
                                {pokemonDetails.name}
                            </h3>
                        </header>
                        <div className={styles.statsContainer}>
                            {pokemonDetails.stats.map((stat) => (
                                <div className={styles.statContainer}>
                                    <h5 className={styles.statName}>
                                        {stat.name}
                                    </h5>
                                    <p className={styles.stat}>{stat.stat}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </section>
    );
};

export default PokemonCard;
