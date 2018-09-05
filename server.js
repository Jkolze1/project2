require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var db = require("./models");
// var OAuth2Client = require("google-auth-library");
// var client = new OAuth2Client(CLIENT_ID);
// function verify() {
//   var ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: CLIENT_ID,
//   });
// }

var app = express();
var port = process.env.PORT || 8000

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/car-api-routes")(app);
require("./routes/user-api-routes")(app);
require("./routes/html-routes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
server.listen(port, function() {
  console.log("App is running on port " + port);
});
 

module.exports = app;
