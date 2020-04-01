var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema ({
    username:String,
    todo:String,
    isDone:Boolean,
    hasAttachment:Boolean
});

var Todos = mongoose.model('Todos', todoSchema); // todos will be the name of the collection

module.exports = Todos;