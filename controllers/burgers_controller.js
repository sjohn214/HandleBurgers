// Calling express and router in one line
var router = require('express').Router();

// Import the model (cat.js) to use its database functions.
var burger = require('../models/burger.js');

// Routes/logic

router.get("/", function(req, res){
    burger.all(function(data){
        var hbsObject = {
            burgers: data 
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Post route
router.post("/api/burgers", function(req, res){
    burger.create([
        "name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function(result){
        res.json({id: result.insertId});
    });
});

router.put("/api/burgers/:id", function(req, res){
    var condition = "id =" + req.params.id;
    console.log("condition",condition);

    burger.update({
       devoured: req.body.devoured
    }, condition, function(result){
        if (result.changeRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;