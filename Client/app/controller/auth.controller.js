app.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory', '$rootScope',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory, $rootScope) {


 		this.register = function(){
 			$location.path('/inscription');
 		}
		this.login = function() {
		    var log = this.log;
		    var password = this.pwd;
		    if (log !== undefined && password !== undefined) {
		    	UserAuthFactory.login(log, password).then(function(response) {

					var data = response.data;
					AuthenticationFactory.isLogged = true;
					AuthenticationFactory.user = data.name;
					AuthenticationFactory.id = data.id;

					$window.sessionStorage.token = data.token;
					$window.sessionStorage.user = data.name;
					$window.sessionStorage.iduser = data.id;
          alert("Connection réussie !")
					$location.path("/mon-espace");

		        }).catch(function(status) {
		        	if (status.status == 401)
			            alert("Le mot de passe est incorrect");
    					else if (status.status == 404)
    						alert("Le nom d'utilisateur ou email est incorrect");
    					else
    						alert("Une erreur est survenue");
    		        });
		      } else {
		      	alert("Des informations sont manquantes");
		     }

	    };
	}]);

app.controller("RegisterCtrl", ["$scope", "$http", "$location", "UserAuthFactory", "AuthenticationFactory",
	function($scope, $http, $location, UserAuthFactory, AuthenticationFactory){

		this.login = function(){
			$location.path('/connection');
		}
		this.reg = function(valid){
			var firstname = this.firstname || '';
			var lastname = this.lastname || '';
			var pseudo = this.pseudo || '';
			var email = this.email || '';
			var password = this.pwd1 || '';
			var password2 = this.pwd2 || '';
			if(!valid || firstname == '' || lastname == '' || pseudo == '' || email == '' || password == '' || password2 == ''){
				alert("Des informations sont manquantes ou erronées");
			} else if(password != password2){
				alert("Les deux mots de passe sont différents");
				this.pwd1 = "";
				this.pwd2 = "";
			} else {
				UserAuthFactory.register(firstname, lastname, pseudo, email, password).then(function(response){
          alert("Vous êtes bien inscrit, veuillez maintenant vous connecter..")
					$location.path("/connection");
				}).catch(function(status){
					if(status.status == 401){
						alert("Le pseudo ou email est déjà pris")
					} else {
						alert("Une erreur est survenue")
					}
				});
			}
		};

}]);
