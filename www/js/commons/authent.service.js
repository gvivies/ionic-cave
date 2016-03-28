//= require _modules
//= require_self

(function () {
    'use strict';

    function AuthentService($rootScope) {

        var authenticatedUser,
            service = {};

        function setAuthenticatedUser(value) {
            this.authenticatedUser = value;
        }

        function getAuthenticatedUser() {
            return this.authenticatedUser;
        }

        function isLoggedIn() {
            return (this.authenticatedUser !== undefined && this.authenticatedUser.role !== null) ? true : false;
        }

        service.setAuthenticatedUser = setAuthenticatedUser;
        service.isLoggedIn = isLoggedIn;
        service.getAuthenticatedUser = getAuthenticatedUser;
        return service;
    }

    angular.module('authent.service')
        .factory('AuthService', AuthentService);

}());