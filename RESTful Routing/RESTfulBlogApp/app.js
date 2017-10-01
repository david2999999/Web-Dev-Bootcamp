// initialize all the variables
var bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();
    

// copy and paste from existing apps  
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/resful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Mongoose / model configuration
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: 
        {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTful routes

app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs : blogs});
        }
    });
});

// New Route
app.get("/blogs/new", function(req, res){
    res.render("new");
});


//Create Route
app.post("/blogs", function(req, res){
    // create blog 
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log("========");
    console.log(req.body);
    
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }else{
            //then redirect to the index
            res.redirect("/blogs");
        }
    });
});

//SHOW route
app.get("/blogs/:id", function(req, res) {
   
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else{
           res.render("show", {blog: foundBlog});
       }
    });
});


app.get("/blogs/:id/edit",function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else{
           res.render("edit", {blog: foundBlog});
       }
    });
});

//update route
app.put("/blogs/:id",function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/blogs");
       }else{
           res.redirect("/blogs/" + req.params.id);
       }
   });
});

// delete route
app.delete("/blogs/:id", function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } else{
           res.redirect("/blogs");
       }
    });
});

// runs the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});