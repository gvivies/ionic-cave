//= require _modules
//= require_self

(function () {
    'use strict';

    function spinnerDirective($http) {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'templates/spinner.html',
            link: function (scope, elem, attrs) {

                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v) {
                    if (v) {
                        elem.removeClass('ng-hide');
                    } else {
                        elem.addClass('ng-hide');
                    }
                });
            }
        };
    }


    angular.module('spinner.directive')
        .directive('loading', ['$http', spinnerDirective]);

}());