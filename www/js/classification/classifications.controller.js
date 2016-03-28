//= require_tree commons
//= require_self

(function ClassificationController() {

    'use strict';

    function ClassificationsCtrl($rootScope, CrudService, UtilService, Constants, $scope, $mdDialog, FormService, ConfirmService, $location) {

        var viewModel = this;

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

                CrudService.resource(Constants.CLASSIFICATIONS_URI + '/' + item.id)
                    .remove(onRemoveSuccess, onRemoveError);
            }

            ConfirmService.confirmDelete(item, 'la classification')
                .then(removeItem);
        }

        function onCreatedItemEventHandler(event, item) {
            viewModel.items.push(item);
            $scope.$emit(Constants.DISPLAY_MSG_EVENT, "La classification " + item.name + " a été créée avec succès");
        }

        function onUpdatedItemEventHandler(event, item) {
            var idx = UtilService.getIndex(item.id, viewModel.items);
            if (idx >= 0) {
                viewModel.items[idx] = item;
            }
            $scope.$emit(Constants.DISPLAY_MSG_EVENT, "La classification " + item.name + " a été modifiée avec succès");
        }

        function displayBottlesOfClassif(item) {
            $location.path(Constants.BOTTLES_URI).search("classif=" + item.id);
        }
        // --- Attaching functions and events handler

        viewModel.editItem = editItemHandler;
        viewModel.deleteItem = deleteItemHandler;
        viewModel.displayBottlesOfClassif = displayBottlesOfClassif;

        $scope.$on(Constants.CREATED_ITEM_EVENT, onCreatedItemEventHandler);
        $scope.$on(Constants.UPDATED_ITEM_EVENT, onUpdatedItemEventHandler);
        $scope.$on(Constants.SHOW_MENU_EVENT, onShowMenuEventHandler);
        $scope.$on(Constants.HIDE_MENU_EVENT, onHideMenuEventHandler);
        $scope.$on(Constants.ADD_CLICK_EVENT, createItemHandler);

        // --- On load

        viewModel.items = CrudService.resource(Constants.CLASSIFICATIONS_URI).list();
        viewModel.formSettings = {
            size: "xxl",
            template: "classification.html",
            uri: Constants.CLASSIFICATIONS_URI
        };
        $rootScope.addItemElement = true;
        $scope.$emit(Constants.SHOW_MENU_EVENT);
    }

    ClassificationsCtrl.$inject = ['$rootScope', 'CrudService', 'UtilService', 'Constants', '$scope', '$mdDialog', 'FormService', 'ConfirmService', '$location'];

    angular.module('classifications.controller', [])
        .controller('ClassificationsCtrl', ClassificationsCtrl);
}());