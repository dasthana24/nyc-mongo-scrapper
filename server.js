// Dependencies
const express    = require("express");
const bodyParser = require("body-parser");
const exphbs     = require("express-handlebars");
const mongoose   = require("mongoose");
const port       = process.env.PORT || 3000 ;

require("dotenv").config();
// Express.
const app = express();

const db = require("./models");
// Database configuration
mongoose.Promise = Promise;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);
mongoose.connection.on("error", console.error.bind(console, "connection error:"));


app.use(express.static("public"));

// Set up Body Parser.
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Set up Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Create routes.
require("./routes/html-routes.js")(app, db);
require("./routes/api-routes.js")(app, mongoose, db);

app.listen(port, function(){
    console.log("App running on port " + port);
});
