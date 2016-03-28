//= require_tree lib
//= require_self

(function () {
    'use strict';

    angular.module('menu.directive', ['ngMaterial']);

    angular.module('menu.service', []);

    angular.module('crud.service', ['ngResource']);

    angular.module('util.service', []);

    angular.module('message.directive', []);

    angular.module('form.service', []);

    angular.module('confirm.service', []);

    angular.module('geocode.service', []);

    angular.module('spinner.directive', []);

    angular.module('authent.service', []);

    angular.module('csrf.service', ['ngCookies']);

})();