var express = require('express');
var app = express();
var todoController = require('./controllers/todoController')

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers
todoController(app);

// listen to port
app.listen(process.env.PORT || 5000, ()=>{
    console.log('You are listening to port 5000');
});