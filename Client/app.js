var app = angular.module("MaMuscu", ['ngRoute']);

app.constant('APILINK', 'http://localhost:3000');

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/template/lobbyLogin.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
        }
    ).when('/register', {
        templateUrl: 'app/template/lobbyRegister.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
    }).when('/home', {
    	templateUrl: 'app/template/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
    });
});


app.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // when the page refreshes, check if the user is already logged in
  AuthenticationFactory.check();
 
  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      $location.path("/login");
    } else {
      // check if user object exists else fetch it. This is incase of a page refresh
      if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
    }
  });
 
  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/home');
    }
  });
});