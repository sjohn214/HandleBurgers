// Calling express and router in one line
var router = require('express').Router();

// Import the model (cat.js) to use its database functions.
var burger = require('../models/burger.js');

// Routes/logic


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
        "burger_name", "devoured"
    ], [
        req.body.name, false
    ], function(result){
        res.json(result);
    });
});


// Post route devour a burger
router.put("/burgers/devoured/:id", function(req, res){
    var condition = "id =" + req.params.id;
    console.log("condition",condition);

    burger.update({
       devoured: req.body.devoured
    }, condition, function(result){
        res.json(result);
    });
});

module.exports = router;