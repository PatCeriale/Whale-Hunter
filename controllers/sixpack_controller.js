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
        var hbsObject = { 
            sixpack: dbSixpackJson,
            user : req.session.user,
            employee: req.session.employee
             };
        return res.json(hbsObject);
        // return res.render("index", hbsObject);
    })
})

//Get the current sixpack in user session
router.get("/user/sixpack/", function (req, res) {
    if(req.session.user && req.session.sixpack){      
    db.Sixpack.findAll({
        where: {
            id: req.session.sixpack.id
        },
        include: {
            model: db.Beer,
            include: [db.Rating,db.Brewery,db.Style]
        }
    }).then(sixpack => {
        //res.json(sixpack[6])
        const dbSixpackJson = sixpack.map(sixpack => sixpack.toJSON());
        // const dbBeerJson = sixpack[5].map(beer => beer.toJSON());
        var hbsObject = { 
            sixpack: dbSixpackJson,
            user : req.session.user,
            employee: req.session.employee
        };
        // return res.json(hbsObject);
        return res.render("sixpack", hbsObject);
    })
} else {
    res.redirect("/user/sixpacks/")
}
})

// Get all sixpacks associated with a logged in user
router.get("/user/sixpacks/", function (req, res) {
    db.Sixpack.findAll({
        where: {
            UserId: req.session.user.id
        },
        include: {
            model: db.Beer,
            include: [db.Rating,db.Brewery,db.Style]
        }
    }).then(sixpack => {
        const dbSixpackJson = sixpack.map(sixpack => sixpack.toJSON());
        var hbsObject = { 
            sixpack: dbSixpackJson,
            user : req.session.user,
            employee: req.session.employee,
         };
        //return res.json(hbsObject);
        return res.render("sixpacks", hbsObject);
    })
})

// Switch to new sixpack and view sixpack
router.get('/user/sixpacks/:id', function (req, res) {
        req.session.sixpack = {
            id: req.params.id
        }
        res.redirect("/user/sixpack");
})


//create new sixpack
router.post('/sixpacks', function (req, res) {
    db.Sixpack.create({        
        UserId: req.session.user.id,
        name: req.body.name,
    }).then(newSixpack => {
        req.session.sixpack = {
            id: newSixpack.id,
            name: newSixpack.name
        }
        res.redirect("/user/sixpack");
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

//Add a new beer to my sixpack
router.put('/sixpacks/:id', function (req, res) {
    db.Sixpack.findOne({
        where: {
            id: req.session.sixpack.id
        }
    }).then(updateSixpack => {
        if (!updateSixpack) {
            res.status(404).json(updateSixpack)
        } else {
            updateSixpack.addBeer(req.params.id)
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
            
            res.status(200).json(deleteSixpack)
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;
