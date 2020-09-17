const User = require("../db/User");

const UserController = {
    find: (req, res) => {
        User.find({ firebaseId: req.authId })
            .then((user) => {
                res.status(200).json(user[0]);
            })
            .catch((err) => {
                console.log(err);
                res.status(404).json(err);
            });
    },
    create: (req, res, firebaseId) => {
        console.log("creating in mongoose")
        let newUser = new User({firebaseId: firebaseId});
        newUser
            .save()
            .then((user) => {
                res.status(201).json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(409).json({error: "User already exists"});
            });
    },
    getCollections: (req, res) => {
        User.find({
            firebaseId: req.params.firebaseId,
        })
            .populate("collections")
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(404).json({error: "Could not find collections"});
            });
    },
};

module.exports = UserController;