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

app.factory('UserAuthFactory', function($window, APILINK, $location, $http, AuthenticationFactory) {
  return {
    login: function(login, password) {
      return $http.post(APILINK+'/login', {
        login: login,
        password: password
      });
    },
    logout: function() {

      if (AuthenticationFactory.isLogged) {

        AuthenticationFactory.isLogged = false;
        delete AuthenticationFactory.user;
        delete AuthenticationFactory.userid;

        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user;
        delete $window.sessionStorage.userid;

        $location.path("/login");
      }

    },
    register: function(firstname, lastname, pseudo, email, password) {
      return $http.post(APILINK+'/authenticate', {
        firstname: firstname,
        lastname: lastname,
        pseudo: pseudo,
        email: email,
        password: password
      });
    }
};
});

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