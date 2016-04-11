(function () {
    'use strict';

    angular.module('cave')
        .constant('Constants', {
            "REGIONS_URI": "api/regions",
            "WINES_URI": "api/wines",
            "BOTTLES_URI": "api/bottles",
            "ORDERED_BOTTLES_URI": "api/orders",
            "DRINK_BOTTLE_URI": "api/bottles/drink",
            "WINERIES_URI": "api/dealers",
            "USERS_URI": "api/users",
            "USER_ROLES_URI": "api/users/roles",
            "CLASSIFICATIONS_URI": "api/classifications",
            "EDIT_ITEM_EVENT": "EDIT_ITEM_EVENT",
            "CREATED_ITEM_EVENT": "CREATED_ITEM_EVENT",
            "UPDATED_ITEM_EVENT": "UPDATED_ITEM_EVENT",
            "DELETED_ITEM_EVENT": "DELETED_ITEM_EVENT",
            "DISPLAY_MSG_EVENT": "DISPLAY_MSG_EVENT",
            "HIDE_MENU_EVENT": "HIDE_MENU_EVENT",
            "SHOW_MENU_EVENT": "SHOW_MENU_EVENT",
            "ADD_CLICK_EVENT": "ADD_CLICK_EVENT",
            "GEOCODING_API_URL": "http://maps.google.com/maps/api/geocode/json?sensor=false&language=fr",
            "GEOCODING_API_KEY": "AIzaSyDvPXa7RlrYiwVYj5w_CKt8YMTdGCcXfMk",
            "SHOW_LOCATION_EVENT": "SHOW_LOCATION_EVENT",
            "HIDE_LOCATION_EVENT": "HIDE_LOCATION_EVENT",
            "SHOW_LOADING_EVENT": "SHOW_LOADING_EVENT",
            "HIDE_LOADING_EVENT": "HIDE_LOADING_EVENT",
            "MENU_SELECTED_EVENT": "MENU_SELECTED_EVENT",
            "DEFAULT_BACKEND_URL": "http://localhost:1337/localhost:8080/cave",
            "LOCAL_XSRF_TOKEN": "XSRF-TOKEN"
        });

}());