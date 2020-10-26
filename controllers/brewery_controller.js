var express = require("express");
var router = express.Router();
var db = require("../models/");

//================================================================================
//Breweries Routes
//================================================================================

//Get all breweries from the DB
router.get('/breweries', function (req, res) {
    db.Brewery.findAll().then(brewery => {
        console.log(brewery);
        const dbBreweryJson = brewery.map(brewery => brewery.toJSON());
        var hbsObject = { 
            brewery: dbBreweryJson,
            user : req.session.user,
            employee: req.session.employee
         };
        console.log("Brewery hbsObject", hbsObject);
        return res.render("breweries", hbsObject);
    })
})

//get all details about a single brewery
router.get("/breweries/:id", function (req, res) {
    db.Brewery.findOne({
        where: {
            id: req.params.id
        }
    }).then(brewery => {
        const dbBreweryJson = brewery.toJSON();
        db.Beer.findAll({
            where: {
                BreweryId: brewery.id
            }, 
            include: [db.Rating,db.Style]
        }).then(beers => {
            const dbBeerJson = beers.map(beer => beer.toJSON());
            var hbsObject = {
                brewery: dbBreweryJson,
                breweryBeer: dbBeerJson,
                user : req.session.user,
                employee: req.session.employee
            };
            //res.json(hbsObject);
            return res.render("brewerydetail", hbsObject);
        })

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
        website: req.body.website,
        description: req.body.description,
        image: req.body.image
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
        website: req.body.website,
        description: req.body.description,
        image: req.body.image
    }, {
        where: {
            id: req.params.id
        }
    }).then(updateBrewery => {
        if (updateBrewery[0] === 0) {
            res.status(404).json(updateUser)
        } else {
            res.json(updateBrewery)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

//Delete Breweries
router.delete("/breweries/:id", function (req, res) {
    db.Brewery.destroy({
        where: {
            id: req.params.id
        }
    }).then(deleteBrewery => {
        if (deleteBrewery === 0) {
            res.status(404).json(deleteBrewery)
        } else {
            
            res.status(200).json(deleteBrewery)
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


module.exports = router;
