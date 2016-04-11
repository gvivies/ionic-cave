(function () {
    'use strict';

    function UsersCtrl(Constants, CrudService, FormService, AuthService, UtilService) {
        var viewModel = this,
            formLists = [],
            dialog;

        function onModuleLoad() {
            viewModel.items = CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.USERS_URI).list();
            initEditForm();
        }

        // Fill regions select objects list 
        // and declares setings parameter for wine form
        function initEditForm() {
            viewModel.roles = CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.USER_ROLES_URI).list(function (roles) {
                var idx = 0;
                roles.forEach(function addIndex(role) {
                    role.index = idx;
                    idx++;
                });
                formLists.push({
                    'name': 'roles',
                    'content': roles
                });
                viewModel.formSettings = {
                    templateUrl: 'templates/user.html',
                    lists: formLists
                };
            });

        }

        function updateItem(item) {
            item.ownedBy = AuthService.getAuthenticatedUser().id;
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.USERS_URI)
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
            CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.USERS_URI)
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
            if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
                CrudService.resource(Constants.DEFAULT_BACKEND_URL + '/' + Constants.USERS_URI + '/' + item.id)
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

        function getRoleName(id) {
            var idx = UtilService.getIndex(id, viewModel.roles);
            return viewModel.roles[idx].roleName;
        }

        function roleTrackBy(idx) {
            return UtilService.getIndex(idx, viewModel.roles);
        }

        viewModel.editItem = editItemHandler;
        viewModel.createItem = createItemHandler;
        viewModel.deleteItem = deleteItemHandler;
        viewModel.roleTrackBy = roleTrackBy;

        onModuleLoad();
    }

    UsersCtrl.$inject = ['Constants', 'CrudService', 'FormService', 'AuthService', 'UtilService'];

    angular.module('users.controller')
        .controller('usersCtrl', UsersCtrl);


}());