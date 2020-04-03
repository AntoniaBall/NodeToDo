var Todos = require('../models/todoModel'); // .. je remonte d'un niveau
var bodyParser = require('body-parser');

module.exports = function(app) { // just 1 entry point

/*     app.use(bodyParser.json()); // nous parserons le body en Json
 */    app.use(bodyParser.urlencoded({ extended:true})); // il faudra qu'on soit capable de lire l'URL

    /**
     * @swagger
     * /api/todos:
     *  get:
     *      summary : get all todos
     *      tags: [ToDo]
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
     *      tags: [ToDo]
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
     *      tags: [ToDo]
     *      parameters:
     *         - in : body
     *           required : true
     *           name : todo
     *           schema :
     *              type : object
     *              required:
     *                 - username
     *              properties:
     *                 username:
     *                   type : string
     *                   example : my next to do
     *                 todo:
     *                   type : string
     *                   example : create and test this first api
     *                 isDone:
     *                   type : boolean
     *                   example : true
     *                 hasAttachment:
     *                   type : boolean
     *                   example : false
     *      responses:
     *          '200':
     *              description : "successfull!"
     */
    app.post('/api/todos', function(req, res) {
/*         var newTodo = Todos({
            username: req.body.username,
            todo : req.body.todo,
            isDone: req.body.isDone,
            hasAttachment : req.body.hasAttachment
        }); */
        res.send(JSON.stringify(req.body));
    /*  newTodo.save(function(err) {
                if (err) throw err;
                res.send('add success');
            }); */
    });

    /**
     * @swagger
     * /api/todos/{id}:
     *  delete:
     *      summary : "delete todo by Id"
     *      tags: [ToDo]
     *      parameters:
     *          - id : id
     *            type : string
     *            in : path
     *            name : ToDoId
     *            description : ToDoId
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
     * /api/todos/{id}:
     * 
     *  put:
     *      summary : "update a todo by ID"
     *      tags : [ToDo]
     * 
     *      produces :
     *         - application/json
     *      parameters: 
     *         - username : username
     *           description : id
     *           type : string
     *      responses:
     *          '200':
     *              description : "successfull!"
     *          '404':
     *              description : "not found pouet pouet"
     */
    app.put('/api/todos/:id', function(req,res) {

        Todos.findByIdAndDelete(req.params.id, function(err) {
                if (err) throw err;
                res.send('object deleted !');
            });
    });
}