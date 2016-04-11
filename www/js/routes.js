(function () {
    'use strict';

    angular.module('app.routes')
        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider
                .state('menu.bottles', {
                    url: '/bottles',
                    views: {
                        'cave': {
                            templateUrl: 'templates/bottles.html',
                            controller: 'bottlesCtrl',
                            controllerAs: 'ctrl'
                        }
                    },
                    cache: false
                })
                .state('menu.regions', {
                    url: '/regions',
                    views: {
                        'cave': {
                            templateUrl: 'templates/regions.html',
                            controller: 'regionsCtrl',
                            controllerAs: 'ctrl'
                        }
                    },
                    cache: false
                })
                .state('menu.wineries', {
                    url: '/wineries',
                    views: {
                        'cave': {
                            templateUrl: 'templates/wineries.html',
                            controller: 'wineriesCtrl',
                            controllerAs: 'ctrl'
                        }
                    },
                    cache: false
                })
                .state('menu', {
                    url: '/cave',
                    templateUrl: 'templates/menu.html',
                    abstract: true
                })
                .state('menu.wines', {
                    url: '/wines',
                    views: {
                        'cave': {
                            templateUrl: 'templates/wines.html',
                            controller: 'winesCtrl',
                            controllerAs: 'ctrl'
                        }
                    },
                    cache: false
                })
                .state('menu.types', {
                    url: '/classifications',
                    views: {
                        'cave': {
                            templateUrl: 'templates/classifications.html',
                            controller: 'classifsCtrl',
                            controllerAs: 'ctrl'
                        }
                    },
                    cache: false
                })
                .state('menu.users', {
                    url: '/users',
                    views: {
                        'cave': {
                            templateUrl: 'templates/users.html',
                            controller: 'usersCtrl',
                            controllerAs: 'ctrl'
                        }
                    },
                    cache: false
                })
                .state('menu.orders', {
                    url: '/orders',
                    views: {
                        'cave': {
                            templateUrl: 'templates/orders.html',
                            controller: 'ordersCtrl',
                            controllerAs: 'ctrl'
                        }
                    },
                    cache: false
                })
                .state('menu.statistics', {
                    url: '/stats',
                    views: {
                        'cave': {
                            templateUrl: 'templates/statistics.html',
                            controller: 'statisticsCtrl',
                            controllerAs: 'ctrl'
                        }
                    },
                    cache: false
                })
                .state('menu.login', {
                    url: '/login',
                    views: {
                        'cave': {
                            templateUrl: 'templates/login.html',
                            controller: 'loginCtrl',
                            controllerAs: 'ctrl'
                        }
                    },
                    cache: false
                });

            $urlRouterProvider.otherwise('/cave/login');

            // Allows CORS 
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

            // Allows Cookies sent by server
            $httpProvider.defaults.withCredentials = true;

            // Interceptor that provides token in header and check HTTP 403
            $httpProvider.interceptors.push('TokenInterceptor');

        });

}());