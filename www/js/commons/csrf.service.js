//= require _modules
//= require_self

(function () {
    'use strict';

    function CSRFService($cookies) {
        var XSRFInterceptor = {
            request: function (config) {
                var token = $cookies.get('XSRF-TOKEN'),
                    SERVER_CSRF_HEADER = 'X-CSRF-TOKEN';
                if (token) {
                    config.headers[SERVER_CSRF_HEADER] = token;
                }

                return config;
            }
        };
        return XSRFInterceptor;
    }

    CSRFService.$inject = ['$cookies'];

    angular.module('csrf.service')
        .factory('XSRFInterceptor', CSRFService);

}());