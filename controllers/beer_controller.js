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
      const dbBeersJson = dbBeers.map(beer=>beer.toJSON());
      var hbsObject = { beer: dbBeersJson };
      console.log("Beer hbsObject", hbsObject);
      return res.json(hbsObject);
    //   return res.render("index", hbsObject);
    });
});

router.post("/beers/create", function(req, res) {
  db.Beer.create({
    name: req.body.name
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

//get all breweries
router.get('/breweries',function(req,res){
    db.Brewery.findAll().then(brewery=>{
        res.json(brewery)
    })
})

router.get("/breweries/:city",function(req,res){
    db.Brewery.findAll({
        where:{
            city:req.params.city
        }
    }).then(brewery=>{
        res.json(brewery)
        const dbBreweryJson = brewery.map(brewery=>brewery.toJSON());
        var hbsObject = { brewery: dbBreweryJson };
        console.log(hbsObject)
        return res.json(hbsObject);
        // return res.render("index", hbsObject);
    })
})

router.post('/breweries/',function(req,res){
    db.Brewery.create({
       brewery_name:req.body.brewery_name,
        address_1:req.body.address_1,
        address_2:req.body.address_2,
        city:req.body.city,
        state:req.body.state,
        zip_code:req.body.zip_code,
        phone:req.body.phone,
        email:req.body.email,
        website:req.body.website
    }).then(newBrewery=>{
        res.json(newBrewery)
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
})

module.exports = router;