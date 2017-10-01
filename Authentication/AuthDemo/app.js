var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");
    
var app = express();
    
mongoose.connect("mongodb://localhost/auth_demo_app");
mongoose.Promise = global.Promise;
app.set('view engine', 'ejs');
// Use this line to get information from the FORM (username & password)
app.use(bodyParser.urlencoded({extended: true})); 
app.use(require("express-session")({
    secret: "Rusty is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// reading the session that is encoded and the unencoded the session
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=======================
//ROUTES
//======================

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// AUTHENTICATION ROUTES

//show register form
app.get("/register", function(req, res) {
    res.render("register");
});

//handling user signup
app.post("/register", function(req, res){
    req.body.username
    req.body.password
    // passes in the username and password. The password is not saved in the database
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});


//show Login form
app.get("/login", function(req, res) {
    res.render("login");
});

//login logic
//middleware 
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
    
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

//function defined as a middleware to make sure the user is logged in before accessing a page
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login"); // if the user is not logged in . redirect to login
}
// RUNS THE SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started!!");
});