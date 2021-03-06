const express = require('express');
const router= express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const session = require('express-session');

//================================================================================
//Regular user Routes
//================================================================================

//Sign up a regular user
router.post('/signup', (req, res) => {
    db.User.create({
        user_name: req.body.user_name,
        password: req.body.password
    }).then(newUser => {
        const newUserJson = newUser.toJSON();
        const hbsObject = {userNew : newUserJson};
        return res.render("userlogin", hbsObject);
    }).catch(err => {
        console.log(err);
        res.status(500).send("server error")
    })
})
//User login
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
            return res.redirect("/")
        } else {
            return res.status(401).send("incorrect password");
        }
    })
})

//================================================================================
//Employee Routes
//================================================================================

//Sign up a new employee
router.post('/employeesignup', (req, res) => {
    db.Employee.create({
        user_name: req.body.user_name,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    }).then(newUser => {
        res.json(newUser)
    }).catch(err => {
        console.log(err);
        res.status(500).send("server error")
    })
})

//Employee login
router.post("/employeelogin", (req,res)=>{
    db.Employee.findOne({
        where:{user_name:req.body.user_name}
    }).then(employee=>{
        if(!employee) {
            return res.status(404).send("Get a job! You're not an employee here, buddy.")
        }else if(bcrypt.compareSync(req.body.password,employee.password)){
            req.session.employee = {
                user_name: employee.user_name,
                first_name: employee.first_name,
                last_name: employee.last_name,
                active: employee.active,
                id:employee.id
            }
            return res.redirect("/admin")
        } else {
            req.session.destroy();
            return res.status(401).send("incorrect password");
        }
    })
})

router.get("/secretstuff", (req,res)=>{
    if(req.session.user || req.session.employee){
        res.send("Secretsssss")
    } else {
        res.status(401).send("You're not logged in!")
    }
})

router.get("/sessiondata", (req,res)=>{
    res.json(req.session)
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    return res.redirect("/")
})

module.exports = router;