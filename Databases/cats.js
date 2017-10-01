var mongoose = require("mongoose"); // Object data mapper, writing javascript code that interact with the database
mongoose.connect("mongodb://localhost/cat_app");
mongoose.Promise = global.Promise;

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

var Cat = mongoose.model("Cat", catSchema);  //builts the model with methods

//adding a new cat to the DB
//retrieve all cats from the DB and console.log each one

// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("Something Went Wrong!!");
//     }else{
//         console.log("Cat added into the Database: ");
//         console.log(cat)
//     }
// });

Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err)
    }else{
        console.log(cat)
    }
});

Cat.find({}, function(err, cats){
    if(err){
        console.log("ERROR!!");
        console.log(err);
    }else{
        console.log("All the cats....");
        console.log(cats);
    }
});