//=require_self

(function () {

    'use strict';

    function BottlesCtrl($scope, $rootScope, CrudService, Constants, FormService, UtilService, $mdDialog, ConfirmService, $routeParams) {

        var viewModel = this,
            listWines = [],
            listWineries = [],
            listClassifications = [],
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
            $scope.$emit(Constants.DISPLAY_MSG_EVENT, "Les bouteilles " + item.name + " ont été créées avec succès");
        }

        function onUpdatedItemEventHandler(event, item) {
            var idx = UtilService.getIndex(item.id, viewModel.items);
            if (idx >= 0) {
                viewModel.items[idx] = item;
            }
            $scope.$emit(Constants.DISPLAY_MSG_EVENT, "Les bouteilles " + item.name + " ont été modifiées avec succès");
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
                CrudService.resource(Constants.BOTTLES_URI + '/' + item.id)
                    .remove(onRemoveSuccess, onRemoveError);
            }
            ConfirmService.confirmDelete(item, 'les bouteills')
                .then(removeItem);
        }

        function drinkHandler(item) {
            function drinkOne() {
                function onDrinkError() {
                    $scope.$emit(Constants.DISPLAY_MSG_EVENT, "Une erreur est survenue lors de la modification du nombre de bouteilles");
                }

                function onDrinkSuccess(data) {
                    $scope.$emit(Constants.DISPLAY_MSG_EVENT, "Une bouteille a été enlevée avec succès !");
                    item.quantity = data.quantity;
                }
                CrudService.resource(Constants.DRINK_BOTTLE_URI)
                    .update(item, onDrinkSuccess, onDrinkError);
            }

            ConfirmService.confirmDrink(item)
                .then(drinkOne);
        }

        function filterBottlesHandler(bottle) {
            if (!UtilService.isBlank(viewModel.region) && viewModel.region.name !== bottle.wine.region.name) {
                return false;
            }
            if (!UtilService.isBlank(viewModel.classification) && viewModel.classification.name !== bottle.classification.name) {
                return false;
            }
            return true;
        }

        function afterRegionsLoad(regions) {
            if (!UtilService.isBlank($routeParams.region)) {
                viewModel.region = regions[UtilService.getIndex($routeParams.region, regions)];
            }
        }

        function isExportVisible() {
            return !UtilService.isMobileDevice();
        }

        // --- Attaching functions and events handler

        viewModel.editItem = editItemHandler;
        viewModel.deleteItem = deleteItemHandler;
        viewModel.drink = drinkHandler;
        viewModel.filterBottles = filterBottlesHandler;
        viewModel.isExportVisible = isExportVisible;

        $scope.$on(Constants.CREATED_ITEM_EVENT, onCreatedItemEventHandler);
        $scope.$on(Constants.UPDATED_ITEM_EVENT, onUpdatedItemEventHandler);
        $scope.$on(Constants.SHOW_MENU_EVENT, onShowMenuEventHandler);
        $scope.$on(Constants.HIDE_MENU_EVENT, onHideMenuEventHandler);
        $scope.$on(Constants.ADD_CLICK_EVENT, createItemHandler);

        // --- On load

        function initBottleForm() {
            CrudService.resource(Constants.WINES_URI).list(function (listWines) {
                formLists.push({
                    'name': 'wines',
                    'content': listWines
                });
            });
            CrudService.resource(Constants.WINERIES_URI).list(function (listWineries) {
                formLists.push({
                    'name': 'wineries',
                    'content': listWineries
                });
            });
            viewModel.classifications = CrudService.resource(Constants.CLASSIFICATIONS_URI).list(function (listClassifications) {
                formLists.push({
                    'name': 'classifications',
                    'content': listClassifications
                });
                if (!UtilService.isBlank($routeParams.classif)) {
                    viewModel.classification = listClassifications[UtilService.getIndex($routeParams.classif, listClassifications)];
                }
            });
            viewModel.formSettings = {
                size: "xxl",
                template: "bottle.html",
                uri: Constants.BOTTLES_URI,
                lists: formLists
            };
        }

        viewModel.regions = CrudService.resource(Constants.REGIONS_URI).list(afterRegionsLoad);
        viewModel.items = CrudService.resource(Constants.BOTTLES_URI).list(initBottleForm);
        viewModel.exportHeaders = {
            name: 'Nom',
            'wine.name': 'Appellation',
            'wine.region.name': 'Region',
            'dealer.name': 'Domaine',
            'classification.name': 'Type',
            year: 'Millesime',
            quantity: 'Quantite',
            price: 'Price'
        };
        $rootScope.addItemElement = true;
        $scope.$emit(Constants.SHOW_MENU_EVENT);

    }

    BottlesCtrl.$inject = ['$scope', '$rootScope', 'CrudService', 'Constants', 'FormService', 'UtilService', '$mdDialog', 'ConfirmService', '$routeParams'];

    angular.module('bottles.controller')
        .controller('BottlesCtrl', BottlesCtrl);


}());