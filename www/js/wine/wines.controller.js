(function () {
    'use strict';

    function WinesCtrl(Constants, CrudService, FormService, AuthService, UtilService) {

        var viewModel = this,
            formLists = [],
            dialog;

        function onModuleLoad() {
            viewModel.items = CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.WINES_URI).list();
            initEditForm();
        }

        // Fill regions select objects list 
        // and declares setings parameter for wine form
        function initEditForm() {
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.REGIONS_URI)
                .list(function (listRegions) {
                    formLists.push({
                        'name': 'regions',
                        'content': listRegions
                    });
                    viewModel.regions = listRegions;
                    viewModel.regions.unshift({
                        'name': ''
                    });
                });

            viewModel.formSettings = {
                templateUrl: 'templates/wine.html',
                lists: formLists
            };
        }

        function updateItem(item) {
            item.ownedBy = AuthService.getAuthenticatedUser().id;
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.WINES_URI)
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
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.WINES_URI)
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
            if (confirm("Voulez-vous vraiment supprimer cette appellation ?")) {
                CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.WINES_URI + '/' + item.id)
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

        function filterWinesHandler(wine) {
            return (UtilService.isBlank(viewModel.regionFilter) || viewModel.regionFilter.name == wine.region.name);
        }

        viewModel.editItem = editItemHandler;
        viewModel.createItem = createItemHandler;
        viewModel.deleteItem = deleteItemHandler;
        viewModel.filterWines = filterWinesHandler;

        onModuleLoad();
    }

    WinesCtrl.$inject = ['Constants', 'CrudService', 'FormService', 'AuthService', 'UtilService'];

    angular.module('wines.controller')
        .controller('winesCtrl', WinesCtrl);


}());