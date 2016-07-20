var express = require('express');
var app = express();

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

app.listen(8080, function(){
	console.log('Listening on port 8080');
});