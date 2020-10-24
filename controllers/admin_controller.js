var express = require("express");
var router = express.Router();
var db = require("../models/");
  
//================================================================================
//Admin Route
//================================================================================

router.get("/admin", function (req, res) {
    if(req.session.employee){
        db.Employee.findAll().then(employees => {
            const dbEmployeeJson = employees.map(employee => employee.toJSON());
            db.Style.findAll().then(styles => {
                const dbStylesJson = styles.map(style => style.toJSON()); 
                db.Brewery.findAll().then(breweries => {
                    const dbBreweryJson = breweries.map(brewery => brewery.toJSON()); 
                    db.Beer.findAll().then(beers => {
                        const dbBeerJson = beers.map(beer => beer.toJSON());
                        var hbsObject = { 
                            employee: dbEmployeeJson,
                            style: dbStylesJson,
                            brewery: dbBreweryJson,
                            beer: dbBeerJson 
                        };
                        return res.render("admin",hbsObject);
                    })
                })
            })    
        });
    } else {
        res.redirect("/employeelogin")
    }
})    

//Signup and Login Routes
//================================================================================

router.get('/signup', (req, res) => {
    return res.render("signup");
})
router.get('/employeelogin', (req, res) => {
    return res.render("employeelogin");
})

router.get('/login', (req, res) => {
    return res.render("userlogin");
})

module.exports = router;