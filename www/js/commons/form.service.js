//= require _modules
//= require_self

(function MainForm() {
    'use strict';

    function formService($mdDialog) {

        var service = {};
        /*
         * Function defining form
         */
        function showForm($scope, editedItem, settings) {
            $mdDialog.show({
                clickOutsideToClose: false,
                templateUrl: 'templates/' + settings.template,
                locals: {
                    item: editedItem,
                    size: settings.size,
                    scope: $scope,
                    uri: settings.uri,
                    lists: settings.lists,
                    beforeSave: settings.beforeSave
                },
                controllerAs: 'form',
                controller: 'DialogCtrl'
            });
        }

        service.showForm = showForm;

        return service;
    }

    /*
     * Controller managing dialog form
     */
    function DialogCtrl($scope, $mdDialog, locals, Constants, CrudService, UtilService, AuthService) {

        var formVM = this;

        formVM.item = locals.item;
        formVM.size = locals.size;
        formVM.uri = locals.uri;
        formVM.lists = [];
        formVM.beforeSave = locals.beforeSave;
        formVM.authenticatedUser = AuthService.getAuthenticatedUser();

        // Initializing all lists for select objects 
        if (locals.lists !== undefined) {
            locals.lists.forEach(function (itemList) {
                formVM.lists[itemList.name] = itemList.content;
            });
        }

        locals.scope.$emit(Constants.HIDE_MENU_EVENT);

        // --- Internal directive functions

        /**
         * Material angular : dynamic search 
         */
        function querySearch(query, domain) {
            var itemlist = formVM.lists[domain],
                results = query ? itemlist.filter(createFilterFor(query)) : itemlist,
                deferred;
            return results;
        }

        /**
         * Material angular : Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(item) {
                var searched = angular.lowercase(item.name);
                return (searched.indexOf(lowercaseQuery) === 0);
            };
        }

        function onEditItemEventHandler(event, item) {
            formVM.item = item;
        }

        function onCreateSuccess(data) {
            formVM.item.id = data.id;
            locals.scope.$emit(Constants.CREATED_ITEM_EVENT, formVM.item);
            closeDialogHandler();
        }

        function onCreateError(response) {
            locals.scope.$emit(Constants.DISPLAY_MSG_EVENT, "Une erreur est survenue : " + response.data.message);
        }

        function onUpdateSuccess() {
            locals.scope.$emit(Constants.UPDATED_ITEM_EVENT, formVM.item);
            closeDialogHandler();
        }

        function onUpdateError(response) {
            locals.scope.$emit(Constants.DISPLAY_MSG_EVENT, "Une erreur est survenue : " + response.data.message);
        }

        // --- Available UI functions

        function closeDialogHandler() {
            locals.scope.$emit(Constants.SHOW_MENU_EVENT);
            $mdDialog.hide();
        }

        function saveHandler() {
            formVM.item.ownedBy = formVM.authenticatedUser.id;
            if (formVM.beforeSave !== undefined) {
                formVM.beforeSave(formVM.item).then(function (data) {
                    formVM.item = data;
                    saveItem();
                });
            } else {
                saveItem();
            }

        }

        function saveItem() {
            if (formVM.item.id !== undefined) {
                CrudService.resource(formVM.uri)
                    .update(formVM.item, onUpdateSuccess, onUpdateError);
            } else {
                CrudService.resource(formVM.uri)
                    .create(formVM.item, onCreateSuccess, onCreateError);
            }
        }

        // --- Attaching functions to view Model

        formVM.closeDialog = closeDialogHandler;
        formVM.cancel = closeDialogHandler;
        formVM.save = saveHandler;
        formVM.querySearch = querySearch;

        // --- Event handlers

        $scope.$on(Constants.EDIT_ITEM_EVENT, onEditItemEventHandler);
    }

    DialogCtrl.$inject = ['$scope', '$mdDialog', 'locals', 'Constants', 'CrudService', 'UtilService', 'AuthService'];

    angular.module('form.service')
        .factory('FormService', ['$mdDialog', formService])
        .controller('DialogCtrl', DialogCtrl);
}());