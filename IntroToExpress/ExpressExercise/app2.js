var express = require("express"); //init express
var app = express();

var sound = {
    pig : 'Oink',
    cow : 'Moo',
    dog : 'Woof Woof!',
    sheep : 'Mehh',
    cat : 'Meow',
    goldfish : '...'
}

app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignment!"); 
});

app.get("/speak/:topic", function(req, res){
    var topic = req.params.topic.toLowerCase();
    res.send("The " + topic + " says " + "\'" + sound[topic] + "\'");
});

app.get("/repeat/:word/:num", function(req, res) {
    var word = req.params.word;
    var num = parseInt(req.params.num);
    var string = "";
    
    for (var i = 0; i < num; i++) {
        string += (word + " ");
    }
    res.send(string);
});

// any other page will be this
app.get("*", function(req, res) {
    res.send("Sorry, page not found.. what are you doing with your life?");
});


// starts the server from cloud9
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});