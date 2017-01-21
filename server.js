var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/angularLayers');

// MongoDB Model
var Town = mongoose.model('Town',{
    name: String,
    code: String
});

// Make available static files
app.use('/public', express.static(__dirname + '/public'));

// Server logging
app.use(morgan('dev'));

// Parses Post data
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.get('/angularlayers', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// REST API
app.get('/angularlayers/api/towns', function(req, res) {  

    Town.find(function(err, towns) {
        if(err){
            res.send(err);
        }
        res.json(towns);
    });

});

app.post('/angularlayers/api/createTown', function(req, res){

    Town.create({
        name:req.body.name,
        code:req.body.code
    }, function(err, town){
        if(err) {
            res.send(err);
        } else {
            res.send(req.body.name + ' created');
        }
    });

});

app.post('/angularlayers/api/findTown', function(req, res){

    Town.find({
        name: req.body.name
    }, function(err, towns){
        if(err){
            res.send(err);
        }
        res.json(towns);
    });

});

app.post('/angularlayers/api/removeTown', function(req, res){

    Town.remove({
        name: req.body.name
    }, function(err, town){
        if(err){
            res.send(err);
        } else {
            res.send(req.body.name + ' removed');
        }
    });

});

// Port configuration
app.listen(8080, function(){
	console.log('Listening on port 8080');
});