var express = require("express");
var router = express.Router();
var db = require("../models/");

//================================================================================
//Employee Routes
//================================================================================

//Get all employees from the DB
router.get('/employees', function (req, res) {
    if (!req.session.employee) {
        res.redirect("/employeelogin")
    } else {
        db.Employee.findAll().then(employee => {
            res.json(employee)
            const dbEmployeeJson = employee.map(employee => employee.toJSON());
            var hbsObject = { employee: dbEmployeeJson };
            console.log(hbsObject)
            return res.json(hbsObject);
            // return res.render("index", hbsObject);
        })
    };
})

//Get one employees from the DB
router.get('/employees/:id', function (req, res) {
    db.Employee.findOne({
        where: {
            id: req.params.id
        }
    }).then(employee => {
        res.json(employee)
        return res.json(hbsObject);
        // return res.render("index", hbsObject);
    })
})

//create new employee
router.post('/employees', function (req, res) {
    db.Employee.create({
        user_name: req.body.user_name,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        active: req.body.active
    }).then(newEmployee => {
        console.log(newEmployee)
        res.redirect("/admin");
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

//Delete employee
router.delete("/employees/:id", function (req, res) {
    db.Employee.destroy({
        where: {
            id: req.params.id
        }
    }).then(deleteEmployee => {
        if (deleteEmployee === 0) {
            res.status(404).json(deleteEmployee)
        } else {
            //TODO:We need to add the page to redirect to here
            res.status(200).json(deleteEmployee)
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


module.exports = router;
