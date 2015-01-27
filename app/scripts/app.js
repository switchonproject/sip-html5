// main app module registration
angular.module(
    'eu.water-switch-on.sip',
    [
        'eu.water-switch-on.sip.controllers',
        'eu.water-switch-on.sip.directives',
        'eu.water-switch-on.sip.services',
        'eu.water-switch-on.sip.filters',
        'ui.bootstrap.tpls',
        'ui.bootstrap.tabs',
        'ui.bootstrap.typeahead',
        'ui.router',
        'ngResource',
        'ngTable'
    ]
).config(
    [
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            'use strict';
            
            $urlRouterProvider.otherwise('/list');

            $stateProvider.state('list', {
                url: '/list',
                templateUrl: 'views/listView.html'
            });
            $stateProvider.state('th', {
                url: '/th',
                templateUrl: 'views/thumbnailView.html'
            });
            $stateProvider.state('map', {
                url: '/map',
                templateUrl: 'views/mapView.html'
            });
            $stateProvider.state('profile', {
                url: '/profile',
                templateUrl: 'views/profileView.html'
            });
            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'views/loginView.html'
            });
        }
    ]
);
