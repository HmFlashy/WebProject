var app = angular.module("MaMuscu", ['ngRoute']);

app.constant('APILINK', 'http://localhost:3000');

app.config(["$httpProvider" ,"$locationProvider", "$routeProvider", function ($httpProvider, $locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('TokenInterceptor');
    $routeProvider
    .when('/connexion', {
        templateUrl: 'app/template/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
        })
    .when('/inscription', {
        templateUrl: 'app/template/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
        })
    .when('/mon-espace', {
    	templateUrl: 'app/template/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home',
        access: {
            requiredLogin: true
        }
    })
    .when('/mes-entrainements', {
        templateUrl: 'app/template/trainings.html',
        controller: 'TrainingsCtrl',
        controllerAs: 'training',
        access: {
            requiredLogin: true
        }
    })
    .when('/mes-exercices', {
        templateUrl: 'app/template/exercices.html',
        controller: 'ExercicesCtrl',
        controllerAs: 'exercice',
        access: {
            requiredLogin: true
        }
    })
    .when('/mes-donnees', {
        templateUrl: 'app/template/userdata.html',
        controller: 'UserDataCtrl',
        controllerAs: 'userdata',
        access: {
            requiredLogin: true
        }
    })
    .when('/mon-agenda', {
        templateUrl: 'app/template/agenda.html',
        controller: 'AgendaCtrl',
        controllerAs: 'agenda',
        access: {
            requiredLogin: true
        }
    })
    .otherwise('/connexion', {
        templateUrl: 'app/template/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
    });
}]);


app.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // when the page refreshes, check if the user is already logged in
  AuthenticationFactory.check();
 
  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      $location.path("/connexion");
    } else {
      // check if user object exists else fetch it. This is incase of a page refresh
      if (!AuthenticationFactory.name) {
            AuthenticationFactory.name = $window.sessionStorage.name;
        }
    }
  });
 
  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthenticationFactory.isLogged;
    // if the user is already logged in, take him to the home page
    if (AuthenticationFactory.isLogged == true && $location.path() == '/connexion' || $location.path() == '/inscription') {
            $location.path('/mon-espace');
    }
  });
});