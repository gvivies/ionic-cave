(function () {

    'use strict';

    function TokenService(AuthService, $q) {
        var TokenInterceptor = {
            request: function (config) {

                var authenticatedUser = AuthService.getAuthenticatedUser();
                if (authenticatedUser) {
                    config.headers['authorization'] = authenticatedUser.authorization;
                    config.headers['user-id'] =
                        authenticatedUser.id;
                }
                return config;
            },
            responseError: function (error) {
                if (error.status === 401 || error.status === 403) {
                    window.location = "#/login";
                }
                return $q.reject(error);
            }
        };

        return TokenInterceptor;
    }

    TokenService.$inject = ['AuthService', '$q'];

    angular.module('token.service')
        .factory('TokenInterceptor', TokenService);

}());