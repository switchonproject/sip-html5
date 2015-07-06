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
        appConfig.searchService.maxLimit = 50;
        appConfig.searchService.host = 'http://switchon.cismet.de/legacy-rest1';

        appConfig.mapView = {};
        appConfig.mapView.backgroundLayer = 'http://{s}.opentopomap.org/{z}/{x}/{y}.png';
        appConfig.mapView.home = {};
        appConfig.mapView.home.lat = 49.245166;
        appConfig.mapView.home.lng = 6.936809;
        appConfig.mapView.home.zoom = 4;
        appConfig.mapView.maxBounds = {};
        appConfig.mapView.maxBounds.southWest = [90, -180]; // top left corner of map
        appConfig.mapView.maxBounds.northEast = [-90, 180];  // bottom right corner  
        appConfig.mapView.minZoom = 2;

        appConfig.gui = {};
        appConfig.gui.dev = true;

        appConfig.tagFilter = {};
        //appConfig.tagFilter.tagGroups = 'access-condition, function, keyword-x-cuahsi, protocol';
        appConfig.tagFilter.tagGroups = 'access-condition, function';

        appConfig.search = {};
        // clear any postSearchFilter before perfoming a new search with regular search filters
        appConfig.search.clearPostSearchFilters = true;
        // combines array-type filter expressions in one tag 
        appConfig.search.combineMultileFilterExpressions = true;
        // switch to list view after successfull search
        appConfig.search.showListView = true;
        // default limit for search results
        appConfig.search.defautLimit = appConfig.searchService.defautLimit;

        appConfig.postSearchFilter = {};
        // group post search filters when adding to USB
        // if false, each post search filter will be added as distinct negated filter
        appConfig.postSearchFilter.groupPostSearchFilters = true;
        // immediately start the search after applying a post search filter
        appConfig.postSearchFilter.performImplicitSearch = false;
        // wait X ms before perfoming an implict search, thus ginving the user
        // the change to apply additional post search filter
        // NOTE: this option is not yet implemented!
        appConfig.postSearchFilter.implicitSearchDelay = 1000;
        // if all search result are loaded into the client,
        // filtering can be perfomred on the local search result
        appConfig.postSearchFilter.applyFilterLocally = true;

        appConfig.objectInfo = {};
        appConfig.objectInfo.resourceJsonUrl = 'http://' +
                appConfig.searchService.username + ':' +
                appConfig.searchService.password + '@' +
                appConfig.searchService.host.replace(/.*?:\/\//g, '');
        appConfig.objectInfo.resourceXmlUrl = 'http://tl-ap001.xtr.deltares.nl/demo_csw?request=GetRecordById&service=CSW&version=2.0.2&namespace=xmlns%28csw=http://www.opengis.net/cat/csw/2.0.2%29&resultType=results&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/xml&ElementSetName=full&id=';

        appConfig.filterExpressionPattern = /(^!?[A-Za-z_\-]+):"([\s\S]+)"$/;

        appConfig.masterToolbar = {};
        // show or hide the "tools" toggle button in the master toolbar
        appConfig.masterToolbar.togglebutton = false;
        // expanded by default. 
        // if togglebutton is not visible and toolbar is expanded, it cannot be hidden
        appConfig.masterToolbar.alwaysExpanded = true;

        return appConfig;
    }]);