const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firebaseId: {
        type: String,
        required: true,
    },
    collections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    }]
});

module.exports = mongoose.model("User", UserSchema);
