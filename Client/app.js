var app = angular.module("MaMuscu", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/template/acceuil.html',
        controller: 'AccueilCtrl',
        controllerAs: 'acceuil'

        }
    );
});
