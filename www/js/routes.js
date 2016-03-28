angular.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('menu.bouteilles', {
            url: '/bottles',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/bouteilles.html',
                    controller: 'bouteillesCtrl'
                }
            }
        })
        .state('menu.rGions', {
            url: '/region',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/regions.html',
                    controller: 'rGionsCtrl'
                }
            }
        })
        .state('menu.domaines', {
            url: '/dealers',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/domaines.html',
                    controller: 'domainesCtrl'
                }
            }
        })
        .state('menu', {
            url: '/side-menu21',
            templateUrl: 'templates/menu.html',
            abstract: true
        })
        .state('menu.appellations', {
            url: '/wines',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/appellations.html',
                    controller: 'appellationsCtrl'
                }
            }
        })
        .state('menu.types', {
            url: '/classifications',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/types.html',
                    controller: 'typesCtrl'
                }
            }
        })
        .state('menu.utilisateurs', {
            url: '/users',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/utilisateurs.html',
                    controller: 'utilisateursCtrl'
                }
            }
        })
        .state('menu.commandes', {
            url: '/orders',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/commandes.html',
                    controller: 'commandesCtrl'
                }
            }
        })
        .state('menu.statistiques', {
            url: '/stats',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/statistiques.html',
                    controller: 'statistiquesCtrl'
                }
            }
        })

    $urlRouterProvider.otherwise('/side-menu21/bottles')



});