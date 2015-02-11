/* 
 * ***************************************************
 * 
 * cismet GmbH, Saarbruecken, Germany
 * 
 *               ... and it just works.
 * 
 * ***************************************************
 */

angular.module(
    'eu.water-switch-on.sip.factories'
).factory('AppConfig',
    [function () {
        'use strict';

        var appConfig = {};
        appConfig.listView = {};
        appConfig.listView.highlightKeyword = 'query-keyword';
        // hide all keywords except those beloging to the Tag Group:
        appConfig.listView.filterKeyword = 'keywords - CUASHI';

        appConfig.searchService = {};
        appConfig.searchService.username = 'admin@SWITCHON';
        appConfig.searchService.password = 'cismet';
        appConfig.searchService.host = 'http://localhost:8890';

        appConfig.mapView = {};
        appConfig.mapView.backgroundLayer = 'http://{s}.opentopomap.org/{z}/{x}/{y}.png';
        appConfig.mapView.home = {};
        appConfig.mapView.home.lat = 49.245166;
        appConfig.mapView.home.lng = 6.936809;
        appConfig.mapView.home.zoom = 4;

        return appConfig;
    }]);