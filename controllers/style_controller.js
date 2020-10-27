var express = require("express");
var router = express.Router();
var db = require("../models/");

//================================================================================
//Styles Routes
//================================================================================

//Get all styles from the DB
router.get('/styles', function (req, res) {
    db.Style.findAll().then(style => {

        const dbStyleJson = style.map(style => style.toJSON());
        var hbsObject = {
            style: dbStyleJson,
            user: req.session.user,
            employee: req.session.employee
         };
        //return res.json(hbsObject);
        return res.render("beerstyles", hbsObject);
    })
})

//get details for one style
router.get("/styles/:id", function (req, res) {
    db.Style.findOne({
        where: {
            id: req.params.id
        }
    }).then(style => {
        return res.json(style)
    })
})

router.get("/findstyle/:id", function (req, res) {
    db.Style.findOne({
        where: {
            id: req.params.id
        }
    }).then(style => {
        const dbStyleJson = style.toJSON();
        db.Beer.findAll({
            where: {
                StyleId: req.params.id
            }
        }).then(beers => {
            const dbBeersJson = beers.map(beer => beer.toJSON());
            console.log("The style name is: ", style.name);
            var hbsObject = {
                name: style.name,
                style: dbStyleJson,
                beer: dbBeersJson
            };
            console.log("Here's hbsObject.style: ", hbsObject.style);
            return res.render("singlestyle", hbsObject);
        })
    })
})

//create new style
router.post('/styles/', function (req, res) {
    db.Style.create({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    }).then(newStyle => {
        res.redirect("/admin");
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

//Update Style
router.put('/styles/:id', function (req, res) {
    db.Style.update({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    }, {
        where: {
            id: req.params.id
        }
    }).then(updateStyle => {
        if (updateStyle[0] === 0) {
            res.status(404).json(updateStyle)
        } else {
            res.status(200).json(updateStyle)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

//Delete Style
router.delete("/styles/:id", function (req, res) {
    db.Style.destroy({
        where: {
            id: req.params.id
        }
    }).then(deleteStyle => {
        if (deleteStyle === 0) {
            res.status(404).json(deleteStyle)
        } else {

            res.status(200).json(deleteStyle)
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})



module.exports = router;
