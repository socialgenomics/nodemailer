var nodemailer = require("nodemailer");
var express  = require('express');
var bodyParser   = require('body-parser');
var mongoose = require('mongoose');

var app      = express();
var port     = process.env.PORT || 8080;

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.set('view engine', 'ejs');


// routes ======================================================================
require('./routes.js')(app); // load our routes and pass in our app 


// launch ======================================================================
app.listen(port);
//console.log('The email has been sent successfully');
