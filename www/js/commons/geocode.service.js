(function () {
    'use strict';

    function GeoCodeService($http, Constants) {
        var service = {};

        function geoCodeAddress(street, zipCode, city, callback) {
            var address = street + ' ' + zipCode + ' ' + city,
                geocoder = new google.maps.Geocoder(),
                geocoded = {};
            geocoded = geocoder.geocode({
                'address': address
            }, callback);
        }

        service.geoCodeAddress = geoCodeAddress;

        return service;
    }

    angular.module('geocode.service')
        .factory('GeoCodeService', ['$http', 'Constants', GeoCodeService]);

}());