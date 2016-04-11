(function () {
    'use strict';

    function FormService($rootScope, $ionicModal) {

        var service = {};

        function Show(item, settings) {

            var modalScope = $rootScope.$new(),
                parameters = {
                    scope: modalScope,
                    animation: 'fade-in-scale'
                };

            // Initializing all lists for select objects 
            if (settings.lists !== undefined) {
                modalScope.lists = [];
                settings.lists.forEach(function (itemList) {
                    modalScope.lists[itemList.name] = itemList.content;
                });
            }

            return $ionicModal.fromTemplateUrl(settings.templateUrl, parameters)
                .then(function (modal) {

                    modalScope.modal = modal;
                    modalScope.item = item;

                    modalScope.openModal = function () {
                        modalScope.modal.show();
                    };

                    modalScope.closeModal = function () {
                        modalScope.modal.hide();
                    }

                    modalScope.saveItem = function (item) {
                        settings.save(item);
                        modalScope.modal.hide();
                    }

                    modalScope.modal.show();
                });

        }

        service.show = Show;

        return service;

    }

    FormService.$inject = ['$rootScope', '$ionicModal'];

    angular.module('form.service')
        .factory('FormService', FormService);
}());