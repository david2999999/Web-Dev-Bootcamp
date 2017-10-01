var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),  // added mongoose
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    // User            = require("./models/user");
    seedDB          = require("./seeds");
    


//setting up mongoose (connecting to mongoDB and creating the database)
mongoose.connect("mongodb://localhost/yelp_camp_v3");
mongoose.Promise = global.Promise;

// body parser allows to see the element value from the form
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // does not need to include ejs extention

seedDB(); // This creates 3 campgrounds with comments

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

// SHOW:  more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with the provided ID
    // by using the populate statement. the comments are no longer IDs
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
           console.log(foundCampground);
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