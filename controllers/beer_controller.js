var express = require("express");
var router = express.Router();
var db = require("../models/");

router.get("/", function (req, res) {
  res.redirect("/beers");
});

router.get("/beers", function (req, res) {
  db.Beer.findAll()
    .then(function (dbBeers) {
      console.log(dbBeers);
      const dbBeersJson = dbBeers.map(beer => beer.toJSON());
      var hbsObject = { beer: dbBeersJson };
      console.log("Beer hbsObject", hbsObject);
      return res.render("index", hbsObject);
    });
});

router.post("/beers/create", function (req, res) {
  db.Beer.create({
    name: req.body.name
  }).then(function (dbBeer) {
    console.log(dbBeer);
    res.redirect("/");
  });
});

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

//================================================================================
//Breweries Routes
//================================================================================

//Get all breweries from the DB
router.get('/breweries', function (req, res) {
  db.Brewery.findAll().then(brewery => {
    console.log(brewery);
    const dbBreweryJson = brewery.map(brewery => brewery.toJSON());
    var hbsObject = { brewery: dbBreweryJson };
    console.log("Brewery hbsObject", hbsObject);
    return res.render("breweries", hbsObject);
  })
})

//Get all breweries from the same city
router.get("/breweries/:city", function (req, res) {
  db.Brewery.findAll({
    where: {
      city: req.params.city
    }
  }).then(brewery => {
    res.json(brewery)
    const dbBreweryJson = brewery.map(brewery => brewery.toJSON());
    var hbsObject = { brewery: dbBreweryJson };
    console.log(hbsObject)
    return res.json(hbsObject);
    // return res.render("index", hbsObject);
  })
})

//Create new breweries
router.post('/breweries/', function (req, res) {
  db.Brewery.create({
    brewery_name: req.body.brewery_name,
    address_1: req.body.address_1,
    address_2: req.body.address_2,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    phone: req.body.phone,
    email: req.body.email,
    website: req.body.website
  }).then(newBrewery => {
    res.json(newBrewery)
    const dbBreweryJson = brewery.map(brewery => brewery.toJSON());
    var hbsObject = { brewery: dbBreweryJson };
    console.log(hbsObject)
    return res.json(hbsObject);
    // return res.render("index", hbsObject);
  }).catch(err => {
    console.log(err)
    res.status(500).json(err);
  })
})

//Update breweries
router.put('/breweries/:id', function (req, res) {
  db.Brewery.update({
    brewery_name: req.body.brewery_name,
    address_1: req.body.address_1,
    address_2: req.body.address_2,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    phone: req.body.phone,
    email: req.body.email,
    website: req.body.website
  }, {
    where: {
      id:req.params.id
    }
  }).then(updateBrewery=>{
    if(updateBrewery[0]===0){
      res.status(404).json(updateUser)
    } else {
      res.json(updateBrewery)
    }
  }).catch(err=>{
    console.log(err)
    res.status(500).json(err);
  })
})

//Delete Breweries
router.delete("/breweries/:id",function(req,res){
  db.Brewery.destroy({
    where:{
      id:req.params.id
    }
  }).then(deleteBrewery=>{
    if(deleteBrewery===0){
      res.status(404).json(deleteBrewery)
    } else {
      res.json(deleteBrewery)
    const dbBreweryJson = brewery.map(brewery => brewery.toJSON());
    var hbsObject = { brewery: dbBreweryJson };
    console.log(hbsObject)
    return res.json(hbsObject);
    // return res.render("index", hbsObject);
    }
  }).catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
})

module.exports = router;