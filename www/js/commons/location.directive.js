(function () {

    'use strict';

    function locationDirective(Constants, $mdDialog, uiGmapIsReady, $timeout) {

        function LocationCtrl($scope) {

            var formVM = this;

            function close() {
                formVM.isVisibleMap = false;
                $scope.$emit(Constants.SHOW_MENU_EVENT);
            }

            function showLocation(event, item) {
                var lat = parseFloat(item.latitude),
                    lng = parseFloat(item.longitude),
                    mapCenter = {
                        latitude: lat,
                        longitude: lng
                    },
                    markerCoords = Object.create(mapCenter);
                formVM.formattedAddress = item.street + '<br/>' + item.zipCode + '<br/>' + item.city;
                formVM.title = 'Localisation de ' + item.name;
                formVM.map = {
                    center: mapCenter,
                    zoom: 12
                };
                formVM.marker = {
                    id: 0,
                    coords: markerCoords,
                    title: item.name
                };
                formVM.marker.options = {
                    draggable: false,
                    labelContent: formVM.formattedAddress,
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                };
                formVM.isVisibleMap = true;
                $scope.$emit(Constants.HIDE_MENU_EVENT);
                uiGmapIsReady.promise().then(function (maps) {
                    $timeout(function () {
                        google.maps.event.trigger(formVM.map, 'resize');
                    }, 2000);

                });
            }

            formVM.close = close;
            formVM.map = {};

            formVM.isVisibleMap = false;
            $scope.$on(Constants.SHOW_LOCATION_EVENT, showLocation);

        }

        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'templates/location.html',
            controllerAs: 'form',
            controller: LocationCtrl
        };
    }

    angular.module('location.directive', ['uiGmapgoogle-maps'])
        .directive('location', ['Constants', '$mdDialog', 'uiGmapIsReady', '$timeout', locationDirective]);
}());