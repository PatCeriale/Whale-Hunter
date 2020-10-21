
var express = require("express");

var router = express.Router();

var db = require("../models/");


router.get("/", function(req, res) {
  
  res.redirect("/beers");
});


router.get("/beers", function(req, res) {

  db.Beer.findAll()

    .then(function(dbBeers) {
      console.log(dbBeers);
      const dbBeersJson = dbBeer.map(beer=>beer.toJSON());
      var hbsObject = { beer: dbBeersJson };
      return res.render("index", hbsObject);
    });
});

router.post("/beers/create", function(req, res) {
  db.Beer.create({
    beer_name: req.body.beer_name
  }).then(function(dbBeer) {
      console.log(dbBeer);
      res.redirect("/");
    });
});


router.put("/beers/update/:id", function(req, res) {
  db.Beer.update({
    devoured: true
  },
  {
    where: {
      id: req.params.id
    }
  }
  ).then(function(dbBeer) {
    res.json("updated");
  });
});

module.exports = router;
