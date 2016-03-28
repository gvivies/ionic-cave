//=require_self

(function () {
    'use strict';

    function StatsCtrl($scope, $rootScope, CrudService, Constants) {

        var viewModel = this;

        // On Load
        viewModel.labelsPerRegion = [];
        viewModel.dataPerRegion = [];
        viewModel.labelsPerClassif = [];
        viewModel.dataPerClassif = [];
        viewModel.total = 0;

        function fillRegionsStatistics(item) {
            viewModel.labelsPerRegion.push(item.name);
            viewModel.dataPerRegion.push(item.quantity);
            viewModel.total += item.quantity;
        }

        function fillClassifStatistics(item) {
            viewModel.labelsPerClassif.push(item.name);
            viewModel.dataPerClassif.push(item.quantity);
        }

        CrudService.resource(Constants.REGIONS_URI + "/withcount")
            .list(function onSuccess(response) {
                response.forEach(fillRegionsStatistics);
            });

        CrudService.resource(Constants.CLASSIFICATIONS_URI)
            .list(function onSuccess(response) {
                response.forEach(fillClassifStatistics);
            });

        $rootScope.addItemElement = false;
        $scope.$broadcast(Constants.SHOW_MENU_EVENT);

    }

    StatsCtrl.$inject = ['$scope', '$rootScope', 'CrudService', 'Constants'];

    angular.module('stats.controller', [])
        .controller('StatsCtrl', StatsCtrl);

}());