import React, { useEffect, useState } from "react";

const PokemonCard = ({ pokemon, P }) => {
    const [pokemonDetails, setPokemonDetails] = useState({});

    useEffect(() => {
        P.getPokemonByName(pokemon.name).then((detail) => {
            const id = detail.id;
            const name = detail.name.toUpperCase();
            const image = detail.sprites.front_default;
            const stats = detail.stats.map((s) => {
                var obj = {
                    name: s.stat.name,
                    stat: s.base_stat,
                };
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
    }, []);

    return (
        <div>
            {pokemonDetails && pokemonDetails.image ? (
                <div>
                    <img src={pokemonDetails.image} alt={`Image of ${pokemonDetails.name}`} />
                    <header>
                        <h3>{pokemonDetails.id}</h3>
                        <h3>{pokemonDetails.name}</h3>
                    </header>
                    <div>
                        {pokemonDetails.stats.map((stat) => (
                            <div>
                                <h5>{stat.name}</h5><p>{stat.stat}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PokemonCard;
