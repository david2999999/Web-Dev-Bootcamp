var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm6.staticflickr.com/5093/5518990239_9ce7cb6152.jpg",
        description: "Blah blah blah"
       
    },
     {
        name: "Space Limitless",
        image: "https://farm6.staticflickr.com/5216/5518991291_8c8164c5cf.jpg",
        description: "Blah blah blah"
       
    },
     {
        name: "Space",
        image: "https://farm6.staticflickr.com/5052/5518992555_e7119f4017.jpg",
        description: "Blah blah blah"
       
    }
]

function seedDB(){
    // Remove all  campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }else{
            console.log("removed campgrounds");
                
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added a space");
                        // create a comment
                        Comment.create(
                                {
                                    text:"This place is great",
                                    author: "Homer"
                                },function(err, comment){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("Created a space");
                                    }

                                });
                    }
                });
            });
        }
    });

    
    //add a few comments
}


module.exports = seedDB;
