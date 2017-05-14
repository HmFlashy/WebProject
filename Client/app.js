var app = angular.module("MaMuscu", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/template/lobbyRegister.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
        }
    ).when('/login', {
    	templateUrl: 'app/template/lobbyLogin.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
    }).when('/home', {
    	templateUrl: 'app/template/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
    });
});
