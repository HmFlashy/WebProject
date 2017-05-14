app.controller("LoginCtrl", ["$scope", "$http", "$location", function($scope, $http, $location){

	$scope.reg = function(){
		$scope.wrongAuth = false;
		$http.post("/authenticate", {
			"login": $scope.user.login,
			"password": $scope.user.password
		}).then(function(response){
			$location.path("/home");
		}, function(response){
			$scope.wrongAuth = true;
		});
	};

}]);