(function () {
    'use strict';

    function LoginCtrl($location, $rootScope, $http, $scope, Constants, AuthService) {

        var viewModel = this;

        function authenticate(user, callback) {
            var headers = user ? {
                authorization: "Basic " + //
                    btoa(user.username + ":" + //
                        user.password)
            } : {};

            $http.get('login', {
                    headers: headers
                })
                .success(function (data) {
                    if (data.username) {
                        AuthService.setAuthenticatedUser(data);
                    } else {
                        $scope.$emit(Constants.DISPLAY_MSG_EVENT, "L'utilisateur et/ou le mot de passe sont incorrects.");
                    }
                    callback && callback();
                }).error(function () {
                    AuthService.setAuthenticated(undefined);
                    $scope.$emit(Constants.DISPLAY_MSG_EVENT, "Une erreur est survenue lors de l'authentification.");
                    callback && callback();
                });

        }

        function onAuthentication() {
            if (AuthService.isLoggedIn()) {
                $location.path('bottles');
                viewModel.error = false;
            } else {
                $location.path("login");
                viewModel.error = true;
            }
        }

        function login() {
            authenticate(viewModel.user, onAuthentication);
        }

        viewModel.login = login;
    }

    LoginCtrl.$inject = ['$location', '$rootScope', '$http', '$scope', 'Constants', 'AuthService'];

    angular.module('login.controller', [])
        .controller('LoginCtrl', LoginCtrl);

}());