var Todos = require('../models/todoModel'); // .. je remonte d'un niveau

module.exports = function(app) {

    app.get('/api/home', function(req,res){
        res.send('Home API');
    });

    app.get('/api/nodeToDo/add', function(req,res){

        var starterTodos = [
            {
                "username":"my first todo",
                "todo":"setup this app in nodeJS",
                isDone:false,
                hasAttachment:false
            },
            {
                "username":"my second todo",
                "todo":"construc the model and add starter data",
                isDone:false,
                hasAttachment:false
            },
            {
                "username":"my thirst todo",
                "todo":"creating my first API",
                isDone:false,
                hasAttachment:false
            }
        ];
        Todos.create(starterTodos, function (erro, results){
            res.send(results);
        });
    });
}