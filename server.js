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

app.get('/', function(req, res){
	res.sendfile('./index.html');
});

app.get('/api/towns', function(req, res) {  
    /*Town.create({
        name: 'Almendralejo',
        code: '06200'
    }, function(err, town){
        if(err) {
            res.send(err);
        }*/

        Town.find(function(err, towns) {
            if(err){
                res.send(err);
            }
            res.json(towns);
        });
    //});
});

app.listen(8080, function(){
	console.log('Listening on port 8080');
});