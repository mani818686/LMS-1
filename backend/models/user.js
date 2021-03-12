const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    email: {
        type: String,
        lowercase: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    mobileNumber: {
        type: Number,
        match: /^([7-9][0-9]{9})$/g,
    },
    password: { type: String },
    token: {
        type: String,
    },
});

module.exports = mongoose.model("User", userSchema);