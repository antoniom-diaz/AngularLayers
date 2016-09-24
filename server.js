var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost:27017/angularLayers');

var Town = mongoose.model('Town',{
    name: String,
    code: String
});

app.configure(function() {  
    // Localización de los ficheros estÃ¡ticos
    app.use('/public', express.static(__dirname + '/public'));
    // Muestra un log de todos los request en la consola        
    app.use(express.logger('dev'));
    // Permite cambiar el HTML con el método POST                   
    app.use(express.bodyParser());
    // Simula DELETE y PUT                      
    app.use(express.methodOverride());
});

app.get('/angularlayers', function(req, res){
	res.sendfile('./index.html');
});

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

app.listen(8080, function(){
	console.log('Listening on port 8080');
});