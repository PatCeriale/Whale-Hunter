var express = require("express");
var router = express.Router();
var db = require("../models");

//================================================================================
//Beer Routes
//================================================================================

//Get all beer
router.get("/styledetails", function (req, res) {
    db.Beer.findAll({
        include: [db.Rating,db.Style,db.Brewery]
    })
        .then(function (dbBeers) {
            const dbBeersJson = dbBeers.map(beer => beer.toJSON());
            var hbsObject = { 
                beer: dbBeersJson,
                user : req.session.user,
                employee: req.session.employee
             };
            return res.render("beers", hbsObject);
        });
});

//Get all beer
router.get("/styledetails/:id", function (req, res) {
    db.Beer.findAll({
        where: {
        StyleId: req.params.id
    },
        include: [db.Rating,db.Style,db.Brewery]
    })
        .then(function (dbBeers) {
            const dbBeersJson = dbBeers.map(beer => beer.toJSON());
            var hbsObject = { 
                beer: dbBeersJson,
                user : req.session.user,
                employee: req.session.employee
             };
            return res.render("beers", hbsObject);
        });
});

//get details for one style
router.get("/styledetails/:id", function (req, res) {
    db.Style.findOne({
        where: {
            id: req.params.id
        }
    }).then(style => {
         return res.json(style)
    })
})



module.exports = router;