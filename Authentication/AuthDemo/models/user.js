var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
   username: String,
   password: String
});

 // passes the function for serializing and deserializing the user
UserSchema.plugin(passportLocalMongoose);  

module.exports = mongoose.model("User", UserSchema);