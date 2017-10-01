// install the express 
var express = require("express");
var app = express();
//using body parser to find the value of req.body.newfriend
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Array of friend. ELements will be push into this array after
var friends =["Tony", "Miranda", "Nihale", "Pierre", "Lily"];

app.set("view engine", "ejs");  // Does not need to specify the .ejs

app.get("/", function(req, res){
    res.render("home");
});

app.post("/addfriend", function(req , res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");  // using redirect instead of render
});

app.get("/friends", function(req, res){
   res.render("friends" , {friends: friends});  // sending in the whole array
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Servers connected");
});