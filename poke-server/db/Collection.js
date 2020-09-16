const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    pokemon: {
        type: Array,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Collection", CollectionSchema);
