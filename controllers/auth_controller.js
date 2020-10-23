const express = require('express');
const router= express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
    db.User.create({
        user_name: req.body.user_name,
        password: req.body.password
    }).then(newUser => {
        res.json(newUser)
    }).catch(err => {
        console.log(err);
        res.status(500).send("server error")
    })
})

router.post("/login", (req,res)=>{
    db.User.findOne({
        where:{user_name:req.body.user_name}
    }).then(user=>{
        if(!user) {
            return res.status(404).send("User not found")
        }else if(bcrypt.compareSync(req.body.password,user.password)){
            req.session.user = {
                user_name: user.user_name,
                id:user.id
            }
            return res.status(200).send(req.session)
        } else {
            return res.status(401).send("incorrect password");
        }
    })
})

router.get("/secretstuff", (req,res)=>{
    if(req.session.user){
        res.send("Secretsssss")
    } else {
        res.status(401).send("You're not logged in!")
    }
})

router.get("/sessiondata", (req,res)=>{
    res.json(req.session)
})
// router.post('/login', (req, res) => {
//     db.User.findOne({
//         where: { email: req.body.email }
//     }).then(user => {
//         //check if user entered password matches db password
//         if (!user) {
//             req.session.destroy();
//             return res.status(401).send('incorrect email or password')

//         } else if (bcrypt.compareSync(req.body.password, user.password)) {
//             req.session.user = {
//                 email: user.email,
//                 id: user.id
//             }
//             return res.redirect("/myprofile")
//         }
//         else {
//             req.session.destroy();
//             return res.status(401).send('incorrect email or password')
//         }
//     })
// })

// router.get('/logout', (req, res) => {
//     req.session.destroy();
//     res.send('logged out')
// })

// router.get("/sessiondata", (req, res) => {
//     res.json(req.session)
// })



module.exports = router;