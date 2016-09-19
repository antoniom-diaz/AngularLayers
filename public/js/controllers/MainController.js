app.controller('mainController', function($scope, $mdDialog, $http, $timeout){

  console.log('Hola');
  $scope.layers = [];

  $scope.gridData;

  map.getLayers().forEach(function(layer){
    $scope.layers.push(layer);
  });

  $scope.toggleLayer = function(layer) {
    var toggle = !(layer.getVisible());

    console.log('Bueno');
    layer.setVisible(toggle);
  }

  $scope.queryDatabase = function() {

    console.log('La vida');

    $http.get('/api/towns')
      .success(function(response){
        console.log('Adios');
        $scope.gridData = [{name: 'Almendralejo', code: '06200'},
                            {name: 'Madrid', code: '28015'}];

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

  console.log('Pasa');

  function DialogController($scope, $mdDialog) {
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

