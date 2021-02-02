// Calling express and router in one line
var router = require('express').Router();

// Import the model (cat.js) to use its database functions.
var burger = require('../models/burger.js');

// Routes/logic

//Redirect index
router.get('/index',function(req,res){
    res.redirect('/index');
});

// Renders burgers to DOM
router.get("/", function(req, res){
    burger.all(function(data){
        var hbsObject = {
            burgers: data 
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Post route create a burger
router.post("/burgers/create", function(req, res){
    burger.create([
        "name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result){
        res.redirect('/index');
    });
});


// Post route devour a burger
router.post("/burgers/devoured/:id", function(req, res){
    var condition = "id =" + req.params.id;
    console.log("condition",condition);

    burger.update({
       devoured: req.body.devoured
    }, condition, function(result){
        res.redirect('/index');
    });
});

module.exports = router;