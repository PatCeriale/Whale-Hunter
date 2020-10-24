var express = require("express");
var router = express.Router();
var db = require("../models/");

//================================================================================
//SixPack Routes
//================================================================================

//Get all sixpacks from the DB
router.get('/sixpacks', function (req, res) {
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
router.post('/sixpacks', function (req, res) {
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
router.put('/sixpacks/:id', function (req, res) {
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
router.delete("/sixpacks/:id/:beer_id", function (req, res) {
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
router.delete("/sixpacks/:id", function (req, res) {
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
