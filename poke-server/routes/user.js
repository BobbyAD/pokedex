const router = require("express").Router();
const admin = require("../auth/firebase");

const userAuth = require("../auth/userAuth");
const User = require("../db/User"); // interact with database

// login
router.get("/", userAuth, (req, res) => {
    // use authId for database storage
    console.log(req.authId);
    return res.status(200).json({ status: "Accepted" });
});

// create account
router.post("/signup", (req, res) => {
    console.log("in signup")
    console.log(req.body)
    const { email, password } = req.body;
    admin
        .auth()
        .createUser({
            email,
            password,
        })
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get collections

// add collections

// edit collections

// delete collections

module.exports = router;
