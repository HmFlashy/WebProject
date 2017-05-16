app.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory', '$rootScope',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory, $rootScope) {


 		this.register = function(){
 			$location.path('/register');
 		}
		this.login = function() {
	    var log = this.log;
	    var password = this.pwd;
	 	console.log(log);
	    if (log !== undefined && password !== undefined) {
	    	UserAuthFactory.login(log, password).then(function(data) {
	       
	          AuthenticationFactory.isLogged = true;
	          AuthenticationFactory.user = data.name;
	          AuthenticationFactory.id = data.id;
	 
	          $window.sessionStorage.token = data.token;
	          $window.sessionStorage.user = data.name;
	          $window.sessionStorage.iduser = data.id;
	          $location.path("/mon-espace");
	 
	        }).catch(function(status) {
	        	//A remplir
	        });
	      } else {
	      	//A remplir
	      }
	 
	    };
	}]);

app.controller("RegisterCtrl", ["$scope", "$http", "$location", "UserAuthFactory", "AuthenticationFactory", 
	function($scope, $http, $location, UserAuthFactory, AuthenticationFactory){
	this.reg = function(){
		var firstname = this.firstname || '';
		var lastname = this.lastname || '';
		var pseudo = this.pseudo || '';
		var email = this.email || '';
		var password = this.pwd1 || '';
		var password2 = this.pwd2 || '';
		if(firstname == '' || lastname == '' || pseudo == '' || email == '' || password == '' || password2 == ''){
			this.infoAreMissing = true;
		}
		if(password != password2){
			this.passwordInvalid = true;
		} else {
			UserAuthFactory.register(firstname, lastname, pseudo, email, password).then(function(data){
				$location.path("/connexion");
			}).catch(function(status){
				console.log(status);
				this.somethingWrong = true;
			});
		}
	};

}]);