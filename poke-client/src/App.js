import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Context } from "./context/Context";

import { auth } from "./auth/firebase";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/login/Register";

import styles from "./styles/app.module.scss";
import { getCollections } from "./auth/authorization";

// import { loginUser, getTest, createUser } from "./auth/authorization";

function App() {
    const [context, dispatch] = useContext(Context);

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            console.log("auth state changed");
            if (user) {
                getCollections().then((collections) => {
                    console.log(collections);
                    dispatch({ type: "LOG_IN" });
                    dispatch({
                        type: "GET_COLLECTIONS",
                        payload: collections
                    })
                });
            } else {
                dispatch({ type: "LOG_OUT" });
            }
        });
    }, []);

    return (
        <div className={styles.container}>
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <Route path="/register" exact>
                        <Register />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
