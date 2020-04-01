var express = require('express');
var mongoose = require('mongoose');
var app = express();
var config = require('./config');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDBConnectionString(),{useNewUrlParser: true, useUnifiedTopology: true});
app.listen(port);