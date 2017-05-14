app.controller("RegisterCtrl", ["$scope", "$http", "$location", function($scope, $http, $location){

	$scope.reg = function(){
		var password = $scope.pwd1;
		console.log($scope.firstname);
		$http.post("/register", {
			"firstname": $scope.firstname,
			"lastname": $scope.lastname,
			"pseudo": $scope.pseudo,
			"email": $scope.email,
			"password": password
		}).then(function(response){
			console.log(response);
			$location.path("/login");
			console.log(response);
		}, function(response){
			console.log(response);
		});
	};

}]);