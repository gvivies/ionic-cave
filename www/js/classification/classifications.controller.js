(function () {
    'use strict';

    function ClassificationsCtrl(Constants, CrudService, FormService, AuthService, UtilService) {
        var viewModel = this,
            dialog;

        function onModuleLoad() {
            viewModel.items = CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.CLASSIFICATIONS_URI).list();
            initEditForm();
        }

        // Fill regions select objects list 
        // and declares setings parameter for wine form
        function initEditForm() {
            viewModel.formSettings = {
                templateUrl: 'templates/classification.html'
            };
        }

        function updateItem(item) {
            item.ownedBy = AuthService.getAuthenticatedUser().id;
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.CLASSIFICATIONS_URI)
                .update(item, function onSaveSuccess() {
                    // Updated in current list
                    var idx = UtilService.getIndex(item.id, viewModel.items);
                    if (idx >= 0) {
                        viewModel.items[idx] = item;
                    }
                }, function onSaveError() {
                    // TODO Error message
                });
        }

        function insertItem(item) {
            item.ownedBy = AuthService.getAuthenticatedUser().id;
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.CLASSIFICATIONS_URI)
                .create(item, function onSaveSuccess() {
                    // Insert in current list
                    var idx = UtilService.getIndex(item.id, viewModel.items);
                    viewModel.items.push(item);
                }, function onSaveError() {
                    // TODO Error message
                });
        }

        function editItemHandler(item) {
            viewModel.formSettings.save = updateItem;
            dialog = FormService.show(UtilService.clone(item), viewModel.formSettings);
        }

        function createItemHandler() {
            viewModel.formSettings.save = insertItem;
            dialog = FormService.show({}, viewModel.formSettings);
        }

        function deleteItemHandler(item) {
            if (confirm("Voulez-vous vraiment supprimer ce type ?")) {
                CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.CLASSIFICATIONS_URI + '/' + item.id)
                    .remove(
                        function onRemoveSuccess() {
                            var idx = viewModel.items.indexOf(item);
                            viewModel.items.splice(idx, 1);
                        },
                        function onRemoveError() {
                            //$scope.$emit(Constants.DISPLAY_MSG_EVENT, "Une erreur est survenue lors de la suppression de " + item.name);
                        });
            }
        }

        viewModel.editItem = editItemHandler;
        viewModel.createItem = createItemHandler;
        viewModel.deleteItem = deleteItemHandler;

        onModuleLoad();
    }

    ClassificationsCtrl.$inject = ['Constants', 'CrudService', 'FormService', 'AuthService', 'UtilService'];

    angular.module('classifications.controller')
        .controller('classifsCtrl', ClassificationsCtrl);


}());