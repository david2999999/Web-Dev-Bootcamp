var express          = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");  // added mongoose

//setting up mongoose (connecting to mongoDB and creating the database)
mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;

// body parser allows to see the element value from the form
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // does not need to include ejs extention

// Schema setup (blue print for the object)
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

//Creates a model of the Campground object
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://farm2.staticflickr.com/1203/1132895352_afd086a60b.jpg",
//         description: "This is a huge granite hill, no bathroom"
//     }, function(err, campground) {
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Newly created campground");
//             console.log(campground);
//         }
//     }
// )

app.get("/", function(req, res){  // the nav for the landing page
    res.render("landing");
});

// showing all campgrounds
app.get("/campgrounds", function(req, res){  // the site of all the campgrounds
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index",{campgrounds: allCampgrounds});
        }
    });
});


// Showing the form page for new campgrounds
app.get("/campgrounds/new", function(req, res){
    res.render("new");   // renders the page with the form
});

// Show more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with the provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
               //render show template with that campground
           res.render("show", {campground: foundCampground});
       }
    });
});


//create new campground in the form
app.post("/campgrounds", function(req, res){
    // get data from form and add to database
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name : name, image: image, description: desc};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });       
});
    
app.listen(process.env.PORT , process.env.IP, function(){
    console.log("YelpCamp Has started!!!");
});



//name      url         verb    description
//============================================
//Index     /dogs       GET     Display a list of all dogs
//New       /dogs/new   GET     Displays form for a new dog
//Create    /dogs       POST    Add new dog to DB
//Show      /dogs/:id   GET     Shows input of one dog

// RESTful Routing

//