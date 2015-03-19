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
        // highlight the keywords beloging to the following tag group
        appConfig.listView.highlightKeyword = 'query-keyword';
        // hide all keywords except those beloging to the Tag Group:
        appConfig.listView.filterKeyword = null;

        appConfig.searchService = {};
        appConfig.searchService.username = 'admin@SWITCHON';
        appConfig.searchService.password = 'cismet';
        appConfig.searchService.host = 'http://localhost:8890';
        appConfig.searchService.defautLimit = 10;
        //appConfig.searchService.host = 'http://switchon.cismet.de/legacy-rest1';

        appConfig.mapView = {};
        appConfig.mapView.backgroundLayer = 'http://{s}.opentopomap.org/{z}/{x}/{y}.png';
        appConfig.mapView.home = {};
        appConfig.mapView.home.lat = 49.245166;
        appConfig.mapView.home.lng = 6.936809;
        appConfig.mapView.home.zoom = 4;

        appConfig.gui = {};
        appConfig.gui.dev = true;

        appConfig.tagFilter = {};
        //appConfig.tagFilter.tagGroups = 'access-condition, function, keyword-cuahsi, protocol';
        appConfig.tagFilter.tagGroups = 'access-condition, function';

        return appConfig;
    }]);