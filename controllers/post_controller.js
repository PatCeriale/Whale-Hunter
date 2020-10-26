var express = require("express");
var router = express.Router();
var db = require("../models/");


router.get("/userpost", function (req, res) {
    return res.render("userpost",{ user: req.session.user });
});

router.post("/userpost", function (req, res) {

    db.Post.create({
        user_name: req.body.user_name,
        title: req.body.title,
        description: req.body.description,
        beer_name: req.body.beer_name,
        brewery_name: req.body.brewery_name,
        image: req.body.image
    }).then(newPost => {
        res.redirect("/");
      }).catch(err => {
        console.log(err)
        res.status(500).json(err);
      })
});


module.exports = router;


