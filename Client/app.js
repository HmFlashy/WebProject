var app = angular.module("MaMuscu", ['ngRoute', 'jkAngularRatingStars']);

app.constant('api', 'http://mamuscu.sytes.net:3000');

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
        controller: 'ExercisesCtrl',
        controllerAs: 'exercise',
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
    .otherwise({
        redirectTo: '/connexion'
    });
}]);


app.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // when the page refreshes, check if the user is already logged in
  AuthenticationFactory.check();

  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      if(!$location.path() == '/connexion' && $location.path() != '/inscription'){
            $location.path("/connexion");
        }
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
    if (AuthenticationFactory.isLogged == true && ($location.path() == '/connexion' || $location.path() == '/inscription')) {
            $location.path('/mon-espace');
    }
  });
});
