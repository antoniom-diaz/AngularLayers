app.controller('mainController', function($scope, $mdDialog, $http){

  $scope.layers = [];

  var gridData;
  var textAlert;

  map.getLayers().forEach(function(layer){
    $scope.layers.push(layer);
  });

  $scope.toggleLayer = function(layer) {
    var toggle = !(layer.getVisible());

    layer.setVisible(toggle);
  }

  $scope.queryDatabase = function() {

    $http.get('/angularlayers/api/towns')
      .success(function(response){
        
        gridData = [];
        
        for (var i = 0; i<response.length; i++) {
          gridData.push({name: response[i]['name'], code : response[i]['code']});
        }

        var alert = $mdDialog.alert({
          controller: DialogController,
          templateUrl:'public/js/directives/grid.html',
          clickOutsideToClose: false
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

  $scope.createElement = function() {

    var town = {name:$scope.townNameCreate, code:$scope.townCodeCreate};

    $http.post('/angularlayers/api/createTown', town)
      .success(function(response){

        var alert = $mdDialog.alert({
          controller:DialogController,
          templateUrl:'public/js/directives/alert.html',
          clickOutsideToClose: false
        });

        textAlert = response;

        $mdDialog.show(alert);

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

        var alert = $mdDialog.alert({
          controller: DialogController,
          templateUrl: 'public/js/directives/grid.html',
          clickOutsideToClose: false
        });

        $mdDialog.show(alert);

      })
  }

  function DialogController($scope, $mdDialog) {

    $scope.gridData = gridData;
    $scope.textAlert = textAlert;

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

