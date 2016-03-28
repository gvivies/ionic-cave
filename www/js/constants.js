//= require application.js
//= require_self

(function () {
    'use strict';

    angular.module('cave').constant('Constants', {
        "REGIONS_URI": "regions",
        "WINES_URI": "wines",
        "BOTTLES_URI": "bottles",
        "ORDERED_BOTTLES_URI": "orders",
        "DRINK_BOTTLE_URI": "bottles/drink",
        "WINERIES_URI": "dealers",
        "USERS_URI": "users",
        "USER_ROLES_URI": "users/roles",
        "CLASSIFICATIONS_URI": "classifications",
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
        "MENU_SELECTED_EVENT": "MENU_SELECTED_EVENT"
    });

}());