import React from "react";
import logo from "./logo.svg";
import "./App.css";

import firebase from "firebase";

firebase.initializeApp({
    apiKey: process.env.GOOGLE_API_KEY,
    authDomain: "pokedex-289717.firebaseapp.com",
    databaseURL: "https://pokedex-289717.firebaseio.com",
    projectId: "pokedex-289717",
    storageBucket: "pokedex-289717.appspot.com",
    messagingSenderId: "42373598062",
    appId: "1:42373598062:web:bc4e323f74819441488f7f",
});

firebase.auth().currentUser.getIdToken(true)
    .then((idToken) => {
        client({
            method: 'get',
            url: '/',
            headers: {
                'AuthToken': idToken
            }
        })
    })
    .catch(err => {
        console.log(err);
    })

function App() {
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
