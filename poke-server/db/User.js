const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firebaseId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    // TODO: Change this to an Object
    collections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    }]
});

module.exports = mongoose.model("User", UserSchema);
