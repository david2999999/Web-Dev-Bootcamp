var express = require("express");  //initialize express 
var app = express();

// "/" => "Hi There!
app.get("/", function(req , res){
   res.send("Hi There!"); 
});
app.get("/bye", function(req, res){
    res.send("Goodbye");
});

app.get("/dog", function(req, res) {
    console.log("Someone made an accesss to the website");
    res.send("Meow!");
});

app.get("/r/:subredditName",function(req, res) {
    var subreddit = req.params.subredditName;
    res.send("Welcome to the " + subreddit.toUpperCase() + " subreddit");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
    res.send("Welcome to the comment page");
});

app.get("*", function(req, res) {
    res.send("You Are a star!");
})
// tell express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
    // body...
});