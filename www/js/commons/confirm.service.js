//= require _modules
//= require_self

(function MainConfirmService() {
    'use strict';

    function ConfirmService($mdDialog) {

        var service = {};

        function confirmDelete(item, itemDesc) {
            var text = 'Vous allez supprimer ' + itemDesc + ' ' + item.name,
                dialogBox = $mdDialog.confirm()
                .title('Etes vous sûr ?')
                .content(text)
                .ariaLabel('Suppression' + item.name)
                .ok('Supprimer')
                .cancel('Annuler');
            return $mdDialog.show(dialogBox);
        }

        function confirmDrink(item) {
            var text = "Confirmez-vous l'ouverture d'une bouteille de " + item.name + " ?",
                dialogBox = $mdDialog.confirm()
                .title('Etes vous sûr ?')
                .content(text)
                .ariaLabel('Boire une bouteille de ' + item.name)
                .ok('Boire')
                .cancel('Annuler');
            return $mdDialog.show(dialogBox);
        }

        service.confirmDelete = confirmDelete;
        service.confirmDrink = confirmDrink;

        return service;
    }

    angular.module('confirm.service')
        .factory('ConfirmService', ['$mdDialog', ConfirmService]);
}());