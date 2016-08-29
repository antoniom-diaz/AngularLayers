app.controller('mainController',function($scope){

  $scope.layers = [];  

  map.getLayers().forEach(function(layer){
    $scope.layers.push(layer);
  });

  $scope.toggleLayer = function(layer) {
    var toggle = !(layer.getVisible());

    layer.setVisible(toggle);
  }

  $scope.queryDatabase = function() {
	$mdDialog.show(
	$mdDialog.alert()
		.clickOutsideToClose(true)
		.title('Opening from the left')
		.textContent('Closing to the right!')
		.ariaLabel('Left to right demo')
		.ok('Nice!')
        // You can specify either sting with query selector
		.openFrom('#left')
        // or an element
		.closeTo(angular.element(document.querySelector('#right')))
    );
  };
});

