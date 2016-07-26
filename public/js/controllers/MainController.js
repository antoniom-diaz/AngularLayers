app.controller('mainController',function($scope){

  $scope.layers = [];  

  map.getLayers().forEach(function(layer){
    $scope.layers.push(layer);
  });

  $scope.toggleLayer = function(layer) {
    var toggle = !(layer.getVisible());

    layer.setVisible(toggle);
  }
});