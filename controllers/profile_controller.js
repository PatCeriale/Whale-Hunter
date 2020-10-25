var express = require("express");
var router = express.Router();
var db = require("../models/");


//get details for one beer
router.get("/profile", function (req, res) {
    db.User.findOne({
        where: {
            id: req.session.user.id
        }
    }).then(user => {
        const userJson = user.toJSON();
        db.Post.findAll({
            where: {
                user_name: user.user_name
            }
        }).then(post => {
            const dbPostsJson = post.map(post => post.toJSON());
            db.Rating.findAll({
                where: {
                    UserId: user.id
                },
                include: {
                    model: db.Beer,
                    include: [db.Rating,db.Brewery,db.Style]
                }
            }).then(ratings =>{
                const dbBeersJson = ratings.map(rating => rating.toJSON());
                const hbsObject = { 
                    user: userJson,
                    post: dbPostsJson,
                    beer: dbBeersJson
                };
                //return res.json(hbsObject);
                return res.render("profile",hbsObject);
            })
        })
    })
})


module.exports = router;
