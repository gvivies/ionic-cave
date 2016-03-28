//= require _modules
//= require_self

(function () {
    'use strict';
    /* 
     * @name 
     * @desc API générique de CRUD  
     */
    function CrudService($resource) {

        this.resource = function (uri, parameters) {

            var resource = $resource(uri, parameters, {
                list: {
                    method: 'GET',
                    isArray: true
                },
                create: {
                    method: 'POST',
                    isArray: false
                },
                get: {
                    method: 'GET',
                    isArray: false
                },
                update: {
                    method: 'PUT',
                    isArray: false
                },
                remove: {
                    method: 'DELETE',
                    isArray: false
                }
            });

            resource.prototype.list = function (onSuccess, onError) {
                return resource.list().$promise.then(onSuccess, onError);
            };

            resource.prototype.create = function (onSuccess, onError) {
                return resource.create().$promise.then(onSuccess, onError);
            };

            resource.prototype.get = function (onSuccess, onError) {
                return resource.get().$promise.then(onSuccess, onError);
            };

            resource.prototype.update = function (onSuccess, onError) {
                return resource.update().$promise.then(onSuccess, onError);
            };

            resource.prototype.remove = function (onSuccess, onError) {
                return resource.remove().$promise.then(onSuccess, onError);
            };

            return resource;
        };
    }

    angular.module('crud.service')
        .service('CrudService', ['$resource', CrudService]);
}());