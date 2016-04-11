// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('cave', ['ionic',
                       'ngResource',
                       'chart.js',
                       'crud.service',
                       'authent.service',
                       'token.service',
                       'app.routes',
                       'login.controller',
                       'bottles.controller',
                       'orders.controller',
                       'classifications.controller',
                       'wines.controller',
                       'regions.controller',
                       'wineries.controller',
                       'users.controller',
                       'form.service',
                       'util.service',
                       'geocode.service',
                       'stats.controller',
                       'location.directive'
                      ])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

    });