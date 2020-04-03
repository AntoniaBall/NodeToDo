var Todos = require('../models/todoModel'); // ..
var bodyParser = require('body-parser');

module.exports = function(app) { // 1 entry point

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended:true})); // URL read

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
      });
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
   /*      var newTodo = Todos({
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
     *      parameters: 
     *         - id : id
     *           description : TodoId
     *           type : string
     *           name : id
     *           in : path
     *           required : true
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
     *                   example : update the username with this
     *                   name : username
     *                 todo:
     *                   type : string
     *                   name : todo
     *                   example : update the todo with this
     *                 isDone:
     *                   type : boolean
     *                   name : isDone
     *                   example : true
     *                 hasAttachment:
     *                   type : boolean
     *                   name : hasAttachment
     *                   example : false
     *      responses:
     *          '200':
     *              description : "successfull!"
     *          '404':
     *              description : "not found pouet pouet"
     */
    app.put('/api/todos/:id', function(req,res) {
/*         res.send(req.body.username); // ok
 */
         Todos.findByIdAndUpdate(req.params.id, {
                username : req.body.username,
                todo : req.body.todo,
                isDone : req.body.isDone,
                hasAttachment : req.body.hasAttachment
            }, function(err, todo) {
                res.send('object updated');
            });
    });
}