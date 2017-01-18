
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

var baseMapsGroup = new ol.layer.Group({
  name: 'Base maps',
  layers: [openStreetMapLayer, pnoaLayer]
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

var administrativeBoundaryGroup = new ol.layer.Group({
  name: 'Administrative boundaries',
  layers: [adminLayer, usaStatesLayer]
});

var map = new ol.Map({ 
   layers: [ 
      baseMapsGroup, administrativeBoundaryGroup
   ], 
   target: 'map', 
   view: new ol.View({
     extent: ol.proj.get("EPSG:3857").getExtent(),
     center: [0, 0], 
     zoom: 2,
     minZoom: 2,
     maxZoom: 20
   }) 
});

var coordinatesControl = new ol.control.MousePosition({
  coordinateFormat : function(coordinates) {
    var x = coordinates[0].toFixed(2);
    var y = coordinates[1].toFixed(2);
    var textCoordinates = 'EPSG : 3857 Datum : WGS84 - coordinates: ' + x +', ' + y;
    return textCoordinates;
  },
  target : document.getElementById('coordinates-window'),
  className : 'custom-mouse-position',
  undefinedHTML : 'EPSG : 3857 Datum : WGS84'
});
map.addControl(coordinatesControl);
var scaleLineControl = new ol.control.ScaleLine();
map.addControl(scaleLineControl);
var zoomSlider = new ol.control.ZoomSlider();
map.addControl(zoomSlider);