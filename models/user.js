const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "You need an email"],
        unique: [true, "Email must be unique"]
    }
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);