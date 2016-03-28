//= require _modules
//= require_self

(function () {
    'use strict';

    function menuDirective() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'templates/menu.html',
            controllerAs: 'menuCtrl',
            controller: function ($scope, $rootScope, $attrs, $location, MenuService, Constants, $timeout, $mdSidenav, $log) {

                function onShowMenuEventHandler() {
                    menuVM.displayMenu = true;
                }

                function onHideMenuEventHandler() {
                    menuVM.displayMenu = false;
                }

                function openMenu($mdOpenMenu, ev) {
                    $mdOpenMenu(ev);
                }

                function selectMenu(idx) {
                    var menuTitle,
                        nextUri;
                    if (idx === 1) {
                        menuTitle = 'Les bouteilles';
                        nextUri = 'bottles';
                    } else if (idx === 2) {
                        menuTitle = 'Les appellations';
                        nextUri = 'wines';
                    } else if (idx === 3) {
                        menuTitle = 'Les régions';
                        nextUri = 'regions';
                    } else if (idx === 4) {
                        menuTitle = 'Les domaines';
                        nextUri = 'wineries';
                    } else if (idx === 5) {
                        menuTitle = 'Les types';
                        nextUri = 'classifications';
                    } else if (idx === 6) {
                        menuTitle = 'Les utilisateurs';
                        nextUri = 'users';
                    } else if (idx === 7) {
                        menuTitle = 'Les commandes';
                        nextUri = 'orders';
                    } else if (idx === 8) {
                        menuTitle = 'Les statistiques';
                        nextUri = 'stats';
                    }

                    $location.path(nextUri);
                    MenuService.setActive(idx, menuTitle);
                    close();
                }

                function onAddButtonClick() {
                    $scope.$broadcast(Constants.ADD_CLICK_EVENT);
                }

                /* Menu management */
                function debounce(func, wait, context) {
                    var timer;
                    return function debounced() {
                        var context = $scope,
                            args = Array.prototype.slice.call(arguments);
                        $timeout.cancel(timer);
                        timer = $timeout(function () {
                            timer = undefined;
                            func.apply(context, args);
                        }, wait || 10);
                    };
                }

                function close() {
                    $mdSidenav('left').close()
                        .then(function () {
                            //$log.debug("Close is done");
                        });
                }

                function buildDelayedToggler() {
                    $mdSidenav('left')
                        .toggle()
                        .then(function () {});
                }

                /* on Load */

                var menuVM = this;

                menuVM.menuLabel = ['Bouteilles', 'Appellations', 'Régions', 'Domaines', 'Types', 'Utilisateurs', 'Commandes', 'Statistiques'];
                menuVM.openMenu = openMenu;
                menuVM.selectMenu = selectMenu;
                menuVM.add = onAddButtonClick;
                menuVM.close = close;
                menuVM.toggle = buildDelayedToggler;

                MenuService.setActive(1, 'Les bouteilles');

                $scope.$on(Constants.SHOW_MENU_EVENT, onShowMenuEventHandler);
                $scope.$on(Constants.HIDE_MENU_EVENT, onHideMenuEventHandler);

            },
            link: function (scope, element, attributes) {

            }
        };
    }

    angular.module('menu.directive')
        .directive('appMenu', menuDirective);
}());