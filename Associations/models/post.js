var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});


// use this statement to export the model out of the file
module.exports = mongoose.model("Post", postSchema);