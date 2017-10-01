var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),  // added mongoose
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
    


//setting up mongoose (connecting to mongoDB and creating the database)
mongoose.connect("mongodb://localhost/yelp_camp_v6");
mongoose.Promise = global.Promise;

// body parser allows to see the element value from the form
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // does not need to include ejs extention
app.use(express.static(__dirname + "/public")); // uses the css stylesheet
seedDB(); // This creates 3 campgrounds with comments

// PASSPORT CONFIGURATIONS
app.use(require("express-session")({
    secret: "Once again, Hello",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

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
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    });
});


// Showing the form page for new campgrounds
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");   // renders the page with the form
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
           res.render("campgrounds/show", {campground: foundCampground});
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
    
    
//=====================================
// COMMENTS ROUTES
//=====================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    //loopup campgrounds using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    // create new comment
    //connect new comment to campground
    //redirect campground show page
});

//=======================
// AUTHENTICATION ROUTES
//=======================

//sign up form
app.get("/register", function(req, res) {
    res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
app.get("/login", function(req, res) {
    res.render("login");
});

// handling login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//logout route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// SERVER STARTS
app.listen(process.env.PORT , process.env.IP, function(){
    console.log("YelpCamp Has started!!!");
});





//name      url         verb    description
//============================================
//Index     /dogs       GET     Display a list of all dogs
//New       /dogs/new   GET     Displays form for a new dog
//Create    /dogs       POST    Add new dog to DB
//Show      /dogs/:id   GET     Shows input of one dog


//INDEX     /campgrounds    
//NEW       /campgrounds/new
//CREATE    /campgrounds
//SHOW      /campgrounds/:id

//NEW       /campgrounds/:id/comments/new   GET
//CREATE    /campgrounds/:id/comments       POST