
var openStreetMapLayer = new ol.layer.Tile({
        name: 'OpenStreetMap map', 
        source: new ol.source.OSM() 
     });

var pnoaLayer = new ol.layer.Image({
          name: 'PNOA Map',
          source: new ol.source.ImageWMS({
            url: 'http://www.ign.es/wms-inspire/pnoa-ma',
            params : {
                        'LAYERS' : 'OI.OrthoimageCoverage'
                      }
          }),
          visible: false
        });

var adminLayer = new ol.layer.Image({
          name: 'Spain administrative units',
          source: new ol.source.ImageWMS({
            url: 'http://www.ign.es/wms-inspire/unidades-administrativas',
            params : {
                        'LAYERS' : 'AU.AdministrativeBoundary'
                      }
          }),
          visible: false
        });

var usaStatesLayer = new ol.layer.Image({
          name: 'USA States',
          visible: false,
          extent: [-13884991, 2870341, -7455066, 6338219],
          source: new ol.source.ImageWMS({
            url: 'http://demo.boundlessgeo.com/geoserver/wms',
            params: {'LAYERS': 'topp:states'},
            serverType: 'geoserver'
          })
        });

var map = new ol.Map({ 
   layers: [ 
      openStreetMapLayer, pnoaLayer, adminLayer, usaStatesLayer
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