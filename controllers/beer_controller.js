var express = require("express");
var router = express.Router();
var db = require("../models/");

//================================================================================
//Beer Routes
//================================================================================
//Basic redirect route. May change later.
router.get("/", function (req, res) {
    res.redirect("/beers");
});

//Get all beer
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

//Create new beer
router.post("/beers", function (req, res) {
    console.log(req.body.ibu);
    db.Beer.create({
        BreweryID: req.body.BreweryID,
        name: req.body.name,
        description: req.body.description,
        StyleID: req.body.StyleID,
        abv: req.body.abv,
        ibu: req.body.ibu,
        RatingID: req.body.RatingID
    }).then(function (dbBeer) {
        console.log(dbBeer);
        res.redirect("/");
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
            //TODO:We need to add the page to redirect to here
            res.redirect("/");
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//================================================================================
//Styles Routes
//================================================================================

//Get all styles from the DB
router.get('/style', function (req, res) {
    db.Style.findAll().then(style => {
        res.json(style)
        const dbStyleJson = style.map(style => style.toJSON());
        var hbsObject = { style: dbStyleJson };
        console.log(hbsObject)
        return res.json(hbsObject);
        // return res.render("index", hbsObject);
    })
})

//create new style
router.post('/style/', function (req, res) {
    db.Style.create({
        name: req.body.name,
        description: req.body.description
    }).then(newStyle => {
        console.log(newStyle)
        res.redirect("/style");
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

//Delete Style
router.delete("/style/:id", function (req, res) {
    db.Style.destroy({
        where: {
            id: req.params.id
        }
    }).then(deleteStyle => {
        if (deleteStyle === 0) {
            res.status(404).json(deleteStyle)
        } else {
            //TODO:We need to add the page to redirect to here
            res.redirect("/");
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//================================================================================
//SixPack Routes
//================================================================================

//Get all sixpacks from the DB
router.get('/sixpack', function (req, res) {
    db.Sixpack.findAll().then(sixpack => {
        res.json(sixpack)
        const dbSixpackJson = sixpack.map(sixpack => sixpack.toJSON());
        var hbsObject = { sixpack: dbSixpackJson };
        console.log(hbsObject)
        return res.json(hbsObject);
        // return res.render("index", hbsObject);
    })
})

//TODO:Get a specific sixpack with a specific ID
router.get("/sixpacks/:id", function (req, res) {
    db.Sixpack.findAll({
        where: {
            id: req.params.id
        }
    }).then(sixpack => {
        res.json(sixpack)
        const dbSixpackJson = sixpack.map(sixpack => sixpack.toJSON());
        var hbsObject = { sixpack: dbSixpackJson };
        console.log(hbsObject)
        return res.json(hbsObject);
        // return res.render("index", hbsObject);
    })
})


//TODO:Get all sixpacks associated with a user
router.get("/sixpacks/:customer_id", function (req, res) {
    db.Sixpack.findAll({
        where: {
            //TODO:How do we match this ID with a user
            customer_id: req.params.customer_id
        }
    }).then(sixpack => {
        res.json(sixpack)
        const dbSixpackJson = sixpack.map(sixpack => sixpack.toJSON());
        var hbsObject = { sixpack: dbSixpackJson };
        console.log(hbsObject)
        return res.json(hbsObject);
        // return res.render("index", hbsObject);
    })
})

//create new sixpack
router.post('/sixpack', function (req, res) {
    console.log(req.body)
    db.Sixpack.create({
        //TODO:how do I get beer_id and customer_id as foreign keys to populate?
        BeerId: req.body.beer_id,
        CustomerId: req.body.customer_id,
        name: req.body.name,
    }).then(newSixpack => {
        console.log(newSixpack)
        res.redirect("/sixpack");
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

//Add a new beer to my sixpack
router.put('/sixpack/:id', function (req, res) {
    db.Sixpack.findOne({
        where: {
            id: req.params.id
        }
    }).then(updateSixpack => {
        if (!updateSixpack) {
            res.status(404).json(updateSixpack)
        } else {
            updateSixpack.addBeer(req.body.beer_id)
            res.json(updateSixpack)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

//Delete a beer in a sixpack
router.delete("/sixpack/:id/:beer_id", function (req, res) {
    db.Sixpack.findOne({
        where: {
            id: req.params.id
        }
    }).then(updateSixpack => {
        if (!updateSixpack) {
            res.status(404).json(updateSixpack)
        } else {
            updateSixpack.removeBeer(req.params.beer_id)
            res.json(updateSixpack)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

//Delete entire Sixpack
router.delete("/sixpack/:id", function (req, res) {
    db.Sixpack.destroy({
        where: {
            id: req.params.id
        }
    }).then(deleteSixpack => {
        if (deleteSixpack === 0) {
            res.status(404).json(deleteSixpack)
        } else {
            //TODO:We need to add the page to redirect to here
            res.redirect("/");
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;