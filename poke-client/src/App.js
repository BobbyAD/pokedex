import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import {loginUser, getTest} from "./auth/authorization";

function App() {

    useEffect(() => {
        loginUser(`${process.env.TEST_EMAIL}`, `${process.env.TEST_PASS}`)
            .then((user) => {
                console.log(user);
                getTest();
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
