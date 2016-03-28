//= require _modules
//= require_self

(function () {
    'use strict';

    function messageDirective($mdToast, Constants) {
        return {
            restrict: 'A',
            replace: true,
            //templateUrl: 'templates/menu.html',
            controllerAs: 'messageCtrl',
            controller: function ($scope, $attrs, $location) {

                function onDisplayMessageEventHandler(event, message) {
                    $mdToast.show(
                        $mdToast.simple()
                        .content(message)
                        .position('bottom right')
                        .hideDelay(3000)
                    );
                }

                $scope.$on(Constants.DISPLAY_MSG_EVENT, onDisplayMessageEventHandler);
            }
        };
    }

    angular.module('message.directive')
        .directive('appMessage', ['$mdToast', 'Constants', messageDirective]);
}());