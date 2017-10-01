var express = require("express");
var app = express();
var bodyParser = require("body-parser");  

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
            { name: "Salmon Creek", image: "https://farm7.staticflickr.com/6186/6090714876_44d269ed7e.jpg"},
            { name: "Granite Hill", image: "https://farm2.staticflickr.com/1203/1132895352_afd086a60b.jpg"},
            { name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"},
            { name: "Salmon Creek", image: "https://farm7.staticflickr.com/6186/6090714876_44d269ed7e.jpg"},
            { name: "Granite Hill", image: "https://farm2.staticflickr.com/1203/1132895352_afd086a60b.jpg"},
            { name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"},
            { name: "Salmon Creek", image: "https://farm7.staticflickr.com/6186/6090714876_44d269ed7e.jpg"},
            { name: "Granite Hill", image: "https://farm1.staticflickr.com/93/246477439_5ea3e472a0.jpg"},
            { name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1203/1132895352_afd086a60b.jpg"}
            
]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name : name, image: image};
    campgrounds.push(newCampground);
    // get data from form and add to campground array
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");    
});

app.listen(process.env.PORT , process.env.IP, function(){
    console.log("YelpCamp Has started!!!");
});

// Each campground has 
// Name and Image

//[
//{name:"Salmon Creek", image: "http://www.image.com"}
//{name:"Salmon Creek", image: "http://www.image.com"}
//{name:"Salmon Creek", image: "http://www.image.com"}
//{name:"Salmon Creek", image: "http://www.image.com"}
//]