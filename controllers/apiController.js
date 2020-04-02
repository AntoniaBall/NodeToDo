var Todos = require('../models/todoModel'); // .. je remonte d'un niveau
var bodyParser = require('body-parser');

module.exports = function(app) { // just 1 entry point

    app.use(bodyParser.json()); // nous parserons le body en Json
    app.use(bodyParser.urlencoded({ extended:true})); // il faudra qu'on soit capable de lire l'URL

    /**
     * @swagger
     * /todos :
     *  get:
     *      description : my first topic
     *      responses:
     *          '200':
     *              description : "successfull!"
     */
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

    app.post('/api/todo', function(req, res) {

        if(req.body.id) {
            Todos.findByIdAndUpdate({
                    todo : req.body.todo,
                    isDone : req.body.isDone,
                    hasAttachment : req.body.hasAttachment
            }, function(err, result) {
                if (err) throw err;
                res.send('success');
            });
        }

        else {
            var newTodo = Todos({
                username: 'test',
                todo : req.body.todo,
                isDone: req.body.isDone,
                hasAttachment : req.body.hasAttachment
            });
            newTodo.save(function(err) {
                res.send('add success');
            });
        }
    });

    app.delete('/api/delete/:id', function(req, res) {

        if (!req.params.id) {
            res.send('not found');
        }
        else {
            Todos.findByIdAndDelete(req.body.id, function(err) {
                if (err) throw err;
                res.send('object deleted')
            });
        }
    });
}