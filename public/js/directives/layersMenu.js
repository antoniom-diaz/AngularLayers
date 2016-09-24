app.directive('layersMenu', function() { 
  return { 
    restrict: 'E', 
    scope: {
    	layer: '=' 
    },
    templateUrl: 'public/js/directives/layersMenu.html'
  }; 
});