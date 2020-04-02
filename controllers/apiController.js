var Todos = require('../models/todoModel'); // .. je remonte d'un niveau
var bodyParser = require('body-parser');

module.exports = function(app) { // just 1 entry point

    app.use(bodyParser.json()); // nous parserons le body en Json
    app.use(bodyParser.urlencoded({ extended:true})); // il faudra qu'on soit capable de lire l'URL

    app.get('/api/home', function(req, res) {
        res.send('Home API Controller');
    });

    app.get('/api/todo/:uname', function(req,res) {

        Todos.findOne({ username : req.params.uname},
            function(err, todos) {
                if (err) throw err;

                res.send(todos);
            });
    });
}