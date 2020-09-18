import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { loginUser, createUser } from "../../auth/authorization";
import { Context } from "../../context/Context";

import styles from "../../styles/login.module.scss";

const Register = () => {
    const [context, dispatch] = useContext(Context);
    const [creds, setCreds] = useState({
        email: "",
        password: "",
    });
    const [redirect, setRedirect] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        createUser({
            email: creds.email,
            password: creds.password,
        })
            .then((res) => {
                console.log(res);
                loginUser(creds.email, creds.password)
                    .then((res) => {
                        console.log(res);
                        setRedirect(true);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChanges = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    };

    if (redirect) {
        return <Redirect to="/" />;
    } else {
        return (
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleRegister}>
                    <label className={styles.label}>
                        <h4>Email</h4>
                    </label>
                    <input
                        type="text"
                        name="email"
                        value={creds.email}
                        onChange={handleChanges}
                        className={styles.field}
                    />
                    <label className={styles.label}>
                        <h4>Password</h4>
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={creds.password}
                        onChange={handleChanges}
                        className={styles.field}
                    />
                    <button type="submit" className={styles.button}>
                        Register!
                    </button>
                </form>
            </div>
        );
    }
};

export default Register;
