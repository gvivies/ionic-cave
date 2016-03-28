//=require_self

(function () {

    'use strict';

    function WinesCtrl($scope, $rootScope, CrudService, Constants, FormService, UtilService, $mdDialog, ConfirmService) {

        var viewModel = this,
            listRegions = [],
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
            $scope.$emit(Constants.DISPLAY_MSG_EVENT, "Le vin " + item.name + " a été créé avec succès");
        }

        function onUpdatedItemEventHandler(event, item) {
            var idx = UtilService.getIndex(item.id, viewModel.items);
            if (idx >= 0) {
                viewModel.items[idx] = item;
            }
            $scope.$emit(Constants.DISPLAY_MSG_EVENT, "Le vin " + item.name + " a été modifié avec succès");
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

                CrudService.resource(Constants.WINES_URI + '/' + item.id)
                    .remove(onRemoveSuccess, onRemoveError);
            }

            ConfirmService.confirmDelete(item, 'le vin')
                .then(removeItem);
        }

        function filterWinesHandler(wine) {
            return (UtilService.isBlank(viewModel.region) || viewModel.region.name == wine.region.name);
        }

        function initWineForm(listRegions) {
            formLists.push({
                'name': 'regions',
                'content': listRegions
            });

            viewModel.formSettings = {
                size: "xxl",
                template: "wine.html",
                uri: Constants.WINES_URI,
                lists: formLists
            };
        }

        // --- Attaching functions and events handler

        viewModel.editItem = editItemHandler;
        viewModel.deleteItem = deleteItemHandler;
        viewModel.filterWines = filterWinesHandler;

        $scope.$on(Constants.CREATED_ITEM_EVENT, onCreatedItemEventHandler);
        $scope.$on(Constants.UPDATED_ITEM_EVENT, onUpdatedItemEventHandler);
        $scope.$on(Constants.SHOW_MENU_EVENT, onShowMenuEventHandler);
        $scope.$on(Constants.HIDE_MENU_EVENT, onHideMenuEventHandler);
        $scope.$on(Constants.ADD_CLICK_EVENT, createItemHandler);

        // --- On load

        viewModel.items = CrudService.resource(Constants.WINES_URI).list();
        viewModel.regions = CrudService.resource(Constants.REGIONS_URI).list(initWineForm);
        viewModel.region = {};
        $rootScope.addItemElement = true;
        $scope.$emit(Constants.SHOW_MENU_EVENT);
    }

    WinesCtrl.$inject = ['$scope', '$rootScope', 'CrudService', 'Constants', 'FormService', 'UtilService', '$mdDialog', 'ConfirmService'];

    angular.module('wines.controller', [])
        .controller('WinesCtrl', WinesCtrl);

}());