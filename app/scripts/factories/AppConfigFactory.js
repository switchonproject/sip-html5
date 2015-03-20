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
        // show only this man tags
        appConfig.listView.keywordsLimit = 5;

        appConfig.searchService = {};
        appConfig.searchService.username = 'admin@SWITCHON';
        appConfig.searchService.password = 'cismet';
        //appConfig.searchService.host = 'http://localhost:8890';
        appConfig.searchService.defautLimit = 10;
        appConfig.searchService.host = 'http://switchon.cismet.de/legacy-rest1';

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

        appConfig.search = {};
        // clear any postSearchFilter before perfoming a new search with regular search filters
        // NOTE: this option is not yet implemented!
        appConfig.search.clearPostSearchFilters = true;
        // combines array-type filter expressions in one tag 
        appConfig.search.combineMultileFilterExpressions = true;

        appConfig.postSearchFilter = {};
        // group post search filters when adding to USB
        // if false, each post search filter will be added as distinct negated filter
        appConfig.postSearchFilter.groupPostSearchFilters = true;
        // immediately start the search after applying a post search filter
        appConfig.postSearchFilter.performImplicitSearch = true;
        // wait X ms before perfoming an implict search, thus ginving the user
        // the change to apply additional post search filter
        // NOTE: this option is not yet implemented!
        appConfig.postSearchFilter.implicitSearchDelay = 1000;
        return appConfig;
    }]);