//=require_self

(function () {

    'use strict';

    function WineriesCtrl($scope, $rootScope, $q, CrudService, Constants, FormService, UtilService, $mdDialog, ConfirmService, GeoCodeService) {

        var viewModel = this,
            formLists = [];

        // --- Handler functions 
        function onShowMenuEventHandler() {
            viewModel.displayMenu = true;
        }

        function onHideMenuEventHandler() {
            viewModel.displayMenu = false;
        }

        function createItemHandler() {
            FormService.showForm($scope, {}, viewModel.formSettings);
        }

        function editItemHandler(item) {
            FormService.showForm($scope, UtilService.clone(item), viewModel.formSettings);
        }

        function onCreatedItemEventHandler(event, item) {
            viewModel.items.push(item);
            $scope.$emit(Constants.DISPLAY_MSG_EVENT, "Le domaine " + item.name + " a été créé avec succès");
        }

        function onUpdatedItemEventHandler(event, item) {
            var idx = UtilService.getIndex(item.id, viewModel.items);
            if (idx >= 0) {
                viewModel.items[idx] = item;
            }
            $scope.$emit(Constants.DISPLAY_MSG_EVENT, "Le domaine " + item.name + " a été modifié avec succès");
        }

        function deleteItemHandler(item) {
            function removeItem() {
                function onRemoveError() {
                    $scope.$emit(Constants.DISPLAY_MSG_EVENT, "Une erreur est survenue lors de la suppression de " + item.name);
                }

                function onRemoveSuccess() {
                    var itemList = $scope.ctrl.items,
                        idx = itemList.indexOf(item);
                    itemList.splice(idx, 1);
                    $scope.$emit(Constants.DISPLAY_MSG_EVENT, "La suppression de " + item.name + " a été effectuée avec succès");
                }
                CrudService.resource(Constants.WINERIES_URI + '/' + item.id)
                    .remove(onRemoveSuccess, onRemoveError);
            }
            ConfirmService.confirmDelete(item, 'le domaine')
                .then(removeItem);
        }

        function localizableHandler(item) {
            return !UtilService.isBlank(item.city);
        }

        // --- Location Map 
        function showLocationHandler(item) {
            $scope.$emit(Constants.SHOW_LOCATION_EVENT, item);
        }

        // --- Google geocoding API
        function geoCodeThis(item) {
            var defer = $q.defer();

            if (!UtilService.isBlank(item.city)) {
                GeoCodeService.geoCodeAddress(item.street, item.zipCode, item.city,
                    function (results, status) {
                        if (status !== undefined && status === 'OK' && results.length > 0 && !UtilService.isBlank(results[0].geometry)) {
                            item.latitude = results[0].geometry.location.lat();
                            item.longitude = results[0].geometry.location.lng();
                            defer.resolve(item);
                        };
                    });

            } else {
                defer.resolve(item);
            }

            return defer.promise;
        }

        function initForm(listRegions) {
            formLists.push({
                'name': 'regions',
                'content': listRegions
            });

            viewModel.formSettings = {
                size: "xxl",
                template: "winery.html",
                uri: Constants.WINERIES_URI,
                lists: formLists,
                beforeSave: geoCodeThis
            };
        }

        // --- Attaching functions and events handler

        viewModel.editItem = editItemHandler;
        viewModel.deleteItem = deleteItemHandler;
        viewModel.showLocation = showLocationHandler;
        viewModel.localizable = localizableHandler;

        $scope.$on(Constants.CREATED_ITEM_EVENT, onCreatedItemEventHandler);
        $scope.$on(Constants.UPDATED_ITEM_EVENT, onUpdatedItemEventHandler);
        $scope.$on(Constants.SHOW_MENU_EVENT, onShowMenuEventHandler);
        $scope.$on(Constants.HIDE_MENU_EVENT, onHideMenuEventHandler);
        $scope.$on(Constants.ADD_CLICK_EVENT, createItemHandler);

        // --- On load

        viewModel.items = CrudService.resource(Constants.WINERIES_URI).list();
        viewModel.regions = CrudService.resource(Constants.REGIONS_URI).list(initForm);

        $rootScope.addItemElement = true;
        $scope.$emit(Constants.SHOW_MENU_EVENT);

    }

    WineriesCtrl.$inject = ['$scope', '$rootScope', '$q', 'CrudService', 'Constants', 'FormService', 'UtilService', '$mdDialog', 'ConfirmService', 'GeoCodeService'];

    angular.module('wineries.controller', [])
        .controller('WineriesCtrl', WineriesCtrl);

}());