app.factory('AuthenticationFactory', function($window) {
  var auth = {
    isLogged: false,
    check: function() {
      if ($window.sessionStorage.token) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete this.user;
      }
    }
};
  return auth;
});

app.factory('UserAuthFactory', ['$window', 'APILINK', '$location', '$http', 'AuthenticationFactory',
  function($window, APILINK, $location, $http, AuthenticationFactory) {
  return {
    login: function(login, password) {
      return $http.post(APILINK+'/authenticate', {
        "login": login,
        "password": password
      });
    },
    logout: function() {

      if (AuthenticationFactory.isLogged) {

        AuthenticationFactory.isLogged = false;
        delete AuthenticationFactory.name;
        delete AuthenticationFactory.id;

        delete $window.sessionStorage.token;
        delete $window.sessionStorage.name;
        delete $window.sessionStorage.id;

        $location.path("/connexion");
      }

    },
    register: function(firstname, lastname, pseudo, email, password) {
      return $http.post(APILINK+'/register', {
        firstname: firstname,
        lastname: lastname,
        pseudo: pseudo,
        email: email,
        password: password
      });
    }
};
}]);

app.factory('TokenInterceptor', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },

    response: function(response) {
      return response || $q.when(response);
    }
  };
});