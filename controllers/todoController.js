var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database
const URI = "mongodb+srv://test:test@todo.9vw1d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(URI,{useNewUrlParser: true});

mongoose.connection.once('open', function(){
    console.log('connection has been made.');
}).on('error', function(error){
    console.log('error is', error);
});

// create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
}); 


// model
var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item:'Get done with all the saved bookmarks.'}).save(function(err){
//     if (err) throw err;
//     console.log('item saved');
// });

// var data = [{item: 'getting ready for futsal'},
// {item: 'getting ready for classes'},
// {item: 'daily coding'},
// {item: 'kick off spanish class'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function (app){

    // // for local data 
    // app.get('/todo', function(req, res){
    //     res.render('todo', {todos: data});
    // });

    app.get('/', function(req, res){
        // get data from mongodb and pass it to view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        }); 
    });

    // // add data to view : local
    // app.post('/todo', urlencodedParser, function(req, res){
    //     data.push(req.body);
    //     res.json(data);
    // });

    app.post('/', urlencodedParser, function(req, res){
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });

    // delete local data
    // app.delete('/todo/:item', function(req, res){
    //     data = data.filter(function(todo){
    //         return todo.item.replace(/ /g, '-') !== req.params.item;
    //     });
    //     res.json(data);
    // });

    app.delete('/:item', function(req, res){
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });
};