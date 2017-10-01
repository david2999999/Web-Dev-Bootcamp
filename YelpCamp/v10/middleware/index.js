var Campground = require("../models/campground");
var Comment = require("../models/comment");

// ALL THE MIDDLEWARE GOES HERE
var middlewareObject={};

middlewareObject.checkCampgroundOwnership = function(req, res, next){
     // is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("/campgrounds");
            } else{
                // does user own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });        
        }else{
           res.redirect("back");
        }   
}


middlewareObject.checkCommentOwnership = function(req, res, next){
     // is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("/campgrounds");
            } else{
                // does user own the campground
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });        
        }else{
           res.redirect("back");
        }   
}


// MIDDLEWARE
middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = middlewareObject;