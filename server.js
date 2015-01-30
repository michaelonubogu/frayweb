// server.js

// set up ========================
var express  = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var ebook_api_key = 'a4b3oyxxoq7edzvqa4mn3gv6jxkyslrf';

var sys = require('util'),
    fs = require('fs'),
    rest = require('./node_modules/restler'); // https://npmjs.org/package/restler

//configuration =================

//mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/scrybe'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// or, as `req.files` is only provided by the multipart middleware, you could
// add just that if you're not concerned with parsing non-multipart uploads,
// like:
app.use(methodOverride());


/*app.get('/api/todos', function(req, res) {
    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.json(todos); // return all todos in JSON format
    });
});

app.get('/api/books', function(req, res) {
    //res.send(err)
    //res.json(todos);
});

app.post('/api/books', function(req, res) {
    //res.send(err)
    //res.json(todos);
});*/

app.post('/api/upload', multipartMiddleware, function(req, res){
    //console.log(JSON.stringify(req.files));
    //console.log(req.files.file.path);
    //var headers = JSON.parse(req.files.file.headers);
    //console.log(req.files.file.headers['content-type']);
    /*fs.stat(req.files.file.path, function(err, stats) {
        rest.get("https://ebookglue.com/convert", {
            'multipart': true,
            'data': {
                'token': 'a4b3oyxxoq7edzvqa4mn3gv6jxkyslrf',
                'file': rest.file(req.files.file.path, null, stats.size, null, req.files.file.headers['content-type'])
            }
        }).on('complete', function (data, response) {
            sys.puts(response.statusCode);
            console.log(response.statusCode);
            console.log(JSON.stringify(data));
        });
    });*/
});

app.get('*', function(req, res) {
    res.sendfile('./scrybe/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// delete a todo
/*app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});*/

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");