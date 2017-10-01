var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// this adds the methods for the user authentication
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);