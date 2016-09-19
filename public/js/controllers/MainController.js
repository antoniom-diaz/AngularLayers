app.controller('mainController', function($scope, $mdDialog, $http){

  $scope.layers = [];

  /*$scope.gridData = [{name: 'Almendralejo', code: '06200'},
                          {name: 'Madrid', code: '28015'}];*/
  var gridData;
  $scope.gridData;

  map.getLayers().forEach(function(layer){
    $scope.layers.push(layer);
  });

  $scope.toggleLayer = function(layer) {
    
    console.log('toggleLayer');

    var toggle = !(layer.getVisible());

    layer.setVisible(toggle);
  }

  $scope.queryDatabase = function() {

    $http.get('/api/towns')
      .success(function(response){

        $scope.gridData = [{name: 'Almendralejo', code: '06200'},
                            {name: 'Madrid', code: '28015'}];

        var alert = $mdDialog.alert({
          controller: DialogController,
          templateUrl:'public/js/directives/grid.html',
          clickOutsideToClose: true
        });

        console.log('Aqui');
        
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

