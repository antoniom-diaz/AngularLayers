
var openStreetMapLayer = new ol.layer.Tile({
        name: 'OpenStreetMap map', 
        source: new ol.source.OSM() 
     });

var map = new ol.Map({ 
   layers: [ 
      openStreetMapLayer
   ], 
   target: 'map', 
   view: new ol.View({ 
     center: [0, 0], 
     zoom: 2 
   }) 
});

angular.module('angularLayers', []);

function mainController($scope){

  $scope.layers = [];  

  map.getLayers().forEach(function(layer){
    $scope.layers.push(layer);
  });

  $scope.toggleLayer = function(layer) {
    var toggle = !(layer.getVisible());

    layer.setVisible(toggle);
  }
}