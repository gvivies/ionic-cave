(function () {
    'use strict';

    function UserCtrl($rootScope, $scope, Constants, CrudService, FormService, ConfirmService, UtilService) {

        var viewModel = this,
            formLists = [];

        // --- Handlers functions

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
                    $scope.$emit(Constants.DISPLAY_MSG_EVENT, "Une erreur est survenue lors de la suppression de " + item.username);
                }

                function onRemoveSuccess() {
                    var itemList = $scope.ctrl.items,
                        idx = itemList.indexOf(item);
                    itemList.splice(idx, 1);
                    $scope.$emit(Constants.DISPLAY_MSG_EVENT, "La suppression de " + item.username + " a été effectuée avec succès");
                }
                CrudService.resource(Constants.USERS_URI + '/' + item.id)
                    .remove(onRemoveSuccess, onRemoveError);
            }
            ConfirmService.confirmDelete(item, "l'utilisateur")
                .then(removeItem);
        }

        function onCreatedItemEventHandler(event, item) {
            viewModel.items.push(item);
            $scope.$emit(Constants.DISPLAY_MSG_EVENT, "L'utilisateur " + item.username + " a été créé avec succès");
        }

        function onUpdatedItemEventHandler(event, item) {
            var idx = UtilService.getIndex(item.id, viewModel.items);
            if (idx >= 0) {
                viewModel.items[idx] = item;
            }
            $scope.$emit(Constants.DISPLAY_MSG_EVENT, "L'utilisateur " + item.username + " a été modifié avec succès");
        }

        function initForm(listRoles) {
            formLists.push({
                'name': 'roles',
                'content': listRoles
            });

            viewModel.formSettings = {
                size: "xxl",
                template: "user.html",
                uri: Constants.USERS_URI,
                lists: formLists
            };
        }

        function getRoleName(id) {
            var idx = UtilService.getIndex(id, viewModel.roles);
            return viewModel.roles[idx].roleName;
        }

        // --- Attaching UI functions

        viewModel.editItem = editItemHandler;
        viewModel.deleteItem = deleteItemHandler;
        viewModel.getRoleName = getRoleName;

        $scope.$on(Constants.CREATED_ITEM_EVENT, onCreatedItemEventHandler);
        $scope.$on(Constants.UPDATED_ITEM_EVENT, onUpdatedItemEventHandler);
        $scope.$on(Constants.SHOW_MENU_EVENT, onShowMenuEventHandler);
        $scope.$on(Constants.HIDE_MENU_EVENT, onHideMenuEventHandler);
        $scope.$on(Constants.ADD_CLICK_EVENT, createItemHandler);

        // --- On load

        viewModel.items = CrudService.resource(Constants.USERS_URI).list();
        viewModel.roles = CrudService.resource(Constants.USER_ROLES_URI).list(initForm);

        $rootScope.addItemElement = true;
        $scope.$emit(Constants.SHOW_MENU_EVENT);

    }

    UserCtrl.$inject = ['$rootScope', '$scope', 'Constants', 'CrudService', 'FormService', 'ConfirmService', 'UtilService'];

    angular.module('user.controller', [])
        .controller('UserCtrl', UserCtrl);

}());