app.controller('MainCtrl', ['Page', function (Page) {
    
	Page.setTitle('Acceuil');
}]);

app.controller("HomeCtrl", ["$http", 
	function($http){

	}
]);

app.controller("HeaderCtrl", ["$location", "UserAuthFactory", "AuthenticationFactory",
	function($location, UserAuthFactory, AuthenticationFactory){

		this.logout = UserAuthFactory.logout;
		this.islogged = false;

		this.goTo = function(path){
			$location.path(path);
		}
	}
]);

app.controller("LobbyCtrl", ["$location", "UserAuthFactory", "AuthenticationFactory",
	function($location, UserAuthFactory, AuthenticationFactory){
	}
]);

app.controller("ExercicesCtrl", ["$location", "UserAuthFactory", "AuthenticationFactory",
	function($location, UserAuthFactory, AuthenticationFactory){
	}
]);
