app.controller('mainController',function($scope, $mdDialog, $http){

  $scope.layers = [];  

  map.getLayers().forEach(function(layer){
    $scope.layers.push(layer);
  });

  $scope.toggleLayer = function(layer) {
    var toggle = !(layer.getVisible());

    layer.setVisible(toggle);
  }

  $scope.queryDatabase = function() {

    $http.get('/api/towns')
      .success(function(response){

        var alert = $mdDialog.alert({
        title: 'Towns',
        textContent: response[2].name +', '+ response[2].code,
        ok: 'Close'
      });
      
      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
      })
      .error(function(error){
        console.log(error);
      });
  }

});

