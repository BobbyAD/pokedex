const Collection = require("../db/Collection");
const User = require("../db/User");

const CollectionController = {
    create: (req, res) => {
        // console.log(req.body.collection);
        // User.find({
        //     firebaseId: req.authId,
        // }).then((user) => {
        //     console.log(user["_id"]);
        //     console.log(user._id);
        //     console.log(user);
        //     let collection = new Collection({
        //         ...req.body.collection,
        //         owner: user._id,
        //     });
        //     collection
        //         .save()
        //         .then((doc) => {
        //             res.status(201).json(doc);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //             res.status(500).json(err);
        //         });
        // });
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
    verifyOwner: (req, res, userId) => {},
};

module.exports = CollectionController;
