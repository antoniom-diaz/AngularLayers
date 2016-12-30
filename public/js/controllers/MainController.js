app.controller('mainController', function($scope, $uibModal, $http){

  $scope.layers = [];

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
});

