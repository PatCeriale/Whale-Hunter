// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var moment = require("moment");
// Requiring our models for syncing
var db = require("./models");

// Sets up the Express App
// =============================================================
var app = express();
require("dotenv").config();

// Static directory
app.use(express.static(__dirname + "/public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

// Creating custom helper
const hbs = exphbs.create({});
hbs.handlebars.registerHelper('newDate', function(dateTime) {
  return moment(dateTime).format('D MMM YYYY @ H:mm');
});

hbs.handlebars.registerHelper('adjustCloudinary', function(str) {
  const linkBeginning = str.substring(0,50);
  const addParams = "w_300,h_200,c_fill,f_png"
  const linkEnd = str.substring(49);
  const newString = linkBeginning + addParams + linkEnd;
  return new hbs.handlebars.SafeString(newString)
});

const session = require("express-session");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
    },
  })
);

const admin_routes = require("./controllers/admin_controller.js");
const authPost_routes = require("./controllers/auth_controller.js");
const beer_routes = require("./controllers/beer_controller.js");
const brewery_routes = require("./controllers/brewery_controller.js");
const employee_routes = require("./controllers/employee_controller.js");
const post_routes = require("./controllers/post_controller.js");
const profile = require("./controllers/profile_controller.js");
const rating_routes = require("./controllers/rating_controller.js");
const sixpack_routes = require("./controllers/sixpack_controller");
const style_routes = require("./controllers/style_controller.js");
const styledetails_routes = require("./controllers/styledetails_controller.js");

app.use(admin_routes);
app.use(authPost_routes);
app.use(beer_routes);
app.use(brewery_routes);
app.use(employee_routes);
app.use(post_routes);
app.use(profile);
app.use(rating_routes);
app.use(sixpack_routes);
app.use(style_routes);
app.use(styledetails_routes);


var PORT = process.env.PORT || 8080;

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("Listening for your beer selection on PORT " + PORT);
  });
});
