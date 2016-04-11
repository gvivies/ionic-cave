(function () {
    'use strict';

    function WineriesCtrl($scope, Constants, CrudService, FormService, AuthService, UtilService, GeoCodeService, $ionicModal) {
        var viewModel = this,
            formLists = [],
            dialog;

        function onModuleLoad() {
            viewModel.items = CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.WINERIES_URI).list();
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
                    //viewModel.regions.unshift({
                    //    'name': ''
                    //});
                });

            viewModel.formSettings = {
                templateUrl: 'templates/winery.html',
                lists: formLists
            };
        }

        function updateItem(item) {
            item.ownedBy = AuthService.getAuthenticatedUser().id;

            geoCodeThis(item);

            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.WINERIES_URI)
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

            geoCodeThis(item);

            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.WINERIES_URI)
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
            if (confirm("Voulez-vous vraiment supprimer ce domaine ?")) {
                CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.WINERIES_URI + '/' + item.id)
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

        // --- Location Map 
        function showLocationHandler(item) {

            var lat = parseFloat(item.latitude),
                lng = parseFloat(item.longitude),
                mapCenter = {
                    latitude: lat,
                    longitude: lng
                },
                markerCoords = Object.create(mapCenter),
                modalScope = $scope,
                parameters = {
                    scope: modalScope,
                    animation: 'fade-in-scale'
                };

            modalScope.formattedAddress = item.street + '<br/>' + item.zipCode + '<br/>' + item.city;
            modalScope.title = 'Localisation de ' + item.name;
            modalScope.map = {
                center: mapCenter,
                zoom: 12
            };
            modalScope.marker = {
                id: 0,
                coords: markerCoords,
                title: item.name
            };
            modalScope.marker.options = {
                draggable: false,
                labelContent: modalScope.formattedAddress,
                labelAnchor: "100 0",
                labelClass: "marker-labels"
            };

            $ionicModal.fromTemplateUrl('templates/location.html', parameters)
                .then(function (modal) {

                    modalScope.modal = modal;
                    modalScope.item = item;

                    modalScope.openModal = function () {
                        modalScope.modal.show();
                    };

                    modalScope.closeModal = function () {
                        modalScope.modal.hide();
                    }

                    modalScope.modal.show();
                });

        }

        viewModel.editItem = editItemHandler;
        viewModel.createItem = createItemHandler;
        viewModel.deleteItem = deleteItemHandler;
        viewModel.showLocation = showLocationHandler;

        onModuleLoad();

    }

    WineriesCtrl.$inject = ['$scope', 'Constants', 'CrudService', 'FormService', 'AuthService', 'UtilService', 'GeoCodeService', '$ionicModal'];

    angular.module('wineries.controller')
        .controller('wineriesCtrl', WineriesCtrl);

}());