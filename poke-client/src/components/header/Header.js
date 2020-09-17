import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/header.module.scss";

const Header = () => {
    return (
        <div className={styles.container}>
            <Link to="/">
                <p>PokeDex</p>
            </Link>
            <Link to="/profile">
                Profile
            </Link>
        </div>
    );
};

export default Header;
