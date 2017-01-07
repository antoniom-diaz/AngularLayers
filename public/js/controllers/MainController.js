app.controller('mainController', function($scope, $uibModal, $http){

  $scope.layers = [];
  $scope.places = [];
  $scope.gazetteer = {};

  $scope.collapseLayersPanel = false;
  $scope.collapseUserPanel = false;

  var gridData;
  var textAlert;

  map.getLayers().forEach(function(layer){
    $scope.layers.push(layer);
  });

  $scope.toggleLayer = function(layer) {
    var toggle = !(layer.getVisible());

    layer.setVisible(toggle);
  }

  $scope.changeTownCodeCreate = function(townCodeCreate) {
    $scope.townCodeCreate = townCodeCreate;
  }

  $scope.changeTownNameCreate = function(townNameCreate) {
    $scope.townNameCreate = townNameCreate;
  }

  $scope.changeTownNameFind = function(townNameFind) {
    $scope.townNameFind = townNameFind;
  }

  $scope.changeTownNameRemove = function(townNameRemove) {
    $scope.townNameRemove = townNameRemove;
  }

  $scope.queryDatabase = function() {

     $http.get('/angularlayers/api/towns')
      .success(function(response){
        
        gridData = [];
        
        for (var i = 0; i<response.length; i++) {
          gridData.push({name: response[i]['name'], code : response[i]['code']});
        }

        $uibModal.open({
          animation : true,
          renderTo : 'map',
          controller : function($scope, $uibModalInstance) {
            $scope.gridData = gridData;

            $scope.close = function() {
              $uibModalInstance.dismiss('cancel');
            }
          },
          templateUrl: 'public/js/directives/dialog.html'
        });
      })
      .error(function(error){
        console.log(error);
      });
  }

  $scope.createElement = function() {

    var town = {name:$scope.townNameCreate, code:$scope.townCodeCreate};

    $http.post('/angularlayers/api/createTown', town)
      .success(function(response){

        textAlert = response;

        $uibModal.open({
          animation : true,
          renderTo : 'map',
          controller : function($scope, $uibModalInstance) {
            $scope.textAlert = textAlert;

            $scope.close = function() {
              $uibModalInstance.dismiss('cancel');
            }
          },
          templateUrl: 'public/js/directives/alert.html'
        });
      })
      .error(function(error){
        console.log(error);
      });
  }

  $scope.findElement = function() {

    var town = {name: $scope.townNameFind};

    $http.post('/angularlayers/api/findTown', town)
      .success(function (response){

        gridData = [];
        
        for (var i = 0; i<response.length; i++) {
          gridData.push({name: response[i]['name'], code : response[i]['code']});
        }

        $uibModal.open({
          animation : true,
          renderTo : 'map',
          controller : function($scope, $uibModalInstance) {
            $scope.gridData = gridData;

            $scope.close = function() {
              $uibModalInstance.dismiss('cancel');
            }
          },
          templateUrl: 'public/js/directives/dialog.html'
        });
      })
      .error(function(error){
        console.log(error)
      });
  }

  $scope.removeElement = function() {

    var town = {name: $scope.townNameRemove};

    $http.post('/angularlayers/api/removeTown', town)
      .success(function (response){

        textAlert = response;

        $uibModal.open({
          animation : true,
          renderTo : 'map',
          controller : function($scope, $uibModalInstance) {
            $scope.textAlert = textAlert;

            $scope.close = function() {
              $uibModalInstance.dismiss('cancel');
            }
          },
          templateUrl: 'public/js/directives/alert.html'
        });
      })
      .error(function(error){
        console.log(error);
      });
  }

  $scope.refreshPlaces = function(selected) {
    $http.get('http://nominatim.openstreetmap.org/search',{
      params : {
        q : selected,
        format : 'json',
        limit : 10
      }
    })
    .success(function(response) {
      $scope.places = response;
    });
  }

  $scope.placeSelection = function(selectedPlace) {
    var x = Number(selectedPlace.lon);
    var y = Number(selectedPlace.lat);

    var pointSelected = new ol.geom.Point([x, y]);
    pointSelected.transform('EPSG:4326', 'EPSG:3857');

    map.getLayers().forEach(function(layer) {
      if (layer.get('name') == 'gazetteerLayer') {
        map.removeLayer(layer);
      }
    });

    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        anchor : [0.5, 1],
        scale : 0.05,
        src: 'public/img/marker.png'
      }))
    });
    
    map.addLayer(new ol.layer.Vector({
      name : 'gazetteerLayer',
      style : iconStyle,
      source : new ol.source.Vector({
        features : [new ol.Feature(pointSelected)]
      })
    }));

    var mapView = map.getView();
    mapView.setCenter(pointSelected.getCoordinates());
    mapView.setZoom(11);
  }

  $scope.clearGazetteer = function() {
    map.getLayers().forEach(function(layer) {
      if (layer.get('name') == 'gazetteerLayer') {
        map.removeLayer(layer);
      }
    });

    $scope.gazetteer = {};
  }
});

