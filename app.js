var express = require('express');
var mongoose = require('mongoose');
var app = express();
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUIExpress = require('swagger-ui-express');

const SwaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My first API Node', // Title (required)
        version: '1.0.0', // Version (required)
      },
    },
    
    // Path to the API docs
    apis: ['./apiController.js']
  };

const SwaggerDocs = swaggerJSDoc(SwaggerOptions);

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.use('/api-docs', swaggerUIExpress.serve, swaggerUIExpress.setup(SwaggerDocs));

app.set('view engine', 'ejs');

mongoose.connect(config.getDBConnectionString(),{useNewUrlParser: true, useUnifiedTopology: true});

setupController(app);
apiController(app);

app.listen(port);