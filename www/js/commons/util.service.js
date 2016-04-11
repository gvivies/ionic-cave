//= require _modules
//= require_self

(function () {
    'use strict';

    function UtilService() {

        function fnClone(obj) {
            var target = {},
                property;
            for (property in obj) {
                if (obj.hasOwnProperty(property)) {
                    target[property] = obj[property];
                }
            }
            return target;
        }

        function getIndex(id, items) {
            var idx, item;
            for (idx = 0; idx < items.length; idx++) {
                if (items[idx].id === id) {
                    return idx;
                }
            }
            return -1;
        }

        function isBlank(value) {
            return (value === null || value === undefined || value === '');
        }

        this.clone = fnClone;
        this.getIndex = getIndex;
        this.isBlank = isBlank;
    }


    angular.module('util.service')
        .service('UtilService', UtilService);
}());