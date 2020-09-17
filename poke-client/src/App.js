import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";

import styles from "./styles/app.module.scss";

// import { loginUser, getTest, createUser } from "./auth/authorization";

function App() {
    // useEffect(() => {
    //     // loginUser("1234@gmail.com", "asdf1234")
    //     //     .then((user) => {
    //     //         console.log(user);
    //     //         getTest();
    //     //     })
    //     //     .catch((err) => {
    //     //         console.log(err);
    //     //     });

    //     // createUser({ email: "1234@gmail.com", password: "asdf1234" })
    //     //     .then((user) => {
    //     //         console.log(user);
    //     //         loginUser("1234@gmail.com", "asdf1234")
    //     //             .then((user) => {
    //     //                 console.log(user);
    //     //                 getTest();
    //     //             })
    //     //             .catch((err) => {
    //     //                 console.log(err);
    //     //             });
    //     //     })
    //     //     .catch((err) => {
    //     //         console.log(err);
    //     //     });
    // }, []);

    return (
        <div className={styles.container}>
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/" exact>
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
