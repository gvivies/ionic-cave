(function () {
    'use strict';



    function BottlesCtrl(Constants, CrudService, FormService, UtilService, AuthService) {

        var viewModel = this,
            listWines = [],
            listWineries = [],
            listClassifications = [],
            formLists = [],
            dialog;

        function onModuleLoad() {
            initBottleForm();
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.BOTTLES_URI)
                .list(populate);
        }

        function populate(bottles) {
            var nb = 0;
            bottles.forEach(function (bottle) {
                nb += bottle.quantity;
            });
            viewModel.nbBottles = nb;
            viewModel.items = bottles;
        }

        function updateItem(item) {
            item.ownedBy = AuthService.getAuthenticatedUser().id;
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.BOTTLES_URI)
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
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.BOTTLES_URI)
                .create(item, function onSaveSuccess() {
                    // Insert in current list
                    var idx = UtilService.getIndex(item.id, viewModel.items);
                    viewModel.items.push(item);
                }, function onSaveError() {
                    // TODO Error message
                });
        }

        // Fill all select objects list : wines, wineries and classifications
        // and declare setings parameter for bottles form
        function initBottleForm() {
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.WINES_URI)
                .list(function (listWines) {
                    formLists.push({
                        'name': 'wines',
                        'content': listWines
                    });
                });
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.WINERIES_URI)
                .list(function (listWineries) {
                    formLists.push({
                        'name': 'wineries',
                        'content': listWineries
                    });
                });
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.CLASSIFICATIONS_URI)
                .list(function (listClassifications) {
                    formLists.push({
                        'name': 'classifications',
                        'content': listClassifications
                    });
                    viewModel.classifications = listClassifications;
                    /*
                    if (!UtilService.isBlank($routeParams.classif)) {
                        viewModel.classification = listClassifications[UtilService.getIndex($routeParams.classif, listClassifications)];
                    }*/
                });

            viewModel.formSettings = {
                templateUrl: 'templates/bottle.html',
                lists: formLists
            };
        }

        function drinkHandler(item) {
            function drinkOne() {
                CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.DRINK_BOTTLE_URI)
                    .update(item, function onDrinkSuccess(data) {
                        //$scope.$emit(Constants.DISPLAY_MSG_EVENT, "Une bouteille a été enlevée avec succès !");
                        item.quantity = data.quantity;
                    }, function onDrinkError() {
                        //
                    });
            }

            if (confirm("Voulez-vous vraiment boire une bouteille de " + item.name + " ?")) {
                drinkOne();
            }

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
            if (confirm("Voulez-vous vraiment supprimer ces bouteilles ?")) {
                CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.BOTTLES_URI + '/' + item.id)
                    .remove(
                        function onRemoveSuccess() {
                            var idx = viewModel.items.indexOf(item);
                            viewModel.items.splice(idx, 1);
                            //$scope.$emit(Constants.DISPLAY_MSG_EVENT, "La suppression de " + item.name + " a été effectuée avec succès");
                        },
                        function onRemoveError() {
                            //$scope.$emit(Constants.DISPLAY_MSG_EVENT, "Une erreur est survenue lors de la suppression de " + item.name);
                        });
            }
        }

        viewModel.editItem = editItemHandler;
        viewModel.createItem = createItemHandler;
        viewModel.deleteItem = deleteItemHandler;
        viewModel.drink = drinkHandler;

        onModuleLoad();

    }

    BottlesCtrl.$inject = ['Constants', 'CrudService', 'FormService', 'UtilService', 'AuthService'];

    angular.module('bottles.controller')
        .controller('bottlesCtrl', BottlesCtrl);

}());