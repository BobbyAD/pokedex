const Collection = require("../db/Collection");
const User = require("../db/User");

const CollectionController = {
    create: (req, res) => {
        return Collection.create(req.body.collection)
            .then((doc) => {
                console.log("doc", doc);
                User.find({
                    firebaseId: req.authId,
                })
                    .then((user) => {
                        console.log(user);
                        console.log(user[0]._id);
                        console.log(doc._id)
                        User.findByIdAndUpdate(
                            user[0]._id,
                            { $push: { collections: doc._id } },
                            { new: true, useFindAndModify: false }
                        ).then((user) => {
                            res.status(201).json(user);
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json(err);
                    });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    edit: (req, res, collectionId) => {},
    delete: (req, res, collectionId) => {},
};

module.exports = CollectionController;
