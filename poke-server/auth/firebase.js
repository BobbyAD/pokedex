const admin = require("firebase-admin");
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS)

const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pokedex-289717.firebaseio.com",
});

console.log(firebase);

module.exports = firebase