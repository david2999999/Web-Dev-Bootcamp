var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


// showing all campgrounds
router.get("/", function(req, res){  // the site of all the campgrounds
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
router.get("/new",middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");   // renders the page with the form
});

// SHOW:  more info about one campground
router.get("/:id", function(req, res) {
    //find the campground with the provided ID
    // by using the populate statement. the comments are no longer IDs
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
               //render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});


//create new campground in the form
router.post("/",middleware.isLoggedIn, function(req, res){
    // get data from form and add to database
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author ={
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name : name, image: image, description: desc, author:author};
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

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE CAMPGROUNDS ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground 
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            // redirect somewhere 
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds");
       }
   });
});

module.exports = router;