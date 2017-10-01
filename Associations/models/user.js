var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name : String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});


// exports the model 
module.exports = mongoose.model("User", userSchema);