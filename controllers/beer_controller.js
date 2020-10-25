var express = require("express");
var router = express.Router();
var db = require("../models/");

//================================================================================
//Beer Routes
//================================================================================
//Basic redirect route. May change later.
router.get("/", function (req, res) {
    db.Post.findAll()
        .then(function (dbPosts) {
            console.log(dbPosts);
            const dbPostsJson = dbPosts.map(post => post.toJSON());
            var hbsObject = { 
                post : dbPostsJson,
                user : req.session.user,
                employee: req.session.employee
             };
            console.log("Post hbsObject", hbsObject);
            return res.render("index", hbsObject);
        });
});

//Get all beer
router.get("/beers", function (req, res) {
    db.Beer.findAll({
        include: [db.Rating,db.Style,db.Brewery]
    })
        .then(function (dbBeers) {
            console.log(dbBeers);
            const dbBeersJson = dbBeers.map(beer => beer.toJSON());
            var hbsObject = { 
                beer: dbBeersJson,
                user : req.session.user,
                employee: req.session.employee
             };
            console.log("Beer hbsObject", hbsObject);
            return res.render("beers", hbsObject);
        });
});

//get details for one beer
router.get("/beers/:id", function (req, res) {
    db.Beer.findOne({
        where: {
            id: req.params.id
        }, include: [db.Rating,db.Style,db.Brewery]
    }).then(beer => {
        const dbBeerJson = beer.toJSON();
        var hbsObject = { 
            beer: dbBeerJson, 
            numLikes: 
            beer.Ratings.length,
            user : req.session.user, 
            employee: req.session.employee
        };
        return res.render("beerdetail", hbsObject);
    })
})

//Create new beer
router.post("/beers", function (req, res) {
    console.log(req.body.ibu);
    db.Beer.create({
        BreweryId: req.body.BreweryID,
        name: req.body.name,
        description: req.body.description,
        StyleId: req.body.StyleID,
        abv: req.body.abv,
        ibu: req.body.ibu,
        image: req.body.image
    }).then(function (dbBeer) {
        console.log(dbBeer);
        res.json(dbBeer)
    });
});
//Does nothing yet
router.put("/beers/update/:id", function (req, res) {
    db.Beer.update({
        devoured: true
    },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(function (dbBeer) {
        res.json("updated");
    });
});

module.exports = router;
