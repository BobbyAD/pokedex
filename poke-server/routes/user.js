const router = require("express").Router();
const admin = require("../auth/firebase");

const userAuth = require("../auth/userAuth");
const userController = require("../controllers/userController");
const collectionController = require("../controllers/collectionController");

// login
router.get("/", userAuth, (req, res) => {
    // use authId for database storage
    console.log(req.authId);
    return userController.find(req, res);
});

// create account
router.post("/signup", (req, res) => {
    console.log("in signup");
    console.log(req.body);
    const { email, password } = req.body;
    admin
        .auth()
        .createUser({
            email,
            password,
        })
        .then((user) => {
            console.log(user.uid);
            userController.create(req, res, user.uid, user.email);
        })
        .catch((err) => {
            console.log(err);
            res.status(409).json({ error: "User already exists" });
        });
});

// get collections
router.get("/collections", userAuth, (req, res) => {
    return userController.getCollections(req, res)
})

// add collections
router.post("/collections", userAuth, (req, res) => {
    return collectionController.create(req, res);
})
// edit collections

// delete collections

module.exports = router;
