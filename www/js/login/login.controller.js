(function () {
    'use strict';

    function LoginCtrl($http, $location, Constants, AuthService) {
        var viewModel = this;

        function authenticate(user, callback) {

            var basicAuth, headers;

            basicAuth = "Basic " + //
                btoa(user.username + ":" + user.password);


            $http.post(Constants.DEFAULT_BACKEND_URL + '/' + 'login', {
                    auth: basicAuth
                })
                .success(function (data, status, headers, config) {
                    if (data.username) {
                        $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
                        //data.authorization = basicAuth;
                        //data.token = headers(Constants.LOCAL_XSRF_TOKEN);
                        //window.localStorage[Constants.LOCAL_XSRF_TOKEN] = data.token;
                        AuthService.setAuthenticatedUser(data);

                    } else {
                        $scope.$emit(Constants.DISPLAY_MSG_EVENT, "L'utilisateur et/ou le mot de passe sont incorrects.");
                    }
                    callback && callback();
                }).error(function () {
                    AuthService.setAuthenticated(undefined);
                    window.localStorage[Constants.LOCAL_XSRF_TOKEN] = '';
                    callback && callback();
                });

        }

        function onAuthentication() {
            if (AuthService.isLoggedIn()) {
                $location.path('cave/bottles');
                viewModel.error = false;
            } else {
                $location.path("cave/login");
                viewModel.error = true;
            }
        }

        function login() {
            authenticate(viewModel.user, onAuthentication);
        }

        viewModel.login = login;

    }

    LoginCtrl.$inject = ['$http', '$location', 'Constants', 'AuthService'];

    angular.module('login.controller')
        .controller('loginCtrl', LoginCtrl);

}());