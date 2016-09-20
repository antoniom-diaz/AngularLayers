app.controller('mainController', function($scope, $mdDialog, $http){

  $scope.layers = [];

  var gridData;

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
        
        gridData = [];
        
        for (var i = 0; i<response.length; i++) {
          gridData.push({name: response[i]['name'], code : response[i]['code']});
        }

        var alert = $mdDialog.alert({
          controller: DialogController,
          templateUrl:'public/js/directives/grid.html',
          clickOutsideToClose: true
        });
        
        $mdDialog
          .show(alert)
          .finally(function() {
            alert = undefined;
        });
      })
      .error(function(error){
        console.log(error);
      });
  };

  function DialogController($scope, $mdDialog) {

    $scope.gridData = gridData;

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
});

