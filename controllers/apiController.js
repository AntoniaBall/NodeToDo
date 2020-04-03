var Todos = require('../models/todoModel'); // .. je remonte d'un niveau
var bodyParser = require('body-parser');

module.exports = function(app) { // just 1 entry point

    app.use(bodyParser.json()); // nous parserons le body en Json
    app.use(bodyParser.urlencoded({ extended:true})); // il faudra qu'on soit capable de lire l'URL

    /**
     * @swagger
     * /api/todos:
     *  get:
     *      summary : get all todos
     *      responses:
     *          '200':
     *              description : "successfull!"
     *          '404':
     *              description : "not found pouet pouet"
     */
    app.get('/api/todos', function(req, res) {
        Todos.find({}, function(err,todos) {
            if(err) throw err;
            res.send(todos);
        });
    });

    /**
     * @swagger
     * /api/todos/{id}:
     *  get:
     *      summary : find a todo by Id
     *      parameters:
     *         - id : id
     *           description : TodoId
     *           type : string
     *           name : id
     *           in : path
     *           required : true
     *      responses:
     *          '200':
     *              description : "successfull!"
     *          '404':
     *              description : "not found pouet pouet"
     */
    app.get('/api/todos/:id', function(req, res) {
        Todos.findById(req.params.id, function(err, todo) {   
            if (err) throw err;
            res.send(todo);
/*             res.send(req.params.id);
 */        });
        // :id
    });

    /**
     * @swagger
     * /api/todos:
     *  post:
     *      summary : "Add a to do"
     *      parameters:
     *         - in : body
     *           required : true
     *           name : todo
     *           schema :
     *             type : object
     *             properties :
     *              - username :
     *                  type : string
     *              - todo :
     *                  type : string
     *              - isDone :
     *                  type : Boolean
     *              - hasAttachment :
     *                  type : Boolean
     *      responses:
     *          '200':
     *              description : "successfull!"
     */
    app.post('/api/todos', function(req, res) {
 /*        if(req.body.id) {
            Todos.findByIdAndUpdate({
                    todo : req.body.todo,
                    isDone : req.body.isDone,
                    hasAttachment : req.body.hasAttachment
            }, function(err, result) {
                if (err) throw err;
                res.send('success');
            });
        }
        else { */
            var newTodo = Todos({
                username: 'test',
                todo : req.body.todo,
                isDone: req.body.isDone,
                hasAttachment : req.body.hasAttachment
            });
            newTodo.save(function(err) {
                if (err) throw err;
                res.send('add success');
            });
/*         } */
    });

    /**
     * @swagger
     * /api/todos/:id:
     *  delete:
     *      summary : "delete todo by Id"
     *      responses:
     *          '200':
     *              description : "successfull!"
     */
    app.delete('/api/todos/:id', function(req, res) {

        if (!req.params.id) {
            res.send('not found');
        }
        else {
            Todos.findByIdAndDelete(req.body.id, function(err) {
                if (err) throw err;
                res.send('object deleted');
            });
        }
    });

    /**
     * @swagger
     * /api/todos/:id:
     * 
     *  put:
     *      summary : "update a todo by ID"
     *      produces :
     *         - application/json
     *      parameters: 
     *         - username : username
     *           description : username
     *           type : string
     *      responses:
     *          '200':
     *              description : "successfull!"
     *          '404':
     *              description : "not found pouet pouet"
     */
    app.put('/api/todos/:id', function(req,res) {

        Todos.find({ _id : req.params.id},
            function(err, todo) {
                if (err) throw err;

                res.send(todo);
            });
    });
}