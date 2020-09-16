import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import {loginUser, getTest, createUser} from "./auth/authorization";

function App() {

    useEffect(() => {
        loginUser("test@test.com", "test1234")
            .then((user) => {
                console.log(user);
                getTest();
            })
            .catch((err) => {
                console.log(err);
            })
        
            createUser({email: "1234@gmail.com", password: "asdf1234"})
                .then((user) => {
                    console.log(user);
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
