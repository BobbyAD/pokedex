const User = require("../db/User");

const UserController = {
    find: (req, res) => {
        UserModel.find({ firebaseId: req.params.userId })
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    create: (req, res, firebaseId) => {
        let newUser = new UserModel({firebaseId: firebaseId});
        newUser
            .save()
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getCollections: (req, res) => {
        UserModel.find({
            firebaseId: req.params.firebaseId,
        })
            .populate("collections")
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

module.exports = UserController;