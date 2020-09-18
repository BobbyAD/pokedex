import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

import { auth } from "../../auth/firebase";

import styles from "../../styles/header.module.scss";

const Header = () => {
    const [context, dispatch] = useContext(Context);

    const logOut = () => {
        // logout here, change
        auth()
            .signOut()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={styles.container}>
            <Link to="/">
                <p>PokeDex</p>
            </Link>
            {context.loggedIn ? (
                <button onClick={logOut}>Log Out</button>
            ) : (
                <div className={styles.loginRegister}>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )}
        </div>
    );
};

export default Header;
