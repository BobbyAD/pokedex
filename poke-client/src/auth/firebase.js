import firebase from "firebase";

firebase.initializeApp({
    apiKey: "AIzaSyARjLBNGX1Bnpmstp6DQEHzShrAx_-O728",
    authDomain: "pokedex-289717.firebaseapp.com",
    databaseURL: "https://pokedex-289717.firebaseio.com",
    projectId: "pokedex-289717",
    storageBucket: "pokedex-289717.appspot.com",
    messagingSenderId: "42373598062",
    appId: "1:42373598062:web:bc4e323f74819441488f7f",
});

export const auth = firebase.auth;

export default firebase;
