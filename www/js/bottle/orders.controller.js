(function () {
    'use strict';

    function OrdersCtrl(Constants, CrudService) {
        var viewModel = this;

        function afterLoad(orders) {
            viewModel.nbOrders = orders.length;
            viewModel.items = orders;
        }

        CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.ORDERED_BOTTLES_URI).list(afterLoad);
    }

    OrdersCtrl.$inject = ['Constants', 'CrudService'];

    angular.module('orders.controller')
        .controller('ordersCtrl', OrdersCtrl);


}());