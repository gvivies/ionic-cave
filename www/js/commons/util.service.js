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

        function isMobileDevice() {
            if (navigator.userAgent.match(/Android/i) || //
                navigator.userAgent.match(/webOS/i) || //
                navigator.userAgent.match(/iPhone/i) || //
                navigator.userAgent.match(/iPad/i) || //
                navigator.userAgent.match(/iPod/i) || //
                navigator.userAgent.match(/BlackBerry/i) || //
                navigator.userAgent.match(/Windows Phone/i)) {
                return true;
            } else {
                return false;
            }
            //return (window.innerWidth <= 800 && window.innerHeight <= 600);
        }

        this.clone = fnClone;
        this.getIndex = getIndex;
        this.isBlank = isBlank;
        this.isMobileDevice = isMobileDevice;
    }


    angular.module('util.service')
        .service('UtilService', UtilService);
}());