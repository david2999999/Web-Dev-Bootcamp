var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/", function(req, res){  // the nav for the landing page
    res.render("landing");
});

//=======================
// AUTHENTICATION ROUTES
//=======================

//sign up form
router.get("/register", function(req, res) {
    res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res) {
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
router.get("/login", function(req, res) {
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});



module.exports = router;