app.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {

		$scope.login = function() {
 
	    var login = $scope.user.login;
	    var password = $scope.user.password;
	 
	    if (login !== undefined && password !== undefined) {
	    	UserAuthFactory.login(login, password).success(function(data) {
	       
	          AuthenticationFactory.isLogged = true;
	          AuthenticationFactory.user = data.user.login;
	          AuthenticationFactory.id = data.user.id;
	 
	          $window.sessionStorage.token = data.token;
	          $window.sessionStorage.user = data.user.login; // to fetch the user details on refresh
	          $window.sessionStorage.iduser = data.user.id; // to fetch the user details on refresh
	 
	          $location.path("/home");
	 
	        }).error(function(status) {
	          alert('Oops something went wrong!');
	        });
	      } else {
	        alert('Invalid credentials');
	      }
	 
	    };
	}]);

app.controller("RegisterCtrl", ["$scope", "$http", "$location", "UserAuthFactory", function($scope, $http, $location, UserAuthFactory){

	$scope.reg = function(){
		var firstname = $scope.firstname || '';
		var lastname = $scope.lastname || '';
		var pseudo = $scope.pseudo || '';
		var email = $scope.email || '';
		var password = $scope.pwd1 || '';
		var password2 = $scope.pwd2 || '';
		if(firstname == '' || lastname == '' || pseudo == '' || email == '' || password == '' || password2 == ''){
			$scope.infoAreMissing = true;
		}
		if(password != password2){
			$scope.passwordInvalid = true;
		} else {
			UserAuthFactory.register(firstname, lastname, pseudo, email, password).success(function(data){
				$location.path("/login");
			}).error(function(status){
				$scope.somethingWrong = true;
			});
		}
	};

}]);