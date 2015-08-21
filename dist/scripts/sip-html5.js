// main app module registration
angular.module(
    'eu.water-switch-on.sip',
    [
        'eu.water-switch-on.sip.controllers',
        'eu.water-switch-on.sip.directives',
        'eu.water-switch-on.sip.services',
        'eu.water-switch-on.sip.filters',
        'eu.water-switch-on.sip.factories',
        'de.cismet.cids.services',
        'ui.router',
        'ui.bootstrap.tpls',
        'ngResource'
    ]
).config(
    [
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            'use strict';

            var resolveResource;

            resolveResource =  function ($stateParams, $q, searchService, shareService) {
                var deferred, obj, objs;

                deferred = $q.defer();

                objs = shareService.getResourceObjects();
                obj = null;
                if (objs && angular.isArray(objs)) {
                    objs.some(function (resource) {
                        if (resource.id === $stateParams.resId) {
                            obj = resource;
                        }
                        return obj !== null;
                    });
                }

                if (obj) {
                    deferred.resolve(obj);
                } else {
                    searchService.entityResource.get({
                        classname: 'resource',
                        objId: $stateParams.resId
                    }).$promise.then(
                        function (obj) {
                            deferred.resolve(obj);
                        },
                        function () {
                            deferred.reject('No resource with id found: ' + $stateParams.resId);
                        }
                    );
                }

                return deferred.promise;
            };

//            $urlRouterProvider.when();
            $urlRouterProvider.otherwise('/map');

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
            $stateProvider.state('mapObject', {
                url: '/map/object/:resId',
                templateUrl: 'views/mapView.html',
                controller: 'eu.water-switch-on.sip.controllers.mapViewController',
                resolve: {
                    resource: [
                        '$stateParams',
                        '$q',
                        'eu.water-switch-on.sip.services.SearchService',
                        'eu.water-switch-on.sip.services.shareService',
                        resolveResource
                    ]
                }
            });
            $stateProvider.state('profile', {
                url: '/profile',
                templateUrl: 'views/profileView.html'
            });
            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'views/loginView.html'
            });

            $stateProvider.state('resourceDetail', {
                url: '/resource/:resId',
                templateUrl: 'views/object-detail-view.html',
                controller: 'eu.water-switch-on.sip.controllers.objectDetailController',
                resolve: {
                    resource: [
                        '$stateParams',
                        '$q',
                        'eu.water-switch-on.sip.services.SearchService',
                        'eu.water-switch-on.sip.services.shareService',
                        resolveResource
                    ]
                }
            });
        }
    ]
);

angular.module(
    'eu.water-switch-on.sip.controllers',
    [
        'ui.bootstrap.dropdown',
        'ui.bootstrap.alert',
        'ui.bootstrap.modal',
        'mgcrea.ngStrap.popover',
        'ui.bootstrap.accordion',
        'leaflet-directive',
        'ui.bootstrap.progressbar',
        'ui.bootstrap.buttons'
    ]
);

angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.categoriesDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.TagGroupService',
        'FilterExpression',
        function ($scope, TagGroupService, FilterExpression) {
            'use strict';

            var collectionFilterExpressions, topicFilterExpressions;

            // avoid scope soup in ng repeat
            this.expanded = false;
            this.selectedCategory = null;

            collectionFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__COLLECTION);
            if (!collectionFilterExpressions || collectionFilterExpressions.length === 0) {
                console.warn('collection Filter Expressions not correctly initilaized');
                $scope.filterExpressions.addFilterExpression($scope.collectionFilterExpression);
            }

            topicFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__TOPIC);
            if (!topicFilterExpressions && topicFilterExpressions.length === 0) {
                console.warn('topic Filter Expressions not correctly initilaized');
                $scope.filterExpressions.addFilterExpression($scope.topicFilterExpression);
            }

            this.getCategories = function (category) {
                return TagGroupService.getCategoryList(category);
            };

            this.performCategoriesSearch = function (selectedCategory, categoryValue) {
                // clear all search filters for category search
                $scope.filterExpressions.clear();

                switch (selectedCategory) {
                case 'topic-inspire':
                    $scope.topicFilterExpression.setStringValue(categoryValue);
                    break;
                case 'category-collection':
                    $scope.collectionFilterExpression.setStringValue(categoryValue);
                    break;
                default:
                    return;
                }

                // search with offset 0 and clear any post search filters
                $scope.performSearch()(0, true);
                this.expanded = false;
                this.selectedCategory = null;
            };
        }]
    );
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.countriesFilterDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.TagGroupService',
        function ($scope, TagGroupService) {
            'use strict';

            $scope.filterExpression.selectedCountry = null;
            $scope.countryList = TagGroupService.getCountryList($scope.countryGroup);

            $scope.$watch('filterExpression.selectedCountry', function (newValue, oldValue) {
                if (newValue && (newValue !== oldValue) && newValue.length > 0 && $scope.countryList.hasOwnProperty(newValue[0]) && ($scope.filterExpression.value !== $scope.countryList[newValue[0]])) {
                    $scope.filterExpression.value = $scope.countryList[newValue[0]];
                    $scope.filterExpression.displayValue = newValue[0];
                }
            });
        }
    ]
);

angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.keywordFilterDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.TagGroupService',
        'FilterExpression',
        function ($scope, TagGroupService) {
            'use strict';
            $scope.keywordGroup = $scope.keywordGroup || 'keyword-free';
            $scope.keywordList = TagGroupService.getKeywordList($scope.keywordGroup);
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.listViewDirectiveController',
    [
        '$scope',
        '$filter',
        '$modal',
        '$rootScope',
        'ngTableParams',
        'eu.water-switch-on.sip.services.TagGroupService',
        'eu.water-switch-on.sip.services.filterService',
        'AppConfig',
        function ($scope, $filter, $modal, $rootScope, NgTableParams, TagGroupService,
            FilterService, AppConfig) {
            'use strict';

            var initialSorting, keywordLookupLists, generateKeywordList, generateQueryKeywordList;

            $scope.filterService = FilterService;
            $scope.config = AppConfig.listView;
            $scope.tableParams = new NgTableParams({
                page: 1,
                sorting: initialSorting,
                count: 2
            }, {
                counts: [],
                total: 1,
                getData: function ($defer, params) {
                    var ordered;
                    ordered = (params.sorting() && $scope.filterService.isCompleteResult() && $scope.filterService.getLoadedResourcesNumber() > 1) ?
                            $filter('orderBy')($scope.tableData, params.orderBy()) :
                                $scope.tableData;

                    $defer.resolve(ordered);
                }
            });

            initialSorting = {};
            initialSorting['object.name'] = 'asc';
            keywordLookupLists = {};
            generateKeywordList = function (keywordGroup) {
                if (keywordGroup && keywordGroup !== 'query-keyword') {
                    var keywordList = TagGroupService.getKeywordList(keywordGroup);
                    if (keywordList && !keywordList.$resolved) {
                        //console.log('keyword list not yet resolved');
                        keywordList.$promise.then(function () {
                            //console.log('keyword list generated');
                            keywordLookupLists[keywordGroup] = keywordList.join('|').toLowerCase().split('|');
                        });
                    } else if (keywordList) {
                        keywordLookupLists[keywordGroup] =  keywordList.join('|').toLowerCase().split('|');
                    }
                }
            };

            generateQueryKeywordList = function () {
                var filterExpression, filterExpressions, i, keywordList;
                keywordList = [];
                filterExpressions = $scope.filterExpressions.getFilterExpressionsByType('keyword', true);
                for (i = 0; i < filterExpressions.length; i++) {
                    filterExpression = filterExpressions[i];
                    if (filterExpression && filterExpression.isValid()) {
                        if (filterExpression.value.constructor === Array) {
                            keywordList = keywordList.concat(filterExpression.value.join('|').toLowerCase().split('|'));
                        } else {
                            keywordList.push(filterExpression.value.toLowerCase());
                        }
                    }
                }

                keywordLookupLists['query-keyword'] = keywordList;
            };

            // generate a list with all-lowercase keywords
            generateKeywordList($scope.config.highlightKeyword);

            $scope.showInfo = function (object) {
                var modalInstance, scope;

                scope = $rootScope.$new(true);
                scope.object = object;

                modalInstance = $modal.open({
                    templateUrl: 'templates/object-info-modal-template.html',
                    controller: 'eu.water-switch-on.sip.controllers.objectInfoModalController',
                    scope: scope,
                    size: 'lg',
                    backdrop: 'static'
                });
            };

            $scope.showDownload = function (object) {
                var modalInstance, scope;

                scope = $rootScope.$new(true);
                scope.object = object;

                modalInstance = $modal.open({
                    templateUrl: 'templates/object-download-modal-template.html',
                    controller: 'eu.water-switch-on.sip.controllers.objectDownloadModalController',
                    scope: scope,
                    size: 'lg',
                    backdrop: 'static'
                });
            };

            $scope.isHighlightKeyword = function (keywordGroup, keyword) {
                if (keyword) {
                    if (keywordLookupLists.hasOwnProperty(keywordGroup)) {
                        return keywordLookupLists[keywordGroup].indexOf(keyword.toLowerCase()) > -1;
                    }
                }
                return false;
            };

            $scope.$watch('tableData', function () {
                // this is the list that contains the keyywords of the current query
                generateQueryKeywordList();
                $scope.tableParams.reload();
            });
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.mapViewController',
    [
        '$scope',
        // the router resolves this resource object
        'resource',
        function ($scope, resource) {
            'use strict';

            $scope.object = resource;
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.mapViewDirectiveController',
    [
        '$scope',
        '$window',
        '$timeout',
        'leafletData',
        'de.cismet.cids.services.featureRendererService',
        'AppConfig',
        function ($scope, $window, $timeout, leafletData, rendererService, AppConfig) {
            'use strict';

            var drawCtrl, fireResize, internalChange, MapSearchIcon, objGroup, searchGroup, setObjects,
                setSearchGeom, setSearchGeomWkt, wicket, config, highlightObjectLayer, setObject, southWest, northEast;

            config = AppConfig.mapView;

            angular.extend($scope, {
                defaults: {
                    tileLayer: config.backgroundLayer,
                    //tileLayerOptions: {noWrap: true},
                    //maxZoom: 14,
                    minZoom: config.minZoom,
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    }
                }
            });

            // <editor-fold defaultstate="collapsed" desc=" window resize " >
            fireResize = function (animate) {
                $scope.currentHeight = $window.innerHeight - $scope.navbarHeight;
                $scope.currentWidth = $window.innerWidth - ($scope.toolbarShowing ? $scope.toolbarWidth : 0);
                leafletData.getMap('mainmap').then(function (map) {
                    map.invalidateSize(animate);
                });
            };

            $scope.currentHeight = $window.innerHeight - $scope.navbarHeight;
            $scope.currentWidth = $window.innerWidth - ($scope.isResultShowing ? $scope.toolbarWidth : 0);

            $scope.$watch('toolbarShowing', function () {
                $timeout(function () {
                    fireResize(true);
                }, 500);
            });

            $scope.center = config.home;

            // set the max bounds of the map
            southWest = (config.maxBounds && angular.isArray(config.maxBounds.southWest)) ?
                            L.latLng(config.maxBounds.southWest[0], config.maxBounds.southWest[1]) :
                            L.latLng(90, -180);
            northEast = (config.maxBounds && angular.isArray(config.maxBounds.northEast)) ?
                            L.latLng(config.maxBounds.northEast[0], config.maxBounds.northEast[1]) :
                            L.latLng(-90, 180);
            $scope.maxBounds = L.latLngBounds(southWest, northEast);
            leafletData.getMap('mainmap').then(function (map) {
                map.setMaxBounds($scope.maxBounds);
            });

            angular.element($window).bind('resize', function () {
                fireResize(false);
            });
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc=" search geom " >
            MapSearchIcon = L.Icon.extend({
                options: {
                    shadowUrl: null,
                    iconAnchor: new L.Point(16, 31),
                    iconSize: new L.Point(32, 32),
                    iconUrl: 'images/search_point_icon_32.png'
                }
            });
            wicket = new Wkt.Wkt();
            searchGroup = new L.FeatureGroup();
            drawCtrl = new L.Control.Draw({
                draw: {
                    polyline: false,
                    polygon: {
                        shapeOptions: {
                            color: '#800000'
                        },
                        showArea: true,
                        metric: true
                    },
                    rectangle: {
                        shapeOptions: {
                            color: '#800000',
                            clickable: false
                        },
                        metric: true
                    },
                    // no circles for starters as not compatible with WKT
                    circle: false,
                    marker: false
                },
                edit: {
                    featureGroup: searchGroup
                }
            });

            leafletData.getMap('mainmap').then(function (map) {
                map.addLayer(searchGroup);
                map.addControl(drawCtrl);

                map.on('draw:created', function (event) {
                    setSearchGeom(event.layer);
                });

                map.on('draw:deleted', function (event) {
                    event.layers.eachLayer(function (layer) {
                        if (layer === $scope.searchGeomLayer) {
                            setSearchGeom(null);
                        }
                    });
                });
            });

            setSearchGeom = function (layer) {
                searchGroup.removeLayer($scope.searchGeomLayer);
                $scope.searchGeomLayer = layer;
                if (layer !== null) {
                    searchGroup.addLayer($scope.searchGeomLayer);
                }

                // center on search geometry
                if ($scope.centerSearchGeometry && searchGroup.getLayers().length > 0) {
                    leafletData.getMap('mainmap').then(function (map) {
                        map.fitBounds(searchGroup.getBounds(), {
                            animate: true,
                            pan: {animate: true, duration: 0.6},
                            zoom: {animate: true},
                            maxZoom: $scope.preserveZoomOnCenter ? map.getZoom() : null
                        });
                    });
                }
            };

            // set the search geometry from WKT String
            setSearchGeomWkt = function (wktString) {
                if (wktString) {
                    try {
                        wicket.read(wktString);
                        internalChange = true;
                        setSearchGeom(wicket.toObject({color: '#800000', icon: new MapSearchIcon()}));
                    } catch (e) {

                        // clear on illigegal WKT
                        searchGroup.removeLayer($scope.searchGeomLayer);
                        $scope.searchGeomLayer = undefined;
                        $scope.searchGeomWkt = null;
                        console.error('ignoring invalid WKT');
                    }
                } else if (wktString === null) {
                    searchGroup.removeLayer($scope.searchGeomLayer);
                    $scope.searchGeomLayer = undefined;
                }
            };

            // internal change flag prevents watches to trigger from internal changes
            // initially set to false
            internalChange = false;

            // set search geom (e.g. from existing filter expression) 
            // when switchon to map view
            setSearchGeomWkt($scope.searchGeomWkt);

            //watch the actual search area and update the WKT String
            // (and thus the filter expression)
            $scope.$watch('searchGeomLayer', function (n, o) {
                var wkt;

                if (internalChange) {
                    internalChange = false;
                } else {
                    if (n !== undefined && n !== o) {
                        if (n === null) {
                            wkt = '';
                        } else {
                            wicket.fromObject(n);
                            wkt = wicket.write();
                        }
                        internalChange = true;
                        $scope.searchGeomWkt = wkt;
                        $scope.searchGeomTitle = wicket.type;
                    }
                }
            });

            // watch the WKT String, e.g. injected from a filter expression
            $scope.$watch('searchGeomWkt', function (n, o) {
                if (internalChange) {
                    internalChange = false;
                } else {
                    if (n && n !== o) {
                        setSearchGeomWkt(n);
                    } else if (n === null) {
                        setSearchGeomWkt(null);
                    }
                }
            });
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc=" objects " >
            objGroup = new L.FeatureGroup();
            leafletData.getMap('mainmap').then(function (map) {
                objGroup.addTo(map);
            });

            /**
             * Set result objects (entities and resources) and add the respective
             * layers to the map.
             * 
             * @param {type} objs
             * @returns {undefined}
             */
            setObjects = function (objs) {
                var i, renderer;

                objGroup.clearLayers();
                objGroup.setStyle(rendererService.defaultStyle);
                for (i = 0; i < objs.length; ++i) {
                    // get WMS or Feature Layers
                    renderer = rendererService.getFeatureRenderer(objs[i]);
                    if (renderer) {
                        objGroup.addLayer(renderer);
                    }
                }

                // center on all object layers 
                if ($scope.centerObjects && objGroup.getLayers().length > 0) {
                    leafletData.getMap('mainmap').then(function (map) {
                        map.fitBounds(objGroup.getBounds(), {
                            animate: true,
                            pan: {animate: true, duration: 0.6},
                            zoom: {animate: true},
                            maxZoom: $scope.preserveZoomOnCenter ? map.getZoom() : null
                        });
                    });
                }
            };

            /**
             * Called when an object is selected
             * 
             * @param {int} layer Index
             * @returns {undefined}
             */
            highlightObjectLayer = function (layerIndex) {
                leafletData.getMap('mainmap').then(function (map) {
                    // FIXME: probably use with layer ids?
                    // see https://github.com/Leaflet/Leaflet/issues/1805

                    var layer, layers, i;
                    layers = objGroup.getLayers();

                    for (i = 0; i < layers.length; i++) {
                        layer = layers[i];

                        // the highlight layer
                        if (i === layerIndex) {
                            // highlight feature layer
                            if (typeof layer.setStyle === 'function') {
                                layer.setStyle(rendererService.highlightStyle);
                            } else if (typeof layer.setOpacity === 'function') {
                               // "enable" the WMS / Tile layer
                                layer.setOpacity(1.0);
                                //layer.bringToFront();
                            }

                            // center on feature layer unless preserve search area is on
                            if (!$scope.searchGeomLayer || ($scope.searchGeomLayer && $scope.preserveSearchArea !== true)) {
                                if (typeof layer.getLatLng  === 'function' && layer.getLatLng()) {
                                    map.setView(layer.getLatLng(), 10, {
                                        animate: true,
                                        pan: {animate: true, duration: 0.6},
                                        zoom: {animate: true}
                                    });
                                } else if (typeof layer.getBounds === 'function' && layer.getBounds()) {
                                    map.fitBounds(layer.getBounds(), {
                                        animate: true,
                                        pan: {animate: true, duration: 0.6},
                                        zoom: {animate: true},
                                        maxZoom: null
                                    });
                                }
                            }
                        } else {
                            if (typeof layer.setStyle === 'function') {
                                layer.setStyle(rendererService.defaultStyle);
                            } else if (typeof layer.setOpacity === 'function') {
                               // "disable" the WMS / Tile layer
                                layer.setOpacity(0.0);
                                //layer.bringToBack();
                            }
                        }
                    }
                });
            };

            /**
             * This operation is called when a an object id is provided as part of the route.
             * The object is either loaded from the server or from the cached object 
             * (search results stored in the share service).
             * 
             * Therfore the functionality to show a single object on the map is independet 
             * from the functionality to show the objects returned from search.
             * 
             * 
             * @param {type} object
             * @returns {undefined}
             */
            setObject = function (object) {
                if (object) {
                    var i, length, layer;

                    // check if the object is already in the list of 
                    // (search results) objects rendered on the map
                    if ($scope.objects && $scope.objects > 0) {
                        length = $scope.objects.length;

                        for (i = 0; i < length; ++i) {
                            if ($scope.objects[i].id === object.id) {
                                if (objGroup.getLayers().length > i) {
                                    highlightObjectLayer(i);
                                }
                                return;
                            }
                        }
                    }

                    // if the object is not cached, add a new layer
                    layer = rendererService.getFeatureRenderer(object);
                    if (layer) {
                        objGroup.addLayer(layer);
                        highlightObjectLayer(objGroup.getLayers().length - 1);
                    }
                }
            };

            $scope.$watch('objects', function (n, o) {
                if (n && n !== o) {
                    setObjects(n);
                }
            });

            if ($scope.objects && !$scope.object) {
                setObjects($scope.objects);
            }

            $scope.$watch('object', function (n, o) {
                if (n && n !== o && !$scope.object) {
                    setObject(n);
                }
            });

            if ($scope.object) {
                setObject($scope.object);
            }

            // </editor-fold>

            $scope.$watch('selectedObject', function (n) {
                if (n !== -1 && objGroup.getLayers().length > n) {
                    // FIXME: works only if index of layer correpsonds to index ob object
                    // warning: breaks if no layer can be generated for an object!
                    // other possiblity: attach layer directly to object? 
                    highlightObjectLayer(n);
                }
            });
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.masterController',
    [
        '$scope',
        '$rootScope',
        '$modal',
        'eu.water-switch-on.sip.services.SearchService',
        '$state',
        'FilterExpressions',
        'FilterExpression',
        'eu.water-switch-on.sip.services.TagGroupService',
        'AppConfig',
        'eu.water-switch-on.sip.services.shareService',
        'eu.water-switch-on.sip.services.masterToolbarService',
        'eu.water-switch-on.sip.services.filterService',
        function (
            $scope,
            $rootScope,
            $modal,
            SearchService,
            $state,
            FilterExpressions,
            FilterExpression,
            TagGroupService,
            AppConfig,
            shareService,
            masterToolbarService,
            filterService
        ) {
            'use strict';

            var searchProcessCallback;

            $scope.config = AppConfig;

            $scope.data = {};
            $scope.data.message = 'Welcome to the SWITCH-ON Spatial Information Platform!';
            $scope.data.messageType = 'success';
            $scope.data.selectedObject = -1;
            // FIXME: move to categories directive -----------------------------
            $scope.data.categories = TagGroupService.getKeywordList('category-default');
            // FIXME: move to categories directive -----------------------------
            $scope.state = $state;
            $scope.masterToolbarService = masterToolbarService;

            // -----------------------------------------------------------------

            // initialize some shared filter expressions
            $scope.filterExpressions = new FilterExpressions();

            // define shared filter expressions that are used in several directives
            // GEO Filter
            $scope.geoFilterExpression = new FilterExpression(FilterExpression.FILTER__GEO, null, false, true,
                'templates/geo-editor-popup.html', 'Geography', 'Spatial Extent');
            $scope.geoFilterExpression.getDisplayValue = function (value) {
                if (value && value.indexOf('(') !== -1) {
                    return value.substring(0, value.indexOf('('));
                }

                return 'invalid';
            };
            $scope.geoFilterExpression.setStringValue = function (newValue) {
                var wkt;
                if (newValue) {
                    wkt = new Wkt.Wkt();
                    try {
                        wkt.read(newValue);
                        this.value = newValue;
                    } catch (e) {
                        console.warn('could not parse WKT string "' + newValue + '"');
                    }
                }
            };
            $scope.filterExpressions.addFilterExpression($scope.geoFilterExpression);

            // LIMIT Filter
            $scope.limitFilterExpression = new FilterExpression(FilterExpression.FILTER__OPTION_LIMIT,
                $scope.config.search.defautLimit, false, true,
                'templates/limit-editor-popup.html', 'Results Limit', 'Results Limit');
            $scope.limitFilterExpression.setStringValue = function (newValue) {
                if (newValue) {
                    this.value = parseInt(newValue, 10);
                }

                if (isNaN(this.value)) {
                    this.value = this.defaultValue;
                }

                if (this.value > $scope.config.searchService.maxLimit) {
                    this.value = $scope.config.searchService.maxLimit;
                }
            };
            $scope.filterExpressions.addFilterExpression($scope.limitFilterExpression);

            // OFFSET Filter (not visible)
            $scope.offsetFilterExpression = new FilterExpression(FilterExpression.FILTER__OPTION_OFFSET,
                0, false, false);
            $scope.offsetFilterExpression.setStringValue = function (newValue) {
                if (newValue) {
                    this.value = parseInt(newValue, 10);
                }

                if (isNaN(this.value)) {
                    this.value = 0;
                }
            };
            $scope.filterExpressions.addFilterExpression($scope.offsetFilterExpression);

            // TEXT Search Filter
            $scope.textFilterExpression = new FilterExpression(FilterExpression.FILTER__TEXT,
                    null, false, false, null, 'Fulltext', 'Title and Description Search');
            $scope.filterExpressions.addFilterExpression($scope.textFilterExpression);

            // combined POST Search Filters
            $scope.postSearchFiltersFilterExpression = new FilterExpression(FilterExpression.FILTER__POST_SEARCH_FILTERS,
                [], true, true, null, 'Exclusions');
            $scope.postSearchFiltersFilterExpression.getDisplayValue = function (value) {
                if (value && value.indexOf(':') !== -1 && value.length > 3) {
                    return value.substring(value.indexOf(':') + 2, value.length - 1);
                }

                return value;
            };
            $scope.filterExpressions.addFilterExpression($scope.postSearchFiltersFilterExpression);

            // COLLECTION FILTERS (for categories)
            $scope.collectionFilterExpression = new FilterExpression(FilterExpression.FILTER__COLLECTION,
                    null, false, true, null, 'Data Collection', 'Data Collections');
            $scope.filterExpressions.addFilterExpression($scope.collectionFilterExpression);

            // TOPIC Categories Filters
            $scope.topicFilterExpression = new FilterExpression(FilterExpression.FILTER__TOPIC,
                null, false, true, null, 'INSPIRE Topic Categories', 'INSPIRE Topic Categories');
            $scope.filterExpressions.addFilterExpression($scope.topicFilterExpression);

            // -----------------------------------------------------------------

            $scope.postSearchFilterExpressions = new FilterExpressions();

            $scope.data.resultSet = null;
            $scope.data.resultObjects = [];
            $scope.data.searchStatus = {
                current: 0,
                max: 0,
                objects: 0,
                type: null,
                message: null
            };

            $scope.activateView = function (state) {
                //$scope.showMessage(state + ' view showing', 'success');
                $state.go(state, {});
            };

            $scope.doCloseMessage = function () {
                $scope.data.message = null;
            };

            $scope.showMessage = function (message, type) {
                $scope.data.message = message;
                $scope.data.messageType = type;
            };

            $scope.$watch('data.searchGeomWkt', function (n, o) {
                if (n !== undefined && n !== o) {
                    if (!$scope.filterExpressions.geo) {
                        $scope.filterExpressions.geo = new FilterExpression('geo');
                    }
                    $scope.filterExpressions.geo.value = n;
                    $scope.filterExpressions.geo.displayValue = 'GEOMETRY FROM MAP';
                }
            });

            $scope.$watch('data.resultSet.$collection', function (n, o) {
                var i, objs, message, pages, pageNumber;

                if (n && n !== o && n.length > 0) {
                    objs = [];

                    for (i = 0; i < n.length; ++i) {
                        objs.push(n[i].object);
                    }

                    $scope.data.resultObjects = objs;
                    $scope.data.selectedObject = -1;

                    shareService.setResourceObjects(objs);

                    // service that filters local data.resultSet.$collection
                    filterService.setResultSet($scope.data.resultSet);

                    // now that we know $total number of resources, we can provide
                    // a detailed status message:
                    message = 'Showing ' + $scope.data.resultSet.$length + ' of ' + $scope.data.resultSet.$total + ' resources';
                    if ($scope.data.resultSet.$length < $scope.data.resultSet.$total) {
                        pages = Math.floor($scope.data.resultSet.$total / $scope.data.resultSet.$limit);
                        pages += ($scope.data.resultSet.$total % $scope.data.resultSet.$limit !== 0) ? 1 : 0;
                        pageNumber = $scope.data.resultSet.$offset / $scope.data.resultSet.$limit;
                        message += ' (page ' + (pageNumber + 1) + ' of ' + pages + ')';
                    }

                    $scope.data.message = message;
                    $scope.data.messageType = 'success';
                }
            });

            /**
             * Performs a search under consideration of limit an offset.
             * 
             * @param {number} offset
             * @param {boolean} clearPostSearchFilters
             * @returns {undefined}
             */
            $scope.performSearch = function (offset, clearPostSearchFilters) {
                var universalSearchString, limit;

                $scope.limitFilterExpression.value = $scope.limitFilterExpression.value || $scope.config.searchService.defautLimit;
                limit = $scope.limitFilterExpression.value;

                // applying an offset is only valid in paged results previous and next search
                // therfore only resultSetDirectiveController provided the offset parameter
                // for any other search, the offset has to be (re)set to 0
                if (!offset || offset < 0) {
                    offset = 0;
                    $scope.offsetFilterExpression.value = 0;
                } else {
                    $scope.offsetFilterExpression.value = offset;
                }

                // limit changed while in paged result: hard reset offset!
                if (offset > 0 && limit > 0 && offset % limit !== 0) {
                    offset = 0;
                    $scope.offsetFilterExpression.value = 0;
                }

                // post search filter are only cleared when implicit search is disabled!
                if (clearPostSearchFilters === true &&
                        $scope.config.postSearchFilter.performImplicitSearch === true &&
                        $scope.postSearchFiltersFilterExpression.isValid()) {
                    $scope.postSearchFiltersFilterExpression.clear();
                }

                universalSearchString = $scope.filterExpressions.universalSearchString;

                $scope.data.resultSet = SearchService.search(universalSearchString,
                    $scope.config.tagFilter.tagGroups, limit, offset, searchProcessCallback);
                $scope.showProgress($scope.data.searchStatus);
            };

            $scope.showProgress = function (searchStatus) {
                var modalScope;

                modalScope = $rootScope.$new(true);
                modalScope.status = searchStatus;

                $scope.progressModal = $modal.open({
                    templateUrl: 'templates/search-progress-modal-template.html',
                    scope: modalScope,
                    size: 'lg',
                    backdrop: 'static'
                });
                // issue #32 - check if the eror occurred before the dialog has actually been shown
                $scope.progressModal.opened.then(function () {
                    if ($scope.data.searchStatus.type === 'error') {
                        $scope.progressModal.close();
                    }
                });
            };

            searchProcessCallback = function (current, max, type) {
                // the maximum object count
                $scope.data.searchStatus.max = max;
                // the scaled progress: 0 <fake progress> 100 <real progress> 200
                // $scope.data.searchStatus.current = ...
                // the type of the status
                $scope.data.searchStatus.type = type;

                // start of search (indeterminate)
                if (max === -1 && type === 'success') {
                    // count up fake progress to 100
                    $scope.data.searchStatus.current = current;

                    if (current < 100) {
                        $scope.data.message = 'Search for resource Meta-Data is in progress, please wait.';
                        $scope.data.messageType = 'success';
                        $scope.data.searchStatus.message = $scope.data.message;
                    } else {
                        $scope.data.message = 'The SWITCH-ON Meta-Data Repository is under heavy load, please wait for the search to continue.';
                        $scope.data.messageType = 'warning';
                        $scope.data.searchStatus.message = $scope.data.message;
                        $scope.data.searchStatus.type = 'warning';
                    }

                    // search completed
                } else if (current > 0 && current < max && type === 'success') {
                     // the real object count
                    $scope.data.searchStatus.objects = current;
                    //normalise object count to 100% and count up to 200
                    $scope.data.searchStatus.current = 100 + (current / max * 100);
                    $scope.data.message = 'Collecting meta-data of resource #' + current + ' of ' + max;
                    $scope.data.messageType = 'info';
                    $scope.data.searchStatus.message = $scope.data.message;
                } else if (current === max && type === 'success') {
                    if (current > 0) {
                        $scope.data.searchStatus.current = 200;
                        $scope.data.message = 'Search completed, Meta-Data of ' + current +
                                    (current > 1 ? ' resources' : ' resource') + ' retrieved from the SWITCH-ON Meta-Data Repository.';
                        $scope.data.messageType = 'success';
                        $scope.data.searchStatus.message = $scope.data.message;

                        // always switch to list view if configured
                        if ($scope.config.search.showListView === true) {
                            $scope.activateView('list');
                        }

                    } else {
                        // feature request #59
                        $scope.data.searchStatus.current = 200;
                        $scope.data.message = 'Search completed, but no matching resources found in the SWITCH-ON Meta-Data Repository.';
                        $scope.data.messageType = 'warning';
                        $scope.data.searchStatus.message = $scope.data.message;
                    }

                    if ($scope.progressModal) {
                        // wait 1/2 sec before closing to allow the progressbar
                        // to advance to 100% (see #59)
                        setTimeout(function () {
                            $scope.progressModal.close();
                        }, 500);
                    }
                    // search error ...
                } else if (type === 'error') {
                    $scope.data.searchStatus.current = 200;
                    $scope.data.message = 'Search could not be perfomed: ' + $scope.data.resultSet.$error;
                    $scope.data.messageType = 'danger';
                    $scope.data.searchStatus.message = $scope.data.message;

                    if ($scope.progressModal) {
                        setTimeout(function () {
                            $scope.progressModal.close();
                        }, 500);
                    }
                }
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.myProfileDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.sessionService',
        function ($scope, sessionService) {
            'use strict';

            $scope.user = sessionService.getCurrentUser();
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.myWorkspaceDirectiveController',
    [
        '$scope',
        '$state',
        '$timeout',
        'eu.water-switch-on.sip.services.sessionService',
        function ($scope, $state, $timeout, sessionService) {
            'use strict';

            $scope.user = sessionService.getCurrentUser();
            $scope.sessionService = sessionService;

            $scope.status = {};
            $scope.status.isopen = false;
            $scope.status.scheduleOpen = false;

            $scope.showProfile = function () {
                $state.go('profile', {});
            };

            $scope.popup = function (doPopup) {
                if (doPopup) {
                    $scope.status.scheduleOpen = true;
                    $timeout(function () {
                        if ($scope.status.scheduleOpen === true) {
                            $scope.status.isopen = true;
                        }
                        $scope.status.scheduleOpen = false;
                    }, 300);
                } else {
                    $scope.status.scheduleOpen = false;
                    $scope.status.isopen = false;
                }
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.objectDetailController',
    [
        '$scope',
        // the router resolves this resource object
        'resource',
        'AppConfig',
        function ($scope, resource, AppConfig) {
            'use strict';

            var i, tag;

            $scope.config = AppConfig.objectInfo;
            $scope.object = resource;
            $scope.reps = $scope.object.representation || [];
            $scope.keywordsXcuahsi = [];
            $scope.keywords = [];

            for (i = 0; i < $scope.reps.length; ++i) {
                $scope.reps[i]._status = { // jshint ignore:line
                    open: (i === 0 ? true : false)
                };
            }

            if ($scope.object.tags) {
                for (i = 0; i < $scope.object.tags.length; ++i) {
                    tag = $scope.object.tags[i];
                    if (tag.taggroup.name.indexOf('keyword') === 0) {
                        if (tag.taggroup.name.indexOf('X-CUAHSI') !== -1) {
                            $scope.keywordsXcuahsi.push(tag);
                        } else {
                            $scope.keywords.push(tag);
                        }
                    }
                }
            }
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.postSearchFilterDirectiveController',
    [
        '$scope',
        'FilterExpression',
        'AppConfig',
        'eu.water-switch-on.sip.services.filterService',
        function ($scope, FilterExpression, AppConfig, filterService) {
            'use strict';
            var tempFilterExpressions, tempFilterExpression, removePostFilterTagFunction,
                removePostSearchFiltersFilterTag, setPostSearchFilterTags, pattern,
                setPostSearchFilterTagValue, removeNegatedSearchFilterTag;

            $scope.config = AppConfig.postSearchFilter;
            pattern = AppConfig.filterExpressionPattern;

            // this is the USB filter expression that contains all post search filter expressions
            // that have been selected by the user.
            tempFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__POST_SEARCH_FILTERS);
            if (!tempFilterExpressions && tempFilterExpressions.length === 0) {
                console.warn('post search filters filter expression not correctly initialized!');
                $scope.filterExpressions.addFilterExpression($scope.postSearchFiltersFilterExpression);
            }

            // create default negated filter expressions that can be populated by post filter expressions
            // TODO: Move to a value Provider to allow per-application configuration of post search filters
            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__COLLECTION),
                [], true, true, null, 'Collection (Excluded)');
            $scope.filterExpressions.addFilterExpression(tempFilterExpression);

            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__ACCESS_CONDITION),
                [], true, true, null, 'Access Condition (Excluded)');
            $scope.filterExpressions.addFilterExpression(tempFilterExpression);

            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__FUNCTION),
                [], true, true, null, 'Access Function (Excluded)');
            $scope.filterExpressions.addFilterExpression(tempFilterExpression);

//            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__PROTOCOL),
//                [], true, true, null, 'Access Protocol (Excluded)');
//            $scope.filterExpressions.addFilterExpression(tempFilterExpression);
//
//            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__KEYWORD_XCUAHSI),
//                [], true, true, null, 'X-CUAHSI Keyword (Excluded)');
//            $scope.filterExpressions.addFilterExpression(tempFilterExpression);

            // those are the actual search-result-dependent post filter expressions 
            // that can be selected by the user. 
            // TODO: Move to a value Provider to allow per-application configuration of post search filters
            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__COLLECTION),
                [], true, true, null, 'Collections');
            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);
            
            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__ACCESS_CONDITION),
                [], true, true, null, 'Access Conditions');
            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);

            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__FUNCTION),
                [], true, true, null, 'Access Functions');
            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);
            
//            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__PROTOCOL),
//                [], true, true, null, 'Access Protocols');
//            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);
//
//            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__KEYWORD_XCUAHSI),
//                [], true, true, null, 'X-CUAHSI Keywords');
//            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);

//            tempFilterExpression = new FilterExpression(('!'+FilterExpression.FILTER__KEYWORD), 
//                [], true, true, null, 'Keywords');
//            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);

            /**
             * Creates the actual visual tags from an array of tag/cardinality
             * entries.
             * 
             * @param {type} filterTags
             * @returns {undefined}
             */
            setPostSearchFilterTags = function (filterTags) {
                $scope.postSearchFilterExpressions.clear();
                var i, filterExpression, filterExpressions, tagGroup, param, j;

                if (!filterTags || filterTags.length === 0) {
                    return;
                }

                for (i = 0; i < filterTags.length; ++i) {
                    tagGroup = filterTags[i];
                    if (tagGroup && tagGroup.value && tagGroup.value.length > 0) {
                        param = '!' + tagGroup.key;
                        filterExpressions = $scope.postSearchFilterExpressions.getFilterExpressionsByType(param);
                        if (!filterExpressions || filterExpressions.length === 0) {
                            filterExpression = new FilterExpression(param, null, true);
                            $scope.postSearchFilterExpressions.addFilterExpression(filterExpression);
                        } else {
                            filterExpression = filterExpressions[0];
                        }

                        // make a copy of the array in order to be able to restore the values!
                        filterExpression.value = [];
                        for (j = 0; j < tagGroup.value.length; ++j) {
                            filterExpression.value.push(tagGroup.value[j]);
                        }

                        if (!filterExpression.removeCallBack) {
                            filterExpression.removeCallBack = removePostFilterTagFunction;
                        }

                        // enumerate tags as post filter tags explicitely!
                        filterExpression.enumeratedTags = filterExpression.enumerateTags(true);
                    }
                }
            };

            /**
             * This is the remove callback function that is called after the *grouped
             * USB filter expression* that contains all post search filter expressions
             * that have been selected by the user is removed. (this makes only sense when
             * performImplicitSearch is false). The post search filter that is removed from
             * the USB is re-added to the list of visual post search filter tags!
             * 
             * @param {FilterExpression.Tag} postSearchFiltersFilterTag negated tag drom usb
             * @returns {undefined}
             */
            removePostSearchFiltersFilterTag = function (postSearchFiltersFilterTag) {
                if (postSearchFiltersFilterTag &&
                        postSearchFiltersFilterTag instanceof FilterExpression.prototype.CollectionTag) {
                    // the postSearchFiltersFilterExpression was removed from USB as a whole.
                    // rebuild the complete list of post search filter tags!
                    setPostSearchFilterTags($scope.filterTags);
                } else if (postSearchFiltersFilterTag) {
                    setPostSearchFilterTagValue(postSearchFiltersFilterTag.getValue());
                }
            };

            /**
             * Applied post search filters can either be grouped in USB or added as
             * distinct negated filter expression (configurable via the option 
             * config.groupPostSearchFilters option). This callback operation is 
             * used in  later case and re-adds a negated filter tag upon its removal from
             * USB to the list of post filter tags.
             * 
             * @param {FilterExpression.Tag} negatedFilterTag
             * @returns {undefined}
             */
            removeNegatedSearchFilterTag = function (negatedFilterTag) {
                var negatedFilterExpressions, negatedFilterExpression, i;
                if (negatedFilterTag &&
                        negatedFilterTag instanceof FilterExpression.prototype.CollectionTag) {
                    // array of negated filter expressions
                    negatedFilterExpressions = negatedFilterTag.getValue();
                    for (i = 0; i < negatedFilterExpressions.length; ++i) {
                        // why can't we just call negatedFilterTag.getFilterExpressionString()?
                        // because the removeNegatedSearchFilterTag callback function is called after removal of the
                        // tag value from the origin filter expression. Thus, the array of
                        // the origin filter expression is already empty. We have to reconstruct
                        // the negated expressions.
                        negatedFilterExpression = negatedFilterTag.origin.concatFilter(negatedFilterTag.origin.parameter, negatedFilterExpressions[i]);
                        setPostSearchFilterTagValue(negatedFilterExpression);
                    }
                } else if (negatedFilterTag) {
                    // same here. value already removed from origin, so we have to use the 
                    // copy of the (array) value in the tag.
                    setPostSearchFilterTagValue(negatedFilterTag.origin.concatFilter(negatedFilterTag.origin.parameter, negatedFilterTag.getValue()));
                }
            };

            // add the remove callback function to the grouped post filter tags
            if (!$scope.postSearchFiltersFilterExpression.removeCallBack) {
                $scope.postSearchFiltersFilterExpression.removeCallBack = removePostSearchFiltersFilterTag;
            }

            /**
             * Re-creates a previously removed PostSearchFilterTag from a
             * negated filter expression. This method is called when only one tag of 
             * the postSearchFiltersFilterExpression collection was removed from USB. 
             * If the whole postSearchFiltersFilterExpression is removed, the 
             * list of visual of post search filter tags can be safely 
             * rebuilt completely. (CollectionTag)
             * 
             * @param {String} negatedFilterExpression negated tag from USB
             * @returns {undefined}
             */
            setPostSearchFilterTagValue = function (negatedFilterExpression) {
                var filterExpressions, filterExpression, filterExpressionString,
                    param, i, j, value, tagGroup;

                // split negated filter expression, e.g. '!access-condition:no limitation'
                filterExpressionString = negatedFilterExpression.split(pattern);
                param = filterExpressionString[1];
                value = filterExpressionString[2];

                if (param && value) {
                    // the negated filter tag that was added to USB (and was removed now) 
                    // looses the information on cardinality. Therfore we have to 
                    // find the original value in the list of tags retrieved from the server
                    for (i = 0; i < $scope.filterTags.length; ++i) {
                        tagGroup = $scope.filterTags[i];
                        // find the type, e.g. '!access-condition'
                        if (tagGroup && tagGroup.value && tagGroup.value.length > 0 &&
                                param === ('!' + tagGroup.key)) {
                            // now we have to find the original value that contains besides 
                            // the name (e.g. 'no limitation') also the cardinality!
                            for (j = 0; j < tagGroup.value.length; ++j) {
                                if (tagGroup.value[j].key === value) {
                                    // we found the tag value (e.g. 'no limitation'),
                                    // now find the respective postSearchFilterExpression
                                    filterExpressions = $scope.postSearchFilterExpressions.getFilterExpressionsByType(param);
                                    if (filterExpressions && filterExpressions.length > 0) {
                                        filterExpression = filterExpressions[0];
                                        // set the value that invludes also the cardinality.
                                        if (filterExpression.setArrayValue(tagGroup.value[j])) {
                                            // manually update the visual tag list
                                            filterExpression.enumeratedTags = filterExpression.enumerateTags(true);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            /**
             * This is the function that is called when the user clicks on the
             * X icon of the post filtrer tag. In contrast to ordinary search filter tags which
             * are simply removed from their parent filter expression by calling 
             * the tag.remove() function, this callback function that is applied
             * to post search filter tags initiates a new search (if configured) wherby the removed
             * post search filter tag is excluded from the search result by adding it
             * as negated search parameter to the universal search string.
             * 
             * Wheter implict search is performed after removing the tag is configurable
             * via the config.performImplicitSearch parameter.
             * 
             * If a local complete result is available on the client (no paging needed),
             * the filters can be directly applied on the local result result. However,
             * this is not  performed directly in this method, but by watching the 
             * post search filters filter expression that is shown in USB. 
             * 
             * @param {FilterExpression.Tag} tag visual post filter tag
             * 
             */
            removePostFilterTagFunction = function (tag) {
                if (tag) {
                    var filterExpressions, filterExpression, filterExpressionString,
                        offsetFilterExpressions, offsetFilterExpression;

                    // insted of adding separate negated filter expressions to USB,
                    // create one grouped post filter expression
                    if ($scope.config.groupPostSearchFilters === true) {
                        filterExpressionString = tag.getFilterExpressionString();
                        $scope.postSearchFiltersFilterExpression.setArrayValue(filterExpressionString);
                    } else {
                        filterExpressions = $scope.filterExpressions.getFilterExpressionsByType(tag.getType());
                        if (!filterExpressions || filterExpressions.length === 0) {
                            filterExpression = new FilterExpression(tag.getType(), null, true);
                            $scope.filterExpressions.addFilterExpression(filterExpression);
                        } else {
                            filterExpression = filterExpressions[0];
                        }
                        filterExpression.setArrayValue(tag.getValue());

                        // add the respective callback function that re-adds the
                        // post filter upon its removel from USB
                        if (!filterExpression.removeCallBack) {
                            filterExpression.removeCallBack = removeNegatedSearchFilterTag;
                        }
                    }

                    // reset offset! Any change to the universal search string breaks the previous offset
                    offsetFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__OPTION_OFFSET);
                    if (offsetFilterExpressions && offsetFilterExpressions.length > 0) {
                        offsetFilterExpression = offsetFilterExpressions[0];
                        offsetFilterExpression.value = 0;
                    }

                    // manually update the tag list
                    tag.origin.enumeratedTags = tag.origin.enumerateTags(true);

                    // apply implict search only if it is enabled in config,
                    // and if the filters cannot be applied locally
                    if ($scope.config.performImplicitSearch === true &&
                            (filterService.isCompleteResult() === false ||
                            $scope.config.applyFilterLocally === false)) {
                        // angular wrapped function, which is actually a getter for the real function
                        $scope.performSearch()(0, false);
                    }
                }
            };

            /**
             * Watch the combined postSearchFiltersFilter that are shown in USB.
             * Apply the filters locally, if we got a complete search result on the client.
             */
            $scope.$watch('postSearchFiltersFilterExpression.value', function (o, n) {
                if ($scope.config.applyFilterLocally === true &&
                        filterService.isCompleteResult() === true && o !== n) {
                    filterService.filterResultSet($scope.postSearchFiltersFilterExpression);

                    // update the remove threshold of post filter tags to reflect
                    // the new size of the filtered result set.
                    $scope.removeThreshold = filterService.getLoadedResourcesNumber() - filterService.getFilteredResourcesNumber();

                    if ($scope.notificationFunction) {
                        if (filterService.getFilteredResourcesNumber() > 0) {
                            $scope.notificationFunction()(filterService.getFilteredResourcesNumber() + ' of ' +
                                        filterService.getLoadedResourcesNumber() +
                                        ' resources hidded by filter.', 'warning');
                        } else {
                            $scope.notificationFunction()('Showing ' + filterService.getLoadedResourcesNumber() +
                                    ' of ' + filterService.getTotalResourcesNumber() +
                                    ' resources', 'success');
                        }
                    }
                }
            }, true);

            /**
             * When the filterable tags are updated, rebuild the visualised 
             * post search filter tags.
             * 
             * Filterable tags are updated when a) a new search has been performed 
             * and the filterable tags that apply to the current search result are 
             * retrieved from the server, or, b) when a post search filter is applied
             * on the local complete search result.
             */
            $scope.$watch('filterTags', function (filterTags, o) {
                if (filterTags && filterTags !== o && filterTags.length > 0) {
                    setPostSearchFilterTags(filterTags);
                }
            });
        }
    ]
);

angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.searchFilterRibbonDirectiveController',
    [
        '$scope',
        'FilterExpression',
        'AppConfig',
        function ($scope, FilterExpression, AppConfig) {
            'use strict';

            var geoFilterExpressions, textFilterExpressions, topicFilterExpressions,
                limitFilterExpressions, offsetFilterExpressions;

            $scope.config = AppConfig.search;

            $scope.keywordsFilterExpression = new FilterExpression(FilterExpression.FILTER__KEYWORD,
                [], true, true, null, 'Keywords', 'Free Keywords');
            $scope.filterExpressions.addFilterExpression($scope.keywordsFilterExpression);

            $scope.keywordsCuashiFilterExpression = new FilterExpression(FilterExpression.FILTER__KEYWORD_XCUAHSI,
                    [], true, true, 'templates/filter-expression-editor-popup.html', 'X-CUAHSI Keyword', 'X-CUAHSI Keyword');
            $scope.filterExpressions.addFilterExpression($scope.keywordsCuashiFilterExpression);

            $scope.topicFilterExpression = new FilterExpression(FilterExpression.FILTER__TOPIC,
                null, false, true, null, 'INSPIRE Topic Categories', 'INSPIRE Topic Categories');
            $scope.filterExpressions.addFilterExpression($scope.topicFilterExpression);

            $scope.fromDateFilterExpression = new FilterExpression(FilterExpression.FILTER__DATE_START,
                null, false, true, null, 'Start Date', 'Start Date');
            $scope.filterExpressions.addFilterExpression($scope.fromDateFilterExpression);

            $scope.toDateFilterExpression = new FilterExpression(FilterExpression.FILTER__DATE_END,
                null, false, true, null, 'End Date', 'End Date');
            $scope.filterExpressions.addFilterExpression($scope.toDateFilterExpression);

            $scope.geoIntersectsFilterExpression = new FilterExpression(FilterExpression.FILTER__GEO_INTERSECTS,
                'false', false, true, null, 'Geo Intersection', 'Geo Intersection');
            $scope.filterExpressions.addFilterExpression($scope.geoIntersectsFilterExpression);

            $scope.geoBufferFilterExpression = new FilterExpression(FilterExpression.FILTER__GEO_BUFFER,
                null, false, true, 'templates/geo-buffer-editor-popup.html', 'Geo Buffer', 'Geo Buffer');
            $scope.filterExpressions.addFilterExpression($scope.geoBufferFilterExpression);

            limitFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__OPTION_LIMIT);
            if (limitFilterExpressions && limitFilterExpressions.length > 0) {
                $scope.limitFilterExpression = limitFilterExpressions[0];
            } else {
                // must be initialized in master controller
                throw 'limit filter expression not correctly initialized!';
            }

            offsetFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__OPTION_OFFSET);
            if (offsetFilterExpressions && offsetFilterExpressions.length > 0) {
                $scope.offsetFilterExpression = offsetFilterExpressions[0];
            } else {
                // must be initialized in master controller
                throw 'offset filter expression not correctly initialized!';
            }

            geoFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__GEO);
            if (geoFilterExpressions && geoFilterExpressions.length > 0) {
                $scope.geoFilterExpression = geoFilterExpressions[0];
            } else {
                // must be initialized in master controller
                throw 'geo filter expression not correctly initialized!';
            }

            textFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__TEXT);
            if (textFilterExpressions && textFilterExpressions.length > 0) {
                $scope.textFilterExpression = textFilterExpressions[0];
            } else {
                // must be initialized in master controller
                throw 'text filter expression not correctly initialized!';
            }

            topicFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__TOPIC);
            if (topicFilterExpressions && topicFilterExpressions.length > 0) {
                $scope.topicFilterExpression = topicFilterExpressions[0];
            } else {
                // must be initialized in master controller
                throw 'topic category filter expression not correctly initialized!';
            }

            $scope.geoIntersectsFilterExpression.getDisplayValue = function (value) {
                return value ? 'intersect' : 'enclose';
            };

            $scope.clear = function () {
                $scope.filterExpressions.clear();
            };
        }]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.searchFilterTagDirectiveController',
    [
        '$scope',
        'FilterExpression',
        function ($scope, FilterExpression) {
            'use strict';

            // create a copy of the editor value in order to be able
            // to undo the changes made in the editor.
            if ($scope.tag.isEditable()) {
                $scope.data = {};
                $scope.data.editorValue = $scope.tag.getValue();

                // apply the changes when the editor popup is closed.
                // this option has to be set in the respective editor template!
                // $scope.data.applyChangesOnClose = false;
            }

            // Styling of Search Filters.. into CSS but how?
            /**
             * Return the icon associated with a specific filter expression.
             * 
             * @param {type} type the type (parameter) of the filter expression
             * @returns {String}
             */
            $scope.getTagIcon = function (type) {
                var plainType;
                // negated filters!
                plainType = type.substr(type.indexOf('!') + 1);
                switch (plainType) {
                case FilterExpression.FILTER__KEYWORD:
                    return 'glyphicon glyphicon-tags';
                case FilterExpression.FILTER__KEYWORD_XCUAHSI:
                    return 'glyphicon glyphicon-copyright-mark';
                case FilterExpression.FILTER__TOPIC:
                    return 'glyphicon glyphicon-tag';
                case FilterExpression.FILTER__GEO:
                    return 'glyphicon glyphicon-globe';
                case FilterExpression.FILTER__DATE_START:
                    return 'glyphicon glyphicon-chevron-left';
                case FilterExpression.FILTER__DATE_END:
                    return 'glyphicon glyphicon-chevron-right';
                case FilterExpression.FILTER__TEXT:
                    return 'glyphicon glyphicon-pencil';
                case FilterExpression.FILTER__GEO_INTERSECTS:
                    return 'glyphicon glyphicon-log-out';
                case FilterExpression.FILTER__GEO_BUFFER:
                    return 'glyphicon glyphicon-record';
                case FilterExpression.FILTER__OPTION_LIMIT:
                    return 'glyphicon glyphicon-indent-right';
                case FilterExpression.FILTER__CATEGORY:
                    return 'glyphicon glyphicon-bookmark';
                case FilterExpression.FILTER__POST_SEARCH_FILTERS:
                    return 'glyphicon glyphicon-warning-sign';
                case FilterExpression.FILTER__ACCESS_CONDITION:
                    return 'glyphicon glyphicon-euro';
                case FilterExpression.FILTER__FUNCTION:
                    return 'glyphicon glyphicon-floppy-save';
                case FilterExpression.FILTER__COLLECTION:
                    return 'glyphicon glyphicon-bookmark';
                default:
                    return 'glyphicon glyphicon-flash';
                }
            };

            // get the Filter Icon
            // FIXME: function could be put into a service

            /**
             * Returns the style (label color) associated with a specific
             * filter expression indetified by the parameter (or tag type) of the
             * filter expression. Negated expressions are treated differently: 
             * If the tag of the expression is shown in the Universal Search Box,
             * the label color is always set to red (isHighlightNegated = true).
             * @param {type} type
             * @param {type} isForCloseIcon wheter the icon is the close icon [x] or not
             * @param {type} isHighlightNegated highlight negated tags
             * @returns {String}
             */
            $scope.getTagStyle = function (type, isForCloseIcon, isHighlightNegated) {
                var prefix, plainType;
                // close icon style
                prefix = (isForCloseIcon === true) ? 'switchon-close-icon-' : '';

                // negated filter is RED
                if (type.indexOf('!') === 0 && isHighlightNegated === true) {
                    return prefix + 'label-danger';
                }

                plainType = type.substr(type.indexOf('!') + 1);

                switch (plainType) {
                case FilterExpression.FILTER__KEYWORD:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__KEYWORD_XCUAHSI:
                    return prefix + 'label-info';
                case FilterExpression.FILTER__TOPIC:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__GEO:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__DATE_START:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__DATE_END:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__TEXT:
                    return prefix + 'label-info';
                case FilterExpression.FILTER__GEO_INTERSECTS:
                    return prefix + 'label-warning';
                case FilterExpression.FILTER__GEO_BUFFER:
                    return prefix + 'label-warning';
                case FilterExpression.FILTER__OPTION_LIMIT:
                    return prefix + 'label-warning';
                case FilterExpression.FILTER__CATEGORY:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__POST_SEARCH_FILTERS:
                    return prefix + 'label-danger';
                case FilterExpression.FILTER__ACCESS_CONDITION:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__FUNCTION:
                    return prefix + 'label-success';
                default:
                    return prefix + 'label-default';
                }
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.usbDirectiveController',
    [
        '$scope',
        'FilterExpression',
        'AppConfig',
        function ($scope, FilterExpression, AppConfig) {
            'use strict';

            var textFilterExpressions, oldTextValue, newTextValue;

            $scope.config = AppConfig.search;
            $scope.pattern = AppConfig.filterExpressionPattern;

            textFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__TEXT);
            if (!textFilterExpressions || textFilterExpressions.length === 0) {
                console.warn('text filter expression not correctly initialized');
                $scope.filterExpressions.addFilterExpression($scope.textFilterExpression);
            }

            oldTextValue = $scope.textFilterExpression.value;

            // Show info message when input box ist empty and no filters have been defined. 
            $scope.$watch('universalSearchBox.filterExpressionInput.$error.required', function (newValue, oldValue) {
                if (oldValue === false && newValue === true && $scope.filterExpressions.enumeratedTags.length < 1) {
                    $scope.notificationFunction({
                        message: 'Please define a Filter Expression or enter a query to search for resources in the SIP Meta-Data Repository',
                        type: 'info'
                    });
                }
            });

            // input is invalid according to regex pattern
            // Disabled: User is allowed to enter $whatever that is used for fulltext search! -> text:"$whatever"
//            $scope.$watch('universalSearchBox.filterExpressionInput.$invalid', function () {
//
//                if (!$scope.universalSearchBox.filterExpressionInput.$error.required &&
//                        $scope.universalSearchBox.filterExpressionInput.$invalid) {
//                    $scope.notificationFunction({
//                        message: 'This search filter expression is not valid. Please use expression:"parameter", e.g. keyword:"water quality".',
//                        type: 'warning'
//                    });
//                }
//            });

            $scope.$watch('filterExpressions.list', function () {
                newTextValue = $scope.textFilterExpression.value;

                if (!newTextValue || newTextValue === oldTextValue) {
                    //no user input in text box or text box cleared
                    //-> recreate tags
                    if ($scope.config.combineMultileFilterExpressions === true) {
                        // get combined tags including NOT filters!
                        $scope.filterExpressions.enumeratedTags = $scope.filterExpressions.getTags(false, false, false, true);
                    } else {
                        // enumerate tags including NOT filters!
                        $scope.filterExpressions.enumeratedTags = $scope.filterExpressions.enumerateTags(false, false, false, true);
                    }
                } else if (newTextValue && newTextValue.length > 0) {
                    // text entered in box. try to parse it as filter expression
                    /**
                     * @type FilterExpression
                     */
                    if (FilterExpression.FILTER_EXPRESSION_PATTERNS.test(newTextValue)) {

                        var filterExpression, i, filterExpressionString,
                            filterExpressions, parsedTextValue;

                        parsedTextValue = newTextValue;
                        filterExpressions = newTextValue.split(FilterExpression.FILTER_EXPRESSION_PATTERNS);
                        for (i = 0; i < filterExpressions.length; ++i) {
                            filterExpressionString = filterExpressions[i];
                            filterExpression = $scope.filterExpressions.fromUniversalSearchString(filterExpressionString);
                            if (filterExpression) {
                                parsedTextValue =  parsedTextValue.replace(filterExpressionString, '');
                                parsedTextValue = parsedTextValue.trim();

                                $scope.notificationFunction({
                                    message: 'Search filter "' + filterExpression.getName() + '" successfully applied',
                                    type: 'success'
                                });
                            }
                        }

                        if (parsedTextValue.length > 0) {
                            $scope.textFilterExpression.setStringValue(parsedTextValue);
                        } else {
                            $scope.textFilterExpression.clear();
                        }
                    }
                }
                oldTextValue = $scope.textFilterExpression.value;
            }, true); // FIXME comparing with angular.equals on filter expressions might be slow
        }
    ]
);

angular.module(
    'eu.water-switch-on.sip.directives',
    [
        'ngTable',
        'ui.bootstrap.tabs',
        'ui.bootstrap.typeahead',
        'mgcrea.ngStrap.tooltip'
    ]
);
angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'categories',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/categories-directive-template.html',
                scope: {
                    filterExpressions: '=',
                    collectionFilterExpression: '=',
                    topicFilterExpression: '=',
                    performSearch: '&searchFunction'
                },
                controller: 'eu.water-switch-on.sip.controllers.categoriesDirectiveController',
                controllerAs: 'categoriesDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.directives'
).directive('countriesFilter',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/countries-filter-directive.html',
                scope: {
                    filterExpression: '=',
                    countryGroup: '@'
                },
                controller: 'eu.water-switch-on.sip.controllers.countriesFilterDirectiveController'
            };
        }
    ]);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive('dateFilter',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/datefilter-directive.html',
                scope: {
                    fromDateFilterExpression: '=',
                    toDateFilterExpression: '='
                }
            };
        }
    ]);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive('keywordFilter',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/keyword-filter-directive.html',
                scope: {
                    filterExpression: '=',
                    keywordGroup: '@',
                    multiple: '@'
                },
                controller: 'eu.water-switch-on.sip.controllers.keywordFilterDirectiveController'
            };
        }
    ]);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'listView',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/list-view-directive.html',
                scope: {
                    filterExpressions: '=',
                    tableData: '=',
                    selectedObject: '='
                },
                controller: 'eu.water-switch-on.sip.controllers.listViewDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'mapView',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/map-view-directive.html',
                scope: {
                    searchGeomWkt: '=',
                    searchGeomTitle: '=',
                    centerSearchGeometry: '=',
                    preserveZoomOnCenter: '=',
                    preserveSearchArea: '=',
                    objects: '=',
                    object: '=',
                    centerObjects: '=',
                    selectedObject: '=',
                    toolbarShowing: '=',
                    toolbarWidth: '=',
                    navbarHeight: '='
                },
                controller: 'eu.water-switch-on.sip.controllers.mapViewDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'masterToolbar',
    [
        function () {
            'use strict';

            var controller, scope;

            scope = {
                resultSet: '=',
                selectedObject: '=',
                filterExpressions: '=',
                postSearchFilterExpressions: '=',
                postSearchFiltersFilterExpression: '=',
                filterTags: '=',
                performSearch: '&',
                notificationFunction: '&?'
            };

            controller = [
                '$scope',
                '$state',
                'eu.water-switch-on.sip.services.masterToolbarService',
                'AppConfig',
                function ($scope,
                        $state,
                        masterToolbarService,
                        AppConfig) {
                    var canShow, visibleComponents;

                    $scope.shouldShow = false;
                    $scope.masterToolbarService = masterToolbarService;
                    $scope.config = AppConfig;

                    visibleComponents = {};

                    this.toggleVisibility = function (componentName, isVisible) {
                        var prop, visible;
                        if (componentName) {
                            visibleComponents[componentName] = isVisible;

                            // check if at least one registered component is visible
                            visible = false;
                            for (prop in visibleComponents) {
                                if (visibleComponents.hasOwnProperty(prop)) {
                                    visible = visible || visibleComponents[prop];
                                }
                            }

                            $scope.shouldShow = visible;

                            // at least one registered component wants to display itself
                            if ($scope.shouldShow) {
                                canShow();
                            }
                        }
                    };

                    canShow = function () {
                        var masterToolbarCanShow;
                        masterToolbarService.setCanShow($scope.shouldShow &&
                                $scope.resultSet &&
                                $scope.resultSet.$collection &&
                                $scope.resultSet.$collection.length > 0 &&
                                (
                                    $state.current.name === 'list' ||
                                    $state.current.name === 'th' ||
                                    $state.current.name === 'map' ||
                                    $state.current.name === 'resourceDetails'
                                ));

                        masterToolbarCanShow = masterToolbarService.getCanShow();

                        // if the toolbar shall always be shown (configurable), 
                        // show it, if it is not already shown
                        if ($scope.config.masterToolbar.alwaysExpanded &&
                                masterToolbarCanShow &&
                                !masterToolbarService.isShowing()) {
                            masterToolbarService.toggleVisibility(true);
                        }

                        return masterToolbarCanShow;
                    };

                    $scope.$watchCollection('resultSet.$collection', function () {
                        canShow();
                    });

                    $scope.$on('$stateChangeSuccess', function () {
                        canShow();
                    });
                }
            ];

            return {
                restrict: 'E',
                templateUrl: 'templates/master-toolbar-template.html',
                controller: controller,
                scope: scope
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'myProfile',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/my-profile-directive.html',
                scope: {
                },
                controller: 'eu.water-switch-on.sip.controllers.myProfileDirectiveController'
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'myWorkspace',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/my-workspace-directive.html',
                scope: {
                    workspaceName: '@',
                    showMessage: '&'
                },
                controller: 'eu.water-switch-on.sip.controllers.myWorkspaceDirectiveController'
            };
        }
    ]
);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive('postsearchfilter',
    [
        '$state',
        function ($state) {
            'use strict';

            var link, scope;

            scope = {
                filterExpressions: '=',
                postSearchFilterExpressions: '=',
                postSearchFiltersFilterExpression: '=',
                filterTags: '=',
                performSearch: '&searchFunction',
                notificationFunction: '&?',
                removeThreshold: '='
            };

            link = function (scope, element, attr, toolbarCtrl) {
                var toggleVisibility;

                toggleVisibility = function (state) {
                    scope.isVisible = (state === 'list' || state === 'th');
                    toolbarCtrl.toggleVisibility('resultList', scope.isVisible);
                };

                scope.$on('$stateChangeSuccess', function (event, toState) {
                    toggleVisibility(toState.name);
                });

                toggleVisibility($state.current.name);
            };

            return {
                restrict: 'E',
                require: '^masterToolbar',
                templateUrl: 'templates/post-search-filter-directive.html',
                scope: scope,
                controller: 'eu.water-switch-on.sip.controllers.postSearchFilterDirectiveController',
                controllerAs: 'postSearchFilterDirectiveController',
                link: link
            };
        }
    ]);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'resultList',
    [
        '$state',
        function ($state) {
            'use strict';

            var link, scope;

            scope = {
                resultSet: '=',
                selectedObject: '='
            };

            link = function (scope, element, attr, toolbarCtrl) {
                var toggleVisibility;

                toggleVisibility = function (state) {
                    scope.isVisible = (state === 'map');
                    toolbarCtrl.toggleVisibility('resultList', scope.isVisible);
                };

                scope.$on('$stateChangeSuccess', function (event, toState) {
                    toggleVisibility(toState.name);
                });

                toggleVisibility($state.current.name);
            };

            return {
                restrict: 'E',
                require: '^masterToolbar',
                templateUrl: 'templates/resultlist-directive.html',
                scope: scope,
                link: link
            };
        }
    ]
);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive(
    'resultPager',
    [
        '$state',
        'FilterExpression',
        function ($state, FilterExpression) {
            'use strict';

            var link, scope;

            scope = {
                resultSet: '=',
                filterExpressions: '=',
                getPerformSearch: '&searchFunction'
            };

            link = function (scope, element, attr, toolbarCtrl) {
                var limit, limitFilterExpression, limitFilterExpressions, offset, toggleVisibility;

                toggleVisibility = function(state) {
                    scope.isVisible = (state === 'list' || state === 'th' || state === 'map');
                    toolbarCtrl.toggleVisibility('resultPager', scope.isVisible);
                };

                scope.$on('$stateChangeSuccess', function (event, toState) {
                    toggleVisibility(toState.name);
                });

                toggleVisibility($state.current.name);

                limitFilterExpressions = scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__OPTION_LIMIT);
                if (limitFilterExpressions && limitFilterExpressions.length > 0) {
                    limitFilterExpression = limitFilterExpressions[0];
                } else {
                    limitFilterExpression = new FilterExpression(FilterExpression.FILTER__OPTION_LIMIT,
                        10, true, false);
                    scope.filterExpressions.addFilterExpression(limitFilterExpression);
                }

                scope.hasPrevious = function () {
                    return (scope.resultSet && scope.resultSet.$offset > 0);
                };

                scope.previous = function () {
                    if (scope.resultSet.$resolved === true && scope.hasPrevious()) {
                        limit = scope.resultSet.$limit;
                        if (limit !== limitFilterExpression.value) {
                            // limit changed! offset invalid. need to start at 0!
                            offset = 0;
                        } else {
                            offset = scope.resultSet.$offset - limit;
                            offset = offset < (scope.resultSet.$total - limit) ? offset : scope.resultSet.$offset;
                            offset = offset >= 0 ? offset : 0;
                        }

                        // angular wrapped function, which is actually a getter for the real function
                        scope.getPerformSearch()(offset, false);
                    }
                };

                scope.hasNext = function () {
                    return (scope.resultSet &&
                                   scope.resultSet.$length < scope.resultSet.$total &&
                                   scope.resultSet.$offset <= (scope.resultSet.$total - scope.resultSet.$limit));
                };

                scope.next = function () {
                    if (scope.resultSet.$resolved === true && scope.hasNext() === true) {
                        limit = scope.resultSet.$limit;
                        if (limit !== limitFilterExpression.value) {
                            // limit changed! offset invalid. need to start at 0!
                            offset = 0;
                        } else {
                            offset = scope.resultSet.$offset + limit;
                            offset = offset < scope.resultSet.$total ? offset : scope.resultSet.$offset;
                        }
                        
                        // angular wrapped function, which is actually a getter for the real function
                        scope.getPerformSearch()(offset, false);
                    }
                };
            };

            return {
                restrict: 'E',
                require: '^masterToolbar',
                templateUrl: 'templates/result-pager-template.html',
                scope: scope,
                link: link
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.directives'
).directive('searchFilterRibbon',
    [
        function () {
            'use strict';
            return {
                restrict: 'E',
                templateUrl: 'templates/search-filter-ribbon-directive.html',
                scope: {
                    filterExpressions: '=',
                    performSearch: '&searchFunction',
                    notificationFunction: '&?'
                },
                controller: 'eu.water-switch-on.sip.controllers.searchFilterRibbonDirectiveController'
            };
        }
    ]);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive('searchFilterTag',
    [
        'FilterExpression',
        function (FilterExpression) {
            'use strict';
            return {
                restrict: 'EA',
                templateUrl: 'templates/search-filter-tag-directive-template.html',
                scope: {
                    tag: '=',
                    highlightNegated: '=?',
                    removeThreshold: '='
                },
                controller: 'eu.water-switch-on.sip.controllers.searchFilterTagDirectiveController',
                link: function (scope) {
                    if (scope.tag.isEditable() && !(scope.tag instanceof FilterExpression.prototype.CollectionTag)) {
                        // the value is saved or reset when the popup is closed
                        scope.$on('tooltip.hide', function () {
                            var phase;
                            //synchronise filter expression value with editor and displayed tag value
                            //if the tag is editable, the template shows data.editorValue instead of
                            //tag.origin.value in order to be able to update displayed tag value in USB 
                            //without th eneed to change the actual value of the filter expression
                            //console.log('synchronising ' + scope.tag.origin.value + ' to ' + scope.data.editorValue);
                            if (scope.tag.origin.value !== scope.data.editorValue) {
                                // check if changes shall be applied. otherwise reset.
                                if (scope.data.applyChangesOnClose) {
                                    scope.tag.origin.value = scope.data.editorValue;
                                } else {
                                    // reset
                                    scope.data.editorValue = scope.tag.origin.value;
                                }

                                //safely apply the new changes
                                phase = scope.$root.$$phase;
                                if (phase !== '$apply' && phase !== '$digest') {
                                    scope.$apply();
                                }
                            }
                        });
                    }
                }
            };
        }
    ]);

angular.module(
    'eu.water-switch-on.sip.directives'
).directive('searchOptions',
    [
        function () {
            'use strict';
            return {
                restrict: 'E',
                templateUrl: 'templates/search-options-directive.html',
                scope: {
                    geoIntersectsFilterExpression: '=',
                    geoBufferFilterExpression: '=',
                    limitFilterExpression: '='
                }
            };
        }
    ]);
angular.module(
    'eu.water-switch-on.sip.directives'
).directive('usb',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/usb-directive.html',
                scope: {
                    textFilterExpression: '=',
                    filterExpressions: '=',
                    performSearch: '&searchFunction',
                    notificationFunction: '&?'
                },
                controller: 'eu.water-switch-on.sip.controllers.usbDirectiveController'
            };
        }
    ]);

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
        appConfig.searchService.defautLimit = 10;
        appConfig.searchService.maxLimit = 50;
        //appConfig.searchService.host = 'http://localhost:8890';
        //appConfig.searchService.host = 'http://switchon.cismet.de/legacy-rest1';
        appConfig.searchService.host = 'http://tl-243.xtr.deltares.nl/switchon_server_rest';

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
        // Development Mode (e.g. enable untested features)
        appConfig.gui.dev = false;

        appConfig.tagFilter = {};
        //appConfig.tagFilter.tagGroups = 'access-condition, function, keyword-x-cuahsi, protocol';
        appConfig.tagFilter.tagGroups = 'access-condition, function, collection';

        appConfig.search = {};
        // clear any postSearchFilter before performing a new search with regular search filters
        appConfig.search.clearPostSearchFilters = true;
        // combines array-type filter expressions in one tag 
        appConfig.search.combineMultileFilterExpressions = true;
        // switch to list view after successfull search
        // set to false to keep map view with search area
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
        // expand the post search filter accordions by default
        appConfig.postSearchFilter.expandPostSearchFilters = true;

        appConfig.objectInfo = {};
        appConfig.objectInfo.resourceJsonUrl = 'http://' +
        appConfig.searchService.username + ':' +
        appConfig.searchService.password + '@' +
        appConfig.searchService.host.replace(/.*?:\/\//g, '');
        appConfig.objectInfo.resourceXmlUrl = 'http://tl-243.xtr.deltares.nl/csw?request=GetRecordById&service=CSW&version=2.0.2&namespace=xmlns%28csw=http://www.opengis.net/cat/csw/2.0.2%29&resultType=results&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/xml&ElementSetName=full&id=';

        appConfig.filterExpressionPattern = /(^!?[A-Za-z_\-]+):"([\s\S]+)"$/;

        appConfig.masterToolbar = {};
        // show or hide the "tools" toggle button in the master toolbar
        appConfig.masterToolbar.togglebutton = false;
        // expanded by default. 
        // if togglebutton is not visible and toolbar is expanded, it cannot be hidden
        appConfig.masterToolbar.alwaysExpanded = true;

        return appConfig;
    }]);
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
).factory('FilterExpression',
    [function () {
        'use strict';

        /**
         * @constructor
         * @param {string} parameter  mandatory
         * @param {object} defaultValue  default: undefined
         * @param {boolean} multiple  default: false
         * @param {boolean} visible  default: true
         * @param {string} editor  default: null
         * @param {string} name  default: null
         * @param {string} description default: null
         * @returns {FilterExpression}
         */
        function FilterExpression(parameter, defaultValue, multiple, visible, editor, name, description) {
            if (parameter === undefined || parameter === null) {
                throw 'The parameter property of a FilterExpression cannot be null!';
            }
            this.parameter = parameter;
            this.defaultValue = (defaultValue === undefined) ? null : defaultValue;
            this.multiple = (multiple === true) ? true : false;

            // if this multiple, create an empty array
            // if default value is an object it has to be cloned!
            this.value = (defaultValue === undefined) ? (this.multiple ? [] : null) :
                    ((this.defaultValue !== null && typeof this.defaultValue === 'object') ?
                            JSON.parse(JSON.stringify(this.defaultValue)) : this.defaultValue);
            this.name = (name === undefined) ? null : name;

            if (!this.name && this.multiple) {
                throw 'For the array-type filter expression "' + parameter + '", the name parameter is mandatory!';
            }

            this.notFilter = (this.parameter.indexOf('!') === 0) ? true : false;
            // visible defaults to true!
            this.visible = (visible === undefined) ? true : visible;
            // set a default editor for array-type filter expression only if no editor is provided.
            this.editor = editor || (this.multiple === true ? 'templates/filter-expression-editor-popup.html' : null);
            this.description = (description === undefined) ? null : description;
            this.enumeratedTags = [];
        }

        // Define the common methods using the prototype
        // and standard prototypal inheritance.  

        /**
         * Returns a display value for a value for this type of filter expression.
         * Commonly, the display value is used as name of the tag of this filter expression.
         * Tags are shown in the Univeral Search Box or the Post Search Filter Box.
         * E.g. getDisplayValue for a GEO Filter Expression whose value is a 
         * WKT String may return the type  of the WKT String,(MULTIPOINT, POLYGON, etc.). 
         * 
         * By default, this method returns value parameter (if not null od undefined) 
         * or a predefined (fixed) display value (if available) or as last fallback 
         * the value of the filter expression (which might be an array!). 
         * Therefore this method has to be overwritten by filter expressions that 
         * need to compute a display value from the actual value
         * (e.g. the GEO Filter Expression) or from an array value.
         * 
         * A collection tag, that is a tag that represents a whole array-type filter expression,
         * sets the pratemrter value to null. Therfore, the property name is mandatory
         * for such a filter expression.
         * 
         * @param {object} value
         * @returns {string} the computed display value
         */
        FilterExpression.prototype.getDisplayValue = function (value) {
            return value || (this.getName() || this.value);
        };

        FilterExpression.prototype.getName = function () {
            return this.name || this.parameter;
        };

        FilterExpression.prototype.isValid = function () {
            if (this.multiple === true) {
                return (this.value && this.value.constructor === Array && this.value.length > 0);
            }

            return this.value ? true : false;
        };

        FilterExpression.prototype.isVisible = function () {
            return (this.visible === true) ? true : false;
        };

        FilterExpression.prototype.isNotFilter = function () {
            return (this.notFilter === true) ? true : false;
        };

        /**
         * This is a helper method that implements special treatment for post 
         * search filters expressions. For non post search filters expressions 
         * it returns a filter expression string formatted as parameter:value, 
         * for post search filters expressions is just return the ()array value 
         * of the post search filters expression that is itself a (negated)
         * filter expression (e.g. !keyword:"water")!
         * 
         * @param {type} parameter
         * @param {type} value
         * @returns {String}
         */
        FilterExpression.prototype.concatFilter = function (parameter, value) {
            // post search filters are an array of negated filter expressions
            // e.g. !keyword:"water".
            // therefore it is not necessary to prefix them with param!
            if (parameter === FilterExpression.FILTER__POST_SEARCH_FILTERS) {
                return value;
            }
            var concatExpression = (parameter + ':' + '"' + value + '"');
            return concatExpression;
        };

        /**
         * Returns a filter expression string that can be used with universal search.
         * If the value of the filter expression is an array, the filter expression
         * string will contain multiple parameter:array-value expressions.
         * 
         * @returns {String} universal search string
         */
        FilterExpression.prototype.getFilterExpressionString = function () {
            var filterExpressionString, arrayLength, i;

            if (this.isValid()) {
                if (this.isMultiple()) {
                    arrayLength = this.value.length;
                    for (i = 0; i < arrayLength; i++) {
                        if (i === 0) {
                            filterExpressionString = this.concatFilter(this.parameter, this.getArrayValue(i));
                        } else {
                            filterExpressionString += ' ';
                            filterExpressionString += this.concatFilter(this.parameter, this.getArrayValue(i));
                        }
                    }
                } else {
                    filterExpressionString = this.concatFilter(this.parameter, this.value);
                }
            }
            return filterExpressionString;
        };

        /**
         * Adds a new entry to an array if the value of this filter expression 
         * is an array. If the value already exists, it is not added.
         * 
         * @param {type} arrayValue
         * @returns {Boolean}
         */
        FilterExpression.prototype.setArrayValue = function (arrayValue) {
            if (this.isMultiple()) {
                if (!this.value) {
                    this.value = [];
                }

                if (this.value.indexOf(arrayValue) === -1) {
                    this.value.push(arrayValue);
                    return true;
                }
            }

            return false;
        };

        /**
         * Returns the entry at the specified index if the value of this
         * filter expression is an array. Array values of filter expressions
         * should be strings! This method can be overwitten in case the array value
         * of the expression is an object.
         * 
         * @param {int} index
         * @returns {string}
         */
        FilterExpression.prototype.getArrayValue = function (index) {
            if (this.isMultiple()) {
                if (!this.value || index >= this.value.length) {
                    return null;
                }

                return this.value[index];
            }

            return this.value;
        };

        /**
         * Determines wheter the value of this filter expression is an array
         * 
         * @returns {Boolean}
         */
        FilterExpression.prototype.isMultiple = function () {
            return this.multiple === true;
        };

        /**
         * Resets the value of this filter expression to a default value (or null);
         * 
         * @returns {undefined}
         */
        FilterExpression.prototype.clear = function () {
            if (this.defaultValue !== null && typeof this.defaultValue === 'object') {
                this.value = JSON.parse(JSON.stringify(this.defaultValue));
            } else {
                this.value = this.defaultValue;
            }

            this.enumeratedTags = [];
        };

        /**
         * Enumerates the tags of this filter expression. Returns an array > 1 
         * if the filter expression value is an array, otherwise behaves exactly as getTag().
         * If postFilterTags is true, instances of PostFilterTag are created.  
         * 
         * Attention, this method does not check tags for validity!
         * 
         * @param {boolean} postFilterTags
         * @returns {Array} Array of tags
         */

        FilterExpression.prototype.enumerateTags = function (postFilterTags) {
            var tags, i, arrayLength, tag;
            tags = [];

            // create a new tag for each item in the array
            if (this.isMultiple()) {
                arrayLength = this.value.length;
                for (i = 0; i < arrayLength; i++) {
                    if (postFilterTags === true) {
                        tag = new this.PostFilterTag(this, this.getArrayValue(i));
                    } else {
                        tag = new this.Tag(this, this.getArrayValue(i));
                    }

                    tags.push(tag);
                }
            } else {
                if (postFilterTags === true) {
                    throw 'error enumerating post filter tags for filter expression "' + this.parameter +
                        '", Post Filter Tags can only be enumerated for array-type filter expressions!';
                }

                tag = new this.Tag(this, this.value);
                tags.push(tag);
            }

            return tags;
        };

        /**
         * Returns excactly one tag that represents this filter expression whether  
         * it is an array-type (isMultiple = true) filter expression or not. 
         * 
         * Attention, this method does not check tags for validity!
         * 
         * @returns {FilterExpression.Tag}
         */
        FilterExpression.prototype.getTag = function () {
            var tag;

            // return collection tags if there is more than 1 value in the collection!
            if (this.isMultiple()) {
                if (this.value && this.value.length === 1) {
                    tag = new this.Tag(this, this.value[0]);
                } else {
                    tag = new this.CollectionTag(this, this.value);
                }
            } else {
                tag = new this.Tag(this, this.value);
            }

            return tag;
        };

        /**
         * Sets the value of a filter expression from a string. This method
         * is commonly called when a universal search string is parsed
         * in the universal search box. It has to be overriden by individual 
         * filter expression to perorma additional parsing of value string,
         * e.g. converting to numbers.
         * 
         * 
         * @param {string} newValue
         * @returns {undefined}
         */
        FilterExpression.prototype.setStringValue = function (newValue) {
            if (this.isMultiple()) {
                this.setArrayValue(newValue);
            } else {
                this.value = newValue;
            }
        };

        /**
         * Returns th ename of the filter expression.
         * 
         * @returns {String} name
         */
        FilterExpression.prototype.getName = function () {
            return this.name || this.parameter;
        };

        /**
         * Tag base class for visualising filter expressions as tags.
         * 
         * The value of array-type tags cannot be determined by the
         * index of the tag in the filter expression value array, since the tag's remove
         * function can change the array length and thus the index. Therefore,
         * the values have to be provided when the tag is constructed!
         * 
         * @constructor
         * @param {FilterExpression} filterExpression
         * @param {object} value
         * @returns {FilterExpression.Tag}
         */
        FilterExpression.prototype.Tag = function (filterExpression, value) {
            if (filterExpression === undefined || filterExpression === null) {
                console.error('The filterExpression property of a FilterTag cannot be null!');
                throw 'The filterExpression property of a FilterTag cannot be null!';
            }

            /**
             * The origin filter expression of this tag.
             * @type FilterExpression
             */
            this.origin = filterExpression;

            /**
             * The value is needed in case the Tag is created from an array
             */
            this.value = value;
        };

        FilterExpression.prototype.Tag.constructor = FilterExpression.prototype.Tag;

        /**
         * Returns the title of the tag, commonly for showing tooltips.
         * 
         * @returns {string} title of the tag
         */
        FilterExpression.prototype.Tag.prototype.getTitle = function () {
            return this.origin.getName();
        };

        /**
         * Return the type of the tag and its origin filter expression, respectively.
         * 
         * @returns {string} type of the tag
         */
        FilterExpression.prototype.Tag.prototype.getType = function () {
            return this.origin.parameter;
        };

        /**
         * If a Filter Expression is editable, a custom editor (property: editor) 
         * is shown when the user clicks on the Tag of the Filter Expression. 
         * Array-type filter expression are only editable as a whole, therefore
         * this method returns false by default.
         * 
         * @returns {Boolean} editable ot not
         */
        FilterExpression.prototype.Tag.prototype.isEditable = function () {
            return this.origin.isMultiple() ? false : (this.origin.editor ? true : false);
        };

        /**
         * Returns the editor template url for editing this tag.
         * 
         * @returns {string} editor template
         */
        FilterExpression.prototype.Tag.prototype.getEditor = function () {
            return this.origin.editor;
        };

        /**
         * Determines wheter this tag  is removeable or not. This is mainly
         * relevant for post search filter expressions where for example
         * negated filter expressions that don't yield any result shall not be removeable.
         * Likewise, this method is overwritten by post search filter tags.
         * 
         * @returns {boolean} removeable or not (default: true)
         */
        FilterExpression.prototype.Tag.prototype.isRemoveable = function () {
            return true;
        };

        /**
         * Returns the value associated with this tag. 
         * If the origin filter expression is multiple, the value is an array element
         * of the filter expression's value. However, if the tag is a collection tag,
         * the value is the origin filter expression's original  value 
         * (thus, it might be an array).
         * 
         * @returns {object} value associated with the tag
         */
        FilterExpression.prototype.Tag.prototype.getValue = function () {
            return this.value;
        };

        /**
         * If the tag is a collection tag (it represents the whole filter expression
         * whose value is an array), the displayed tag name shall be determined by 
         * the name property of the filter expression (default implementation
         * of getDisplayValue). Otherwise, the tag name is determined on basis of
         * the (array)value of the filter expression, e.g. by a custom implementation
         * of the getDisplayValue operation.
         * 
         * This operation is delegated to the origon filter expressions  getDisplayValue
         * operation in order to support a per-filter-expression type methods for
         * generate display values.
         * 
         * The optional value parameter can be used to display a value that is different 
         * from the actual value stored in the tag and the filter expression, respectively.
         * This is mainly useful for editors that do not want to change actual value 
         * before the user confirms the change.
         * 
         * @param {string} value that is displayed
         * @returns {string}
         */
        FilterExpression.prototype.Tag.prototype.getDisplayValue = function (value) {
            return (value ? this.origin.getDisplayValue(value) : this.origin.getDisplayValue(this.getValue()));
        };

        /**
         * Determines the cardinality of a specific tag. This method is used
         * to display the number of tags of a collection tag or the number of
         * objects associated with a post search filter tag. In the later cases, 
         * this operation has to be overwritten. Returns 0 by default. 
         * 
         * @returns {int} cardinality of the tag
         */
        FilterExpression.prototype.Tag.prototype.getCardinality = function () {
            return 0;
        };


        /**
         * Removes the value represented by this tag from the filter expression.
         * If the value of the filter expression is an array, the entry represented
         * by this tag is removed from the array unless this tag is explicitely
         * marked as collection tag that represents the entire filter expression.
         * 
         * @returns {undefined}
         */
        FilterExpression.prototype.Tag.prototype.remove = function () {
            if (this.origin.isMultiple()) {
                var index;
                index = this.origin.value.indexOf(this.value);
                if (index !== -1) {
                    this.origin.value.splice(index, 1);
                }
            } else {
                this.origin.value = null;
            }

            // invoke the callback function
            if (this.origin.removeCallBack) {
                this.origin.removeCallBack(this);
            }
        };

        /**
         * Returns the filter expression string of a single array value or 
         * the entire filter expression if the filter expression is either not
         * an array type or this tag represents the collection tag of the 
         * filter expression.
         * 
         * @returns expression for universal search
         */
        FilterExpression.prototype.Tag.prototype.getFilterExpressionString = function () {
            if (this.origin.isMultiple()) {
                return this.getType() + ':"' + this.getValue() + '"';
            }

            return this.origin.getFilterExpressionString();
        };


        /**
         * Collection Tag for visualising (array-tipe) filter expressions as 
         * one single tag.
         * 
         * Determines wheter this tag is the representative of the value of the filter
         * expression or just a single entry in an array value. In this case, value must be an array.
         * 
         * @constructor
         * @param {FilterExpression} filterExpression
         * @param {object} value
         * @returns {FilterExpression.CollectionTag}
         */
        FilterExpression.prototype.CollectionTag = function (filterExpression, value) {
            FilterExpression.prototype.Tag.call(this, filterExpression, value);
        };

        FilterExpression.prototype.CollectionTag.prototype = Object.create(FilterExpression.prototype.Tag.prototype);
        FilterExpression.prototype.CollectionTag.constructor = FilterExpression.prototype.CollectionTag;


        /**
         * Return the display value of a collection tag which 
         * is always the name (title) of the filter expression!
         * 
         * @returns {string} name of the filter expression (display value)
         */
        FilterExpression.prototype.CollectionTag.prototype.getDisplayValue = function () {
            return this.getTitle();
        };

        /**
         * If a Filter Expression is editable, a custom editor (property: editor) 
         * is shown when the user clicks on the Tag of the Filter Expression. 
         * 
         * @returns {Boolean} editable ot not
         */
        FilterExpression.prototype.CollectionTag.prototype.isEditable = function () {
            return this.origin.editor ? true : false;
        };

        /**
         * Determines the cardinality of a a collection tag. That is the number of 
         * of arry values (or tags) of the origin filter expression. 
         * 
         * @returns {int} cardinality of the collection tag
         */
        FilterExpression.prototype.CollectionTag.prototype.getCardinality = function () {
            return (this.origin.value && this.origin.isMultiple()) ? this.origin.value.length : 0;
        };

        /**
         * Removes the value represented by this tag from the filter expression.
         * Since a collection tag represents the whole array of an array-type filter 
         * expression, this method removes the filter expression value as a whole,
         * not just a single array element.
         * 
         * @returns {undefined}
         */
        FilterExpression.prototype.CollectionTag.prototype.remove = function () {
            // this empties the origin array, but the local copy (CollectionTag.value)
            // is still available for postprocessing in the callback function!
            this.origin.value = null;

            // invoke the callback function
            if (this.origin.removeCallBack) {
                this.origin.removeCallBack(this);
            }
        };

        /**
         * Returns the filter expression string of collection tag which is
         * eqaul to the filter expression of the origin filter expression
         * 
         * @returns expression for universal search
         */
        FilterExpression.prototype.CollectionTag.prototype.getFilterExpressionString = function () {
            return this.origin.getFilterExpressionString();
        };

        /**
         * Creates an new instace of a post filter tag. 
         * 
         * @constructor
         * @param {type} filterExpression
         * @param {type} value
         * @returns {FilterExpression.PostFilterTag}
         */
        FilterExpression.prototype.PostFilterTag = function (filterExpression, value) {
            if (!value && !value.hasOwnProperty('key') && !value.hasOwnProperty('value')) {
                throw 'The value of the PostFilterTag for the filter expression "' + filterExpression + '" is not valid! {key:..., value:...} object expected!';
            }

            FilterExpression.prototype.Tag.call(this, filterExpression, value);
            this.cardinality = (value && value.hasOwnProperty('value')) ? parseInt(value.value, 10) : 0;
            this.cardinality = isNaN(this.cardinality) ? 0 : this.cardinality;
        };

        FilterExpression.prototype.PostFilterTag.prototype = Object.create(FilterExpression.prototype.Tag.prototype);
        FilterExpression.prototype.PostFilterTag.constructor = FilterExpression.prototype.PostFilterTag;

        /**
         * Determines wheter is post filter tag is removeable or not. A post filter tag 
         * is not removeable if it's removal would lead  to an empty search result. This
         * is the case if the tag is the last tag in the current category (origin filter expressions
         * value array) or if there is only one resource associated with the current tag (cardinality = 1).
         * 
         * @param {Number} threshold
         * @returns {boolean} true if removeable
         */
        FilterExpression.prototype.PostFilterTag.prototype.isRemoveable = function (threshold) {
            return (this.origin.value.length > 1 && this.getCardinality() > 0 &&
                (threshold ? this.getCardinality() < threshold : true));
        };

        /**
         * Returns the cardinality of a post filter tag. The cardinality is stored in
         * the tag's value object in the value property.
         * @returns {Number} cardinality of the tag (number of resources assocated with the tag)
         */
        FilterExpression.prototype.PostFilterTag.prototype.getCardinality = function () {
            return this.cardinality;
        };

        /**
         * Returs the value of the post filter tag which is the key of the 
         * value/cardinality object.
         * 
         * @returns {String}
         */
        FilterExpression.prototype.PostFilterTag.prototype.getValue = function () {
            return this.value.key;
        };

        // define constants

        FilterExpression.FILTER_EXPRESSION_PATTERNS = /(!?[A-Za-z_\-]+?:"[\s\S]+?["]{1})+/g;
        FilterExpression.FILTER_EXPRESSION_PATTERN = /(^!?[A-Za-z_\-]+):"([\s\S]+)"$/;

        FilterExpression.FILTER__GEO = 'geo';
        FilterExpression.FILTER__GEO_INTERSECTS = 'geo-intersects';
        FilterExpression.FILTER__GEO_BUFFER = 'geo-buffer';
        FilterExpression.FILTER__KEYWORD = 'keyword';
        FilterExpression.FILTER__KEYWORD_XCUAHSI = 'keyword-x-cuahsi';
        FilterExpression.FILTER__TOPIC = 'topic';
        FilterExpression.FILTER__COLLECTION = 'collection';
        FilterExpression.FILTER__DATE_START = 'fromDate';
        FilterExpression.FILTER__DATE_END = 'toDate';
        FilterExpression.FILTER__OPTION_LIMIT = 'limit';
        FilterExpression.FILTER__OPTION_OFFSET = 'offset';
        FilterExpression.FILTER__TEXT = 'text';
        FilterExpression.FILTER__POST_SEARCH_FILTERS = 'POST_SEARCH_FILTERS';
        FilterExpression.FILTER__ACCESS_CONDITION = 'access-condition';
        FilterExpression.FILTER__FUNCTION = 'function';
        FilterExpression.FILTER__PROTOCOL = 'protocol';
        FilterExpression.FILTER__RESOURE_TYPE = 'resource-type';

        FilterExpression.FILTERS = [
            FilterExpression.FILTER__GEO,
            FilterExpression.FILTER__GEO_INTERSECTS,
            FilterExpression.FILTER__GEO_BUFFER,
            FilterExpression.FILTER__KEYWORD,
            FilterExpression.FILTER__KEYWORD_XCUAHSI,
            FilterExpression.FILTER__TOPIC,
            FilterExpression.FILTER__COLLECTION,
            FilterExpression.FILTER__DATE_START,
            FilterExpression.FILTER__DATE_END,
            FilterExpression.FILTER__OPTION_LIMIT,
            FilterExpression.FILTER__OPTION_LIMIT,
            FilterExpression.FILTER__OPTION_OFFSET,
            FilterExpression.FILTER__TEXT,
            FilterExpression.FILTER__POST_SEARCH_FILTERS,
            FilterExpression.FILTER__ACCESS_CONDITION,
            FilterExpression.FILTER__FUNCTION,
            FilterExpression.FILTER__PROTOCOL,
            FilterExpression.FILTER__RESOURE_TYPE
        ];

        Object.defineProperties(FilterExpression.prototype, {
            'valid': {
                'get': function () {
                    return this.isValid();
                }
            }
        });

        FilterExpression.prototype.constructor = FilterExpression;
        return FilterExpression;
    }]);


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
    'eu.water-switch-on.sip.services'
).factory('FilterExpressions',
    ['FilterExpression',
        function (FilterExpression) {
            'use strict';

            function FilterExpressions() {
                this.list = [];
                this.enumeratedTags = [];
            }

            Object.defineProperties(FilterExpressions.prototype, {
                'universalSearchString': {
                    'get': function () {
                        var keys, arrayLength, uss, i, theFilterExpression;
                        keys = Object.keys(this.list);
                        arrayLength = keys.length;
                        uss = '';
                        for (i = 0; i < arrayLength; i++) {
                            theFilterExpression = this.list[keys[i]];
                            if (theFilterExpression instanceof FilterExpression && theFilterExpression.isValid()) {
                                if (uss.length === 0) {
                                    uss = theFilterExpression.getFilterExpressionString();
                                } else {
                                    uss += (' ' + theFilterExpression.getFilterExpressionString());
                                }
                            }
                        }
                        return uss;
                    },
                    'set': function (param) {
                        console.warn('Attempt to set value of universalSearchString to ' + param + ' is not supported by FilterExpression Class');
                    }
                }
            });

            FilterExpressions.prototype.clear = function () {
                var keys, arrayLength, i, theFilterExpression;
                keys = Object.keys(this.list);
                arrayLength = keys.length;
                for (i = 0; i < arrayLength; i++) {
                    theFilterExpression = this.list[keys[i]];
                    if (theFilterExpression instanceof FilterExpression) {
                        theFilterExpression.clear();
                    }
                }
                this.enumeratedTags = [];
            };

            FilterExpressions.prototype.addFilterExpression = function (filterExpression) {
                if (filterExpression instanceof FilterExpression) {
                    this.list.push(filterExpression);
                    return true;
                }
                return false;
            };

            FilterExpressions.prototype.removeFilterExpression = function (filterExpression) {
                var removed, i;
                removed = false;
                for (i = this.list.length - 1; i >= 0; i--) {
                    if (this.list[i] === filterExpression) {
                        this.list.splice(i, 1);
                        removed = true;
                    }
                }
                return removed;
            };

            FilterExpressions.prototype.getFilterExpressionsByType = function (type, partialMatch) {
                var i, arrayLength, filterExpressionList;
                filterExpressionList = [];
                arrayLength = this.list.length;
                for (i = 0; i < arrayLength; i++) {
                    if (partialMatch && this.list[i].parameter.indexOf(type) !== -1) {
                        filterExpressionList.push(this.list[i]);
                    } else if (this.list[i].parameter === type) {
                        filterExpressionList.push(this.list[i]);
                    }
                }
                return filterExpressionList;
            };

            /**
             * Enumerates all tags of all filter expressions, thus creating 
             * single tags for each array entry of arrray type filöter expressions.
             * 
             * @param {type} includeInvisible
             * @param {type} includeInvalid
             * @param {type} includeDefaultValue
             * @param {type} includeNotFilter
             * @returns {Array}
             */
            FilterExpressions.prototype.enumerateTags = function (includeInvisible,
                includeInvalid, includeDefaultValue, includeNotFilter) {
                //console.debug("enumerating all tags");
                var arrayLength, i, theFilterExpression, returnTags, theTags;
                returnTags = [];
                arrayLength = this.list.length;
                for (i = 0; i < arrayLength; i++) {
                    theFilterExpression = this.list[i];

                    if ((theFilterExpression.isVisible() || includeInvisible) &&
                            (theFilterExpression.isValid() || includeInvalid) &&
                            ((theFilterExpression.value !== theFilterExpression.defaultValue) || includeDefaultValue) &&
                            (!theFilterExpression.isNotFilter() || includeNotFilter)) {

                        theTags = theFilterExpression.enumerateTags();
                        if (theTags.length > 0) {
                            returnTags = returnTags.concat(theTags);
                        }
                    }
                }
                return returnTags;
            };

            /**
             * In contrast to the enumerateTags method, this method returns excatly one
             * tag for each filter expression, thus ignoring array itmes of a array-type
             * filter expression.
             * 
             * @param {type} includeInvisible
             * @param {type} includeInvalid
             * @param {type} includeDefaultValue
             * @param {type} includeNotFilter
             * @returns {undefined}
             */
            FilterExpressions.prototype.getTags = function (includeInvisible,
                includeInvalid, includeDefaultValue, includeNotFilter) {
                var arrayLength, i, theFilterExpression, returnTags, theTag;
                returnTags = [];
                arrayLength = this.list.length;
                for (i = 0; i < arrayLength; i++) {
                    theFilterExpression = this.list[i];

                    if ((theFilterExpression.isVisible() || includeInvisible) &&
                            (theFilterExpression.isValid() || includeInvalid) &&
                            ((theFilterExpression.value !== theFilterExpression.defaultValue) || includeDefaultValue) &&
                            (!theFilterExpression.isNotFilter() || includeNotFilter)) {

                        theTag = theFilterExpression.getTag();
                        if (theTag) {
                            returnTags.push(theTag);
                        }
                    }
                }
                return returnTags;
            };

            FilterExpressions.prototype.fromUniversalSearchString = function (uss) {
                var filterExpressionString, param, value, filterExpression, filterExpressions;

                if (uss && uss.length > 0) {

                    filterExpressionString = uss.split(FilterExpression.FILTER_EXPRESSION_PATTERN);

                    /** @type {string} */
                    param = filterExpressionString[1];
                    value = filterExpressionString[2];
                    // user entered a valid filter expression
                    if (param && value) {
                        param = param.toLowerCase();

                        filterExpressions = this.getFilterExpressionsByType(param);
                        if (!filterExpressions || filterExpressions.length < 1) {
                            filterExpression = new FilterExpression(param);
                            filterExpression.value = value;
                            filterExpression.displayValue = value;
                            console.warn('The search filter "' + param + '" is unknown. The search may deliver unexpected results.');
                            this.addFilterExpression(filterExpression);
                        } else {
                            filterExpression = filterExpressions[0];
                            filterExpression.setStringValue(value);
                        }
                    }
                }

                return filterExpression;
            };

            return FilterExpressions;
        }]
    );


angular.module(
    'eu.water-switch-on.sip.factories',
    [
    ]
);
angular.module(
    'eu.water-switch-on.sip.filters',
    [
    ]
);

angular.module(
    'eu.water-switch-on.sip.filters'
).filter(
    'txtLen',
    function () {
        'use strict';

        var escapePattern, getRegex;

        escapePattern = /[-\/\\^$*+?.()|[\]{}]/g;

        getRegex = function (s, f) {
            return new RegExp('[' + s.replace(escapePattern, '\\$&') + ']', f);
        };

        /* filter to cut of text if it is longer than the given length. if the input or the txtlen are null or undefined
         * the filter will return 'null'. the filter has the following parameters
         * 
         * - input: string, the text input, if it is not a string the behaviour may not be as expected
         * - txtLen: integer, the length of the resulting string, including 'tpl'
         * - exact: boolean (default=false), if the result string should exactly match 'txtLen' or if it should try to 
         *   cut of the text after a white space character. In any case the resulting string will not exceed 'txtLen'.
         * - tpl: string (default='[...]', the string to use as indicator that the text has been cut off. If the text 
         *   is actually shorter than txtLen it will not be appended.
         * - sentence: boolean (default=false), the filter tries to match one or more sentences within 'txtLen'. 
         *   If 'txtLen' is '0' it will use the first full sentence regardless of the length of the result. 
         *   If 'sentence' is set to 'true' 'exact' will be ignored.
         *   If no sentence is found using the 'sentenceDelimiters' the behaviour is the same as if sentence is set to
         *   'false' which implies that only the 'tpl' is returned if 'txtLen' is '0'
         * - sentenceDelimiters: string (default='.!?;:')
         * */
        return function (input, txtLen, exact, tpl, sentence, sentenceDelimiters) {
            var _exact, _sentence, _sentenceDelimiters, _tpl, match, out, regex;

            if (!input || txtLen === undefined || txtLen === null) {
                return null;
            }

            if (txtLen >= input.length) {
                out = input;
            } else {
                if (exact === undefined || exact === null) {
                    _exact = false;
                } else {
                    _exact = exact;
                }

                if (tpl === undefined || tpl === null) {
                    _tpl = '[...]';
                } else {
                    _tpl = tpl;
                }

                if (sentence === undefined || sentence === null) {
                    _sentence = false;
                } else {
                    _sentence = sentence;
                }

                if (sentenceDelimiters === undefined || sentenceDelimiters === null) {
                    _sentenceDelimiters = '.!?;:';
                } else {
                    _sentenceDelimiters = sentenceDelimiters;
                }

                if (_sentence && txtLen === 0) {
                    match = input.match(getRegex(_sentenceDelimiters, ''));
                    if (match) {
                        if (match.index >= input.length - 1) {
                            out = input;
                        } else {
                            out = input.substr(0, match.index + 1) + ' ' + _tpl;
                        }
                    } else {
                        // nothing found, thus processing as if sentence == false,
                        // which basically means only the tpl (len = 0)
                        out = _tpl;
                    }
                } else {
                    out = input.substr(0, txtLen - _tpl.length);

                    if (_sentence) {
                        regex = getRegex(_sentenceDelimiters, 'g');
                        match = 0;
                        // one char less as we add one if matched
                        while(regex.exec(out.substr(0, out.length - 1)) !== null) {
                            match = regex.lastIndex;
                        }
                        if (match > 0) {
                            out = out.substr(0, match + 1) + ' ';
                        }
                    }

                    if (_exact) {
                        out += _tpl;
                    } else {
                        match = out.match(/\s+\w*$/);
                        if (match) {
                            out = out.substr(0, match.index + 1) + _tpl;
                        } else {
                            out += _tpl;
                        }
                    }
                }
            }

            return out;
        };
    }
);

angular.module(
    'eu.water-switch-on.sip.services',
    [
    ]
);
angular.module(
    'de.cismet.cids.services',
    [
    ]
);
angular.module(
    'de.cismet.cids.services'
).factory(
    'de.cismet.cids.services.featureRendererService',
    [
        // would depend on a provider for features, to be specified
        function () {
            'use strict';

            var getFeatureRenderer, wicket, defaultStyle, highlightStyle;

            wicket = new Wkt.Wkt();

            defaultStyle = {color: '#0000FF', fill: false, weight: 2, riseOnHover: true, clickable: false};
            highlightStyle = {fillOpacity: 0.4, fill: true, fillColor: '#1589FF', riseOnHover: true, clickable: false};

            /**
             * Returns a "Feature Renderer" (Leaflet Layer) for a resource.
             * If the resources contains a WMS preview representation a WMS Layer
             * is instantiated and returned, otherwise, the spatialextent (geom)
             * of the resourc eis used.
             *
             * @param {type} obj
             * @returns {L.TileLayer.WMS|featureRendererService_L7.getFeatureRenderer.renderer}
             */
            getFeatureRenderer = function (obj) {
                // this is only an indirection to hide the conrete implementation
                // however, as not specified yet, we hardcode this for now

                var ewkt, renderer, objectStyle;

                renderer = null;
                if (obj &&
                        obj.$self &&
                        obj.$self.substr(0, 18).toLowerCase() === '/switchon.resource') {
                    if (obj.representation) {
                        obj.representation.every(function (representation) {
                            var capabilities, layername;

                            if (representation.name && representation.contentlocation &&
                                    representation.type && representation.type.name === 'aggregated data' &&
                                    representation['function'] && representation['function'].name === 'service' &&
                                    representation.protocol) {

                                // PRIORITY on TMS!
                                if (representation.protocol.name === 'WWW:TILESERVER') {
                                    renderer = L.tileLayer(representation.contentlocation,
                                        {
                                            // FIXME: make configurable per layer
                                            tms: 'true'
                                        });

                                    // unfortunately leaflet does not parse the capabilities, etc, thus no bounds present :(
                                    // todo: resolve performance problems with multipoint / multipolygon!
                                    renderer.getBounds = function () {
                                        // the geo_field property comes from the server so ...  
                                        if (obj.spatialcoverage && obj.spatialcoverage.geo_field) { // jshint ignore:line
                                            ewkt = obj.spatialcoverage.geo_field; // jshint ignore:line
                                            wicket.read(ewkt.substr(ewkt.indexOf(';') + 1));

                                            return wicket.toObject().getBounds();
                                        }
                                    };

                                    // disable the layer by default and show it only when it is selected!
                                    renderer.setOpacity(0.0);
                                    //renderer.bringToBack();
                                } else if (representation.protocol.name === 'OGC:WMS-1.1.1-http-get-capabilities') {
                                    capabilities = representation.contentlocation;
                                    layername = representation.name;
                                    renderer = L.tileLayer.wms(
                                        capabilities,
                                        {
                                            layers: layername,
                                            format: 'image/png',
                                            transparent: true,
                                            version: '1.1.1'
                                        }
                                    );

                                    // unfortunately leaflet does not parse the capabilities, etc, thus no bounds present :(
                                    // todo: resolve performance problems with multipoint / multipolygon!
                                    renderer.getBounds = function () {
                                        // the geo_field property comes from the server so ...  
                                        if (obj.spatialcoverage && obj.spatialcoverage.geo_field) { // jshint ignore:line
                                            ewkt = obj.spatialcoverage.geo_field; // jshint ignore:line
                                            wicket.read(ewkt.substr(ewkt.indexOf(';') + 1));

                                            return wicket.toObject().getBounds();
                                        }
                                    };

                                    // disable the layer by default and show it only when it is selected!
                                    renderer.setOpacity(0.0);
                                    renderer.bringToBack();
                                }
                            }

                            // execute callback function until renderer is found 
                            return renderer === null;
                        });
                    }

                    // the geo_field property comes from the server so ...  
                    // if no preview (WMS layer representation) is found,
                    // use the spatial extent
                    if (!renderer && obj.spatialcoverage && obj.spatialcoverage.geo_field) { // jshint ignore:line
                        ewkt = obj.spatialcoverage.geo_field; // jshint ignore:line
                        wicket.read(ewkt.substr(ewkt.indexOf(';') + 1));
                        objectStyle = Object.create(defaultStyle);
                        if (obj.name) {
                            objectStyle.title = obj.name;
                        }
                        renderer = wicket.toObject(objectStyle);
                        renderer.setStyle(defaultStyle);
                    }
                }

                return renderer;
            };

            return {
                getFeatureRenderer: getFeatureRenderer,
                defaultStyle: defaultStyle,
                highlightStyle: highlightStyle
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.services'
).factory(
    'eu.water-switch-on.sip.services.filterService',
    ['FilterExpression',
        'AppConfig',
        function (FilterExpression, AppConfig) {
            'use strict';

            var nodeCollection, nodeCollectionCopy,
                setResultSetFunction, filterResultSetFunction, containsTag,
                filterNodeCollection, totalResources, pattern, parameterToTaggroup,
                taggroups, filterTags, filterTagsCopy, updateFilterTags;

            pattern = AppConfig.filterExpressionPattern;

            // TODO: those are the default taggroups used for filtering search results
            // they should be put to a separate Value Provider to allow 
            // per-application configuration of post search filters
            taggroups = {};
            taggroups[FilterExpression.FILTER__ACCESS_CONDITION] = 'access conditions';
            taggroups[FilterExpression.FILTER__KEYWORD_XCUAHSI] = 'keywords - X-CUAHSI';
            taggroups[FilterExpression.FILTER__KEYWORD] = 'keywords - free';
            taggroups[FilterExpression.FILTER__PROTOCOL] = 'protocol';
            taggroups[FilterExpression.FILTER__FUNCTION] = 'function';
            taggroups[FilterExpression.FILTER__RESOURE_TYPE] = 'resource type';

            /**
             * Sets a complete server search result set including node collection 
             * and objects. The function creates a shallow copy of the results set
             * to be able to revoke applied filters.
             * 
             * @param {type} resultSet
             * @returns {undefined}
             */
            setResultSetFunction = function (resultSet) {
                if (resultSet && resultSet.$collection) {
                    nodeCollection = resultSet.$collection;
                    nodeCollectionCopy = nodeCollection.slice();
                    totalResources = resultSet.$total;
                } else {
                    nodeCollection = [];
                    nodeCollectionCopy = [];
                    totalResources = 0;
                }

                if (resultSet && resultSet.$filterTags) {
                    filterTags = resultSet.$filterTags;
                    filterTagsCopy = filterTags.slice();
                } else {
                    filterTags = [];
                    filterTagsCopy = [];
                }
            };

            /**
             * Filters a result set by the FilterExpression. Accepts either a
             * negated filter expression or a post search filters filter expression
             * wherby the post search filters filter expression consists of an array 
             * of negated filter expressions.
             * 
             * The filter is directly applied on the shared resultSet$collection
             * that is injected into the $scope of this service and other 
             * directives, e.g. the listViewDirective.
             * 
             * @param {FilterExpression} filterExpression FilterExpression used for filtering
             * @returns {undefined}
             */
            filterResultSetFunction = function (filterExpression) {
                var i, filterExpressionString, param, value;

                // reset node collection
                for (i = 0; i < nodeCollectionCopy.length; ++i) {
                    if (nodeCollection.indexOf(nodeCollectionCopy[i]) === -1) {
                        nodeCollection.push(nodeCollectionCopy[i]);
                    }
                }

                // re-apply filters
                if (filterExpression && filterExpression.isValid()) {
                    if (filterExpression.parameter === FilterExpression.FILTER__POST_SEARCH_FILTERS) {
                        for (i = 0; i < filterExpression.value.length; ++i) {
                            // post search filters are an array of negated filter expressions!
                            filterExpressionString = filterExpression.value[i].split(pattern);
                            param = filterExpressionString[1];
                            value = filterExpressionString[2];

                            if (param && value) {
                                // filter expression is negated but the tag group name not!
                                param = param.indexOf('!') === 0 ? param.substr(1) : param;
                                filterNodeCollection(parameterToTaggroup(param), value);
                            }
                        }
                    } else {
                        // most likely a negated filter expression!
                        param = filterExpression.parameter.indexOf('!') === 0 ?
                                filterExpression.parameter.substr(1) : filterExpression.parameter;

                        if (filterExpression.isMultiple()) {
                            for (i = 0; i < filterExpression.value.length; ++i) {
                                filterNodeCollection(parameterToTaggroup(param), value[i]);
                            }
                        } else {
                            filterNodeCollection(parameterToTaggroup(param), value);
                        }
                    }
                }
            };

            /**
             * Performs a mapping between a filter expression parameter
             * and a taggroup. In general filter expression parmameters
             * (e.g. 'access-condition') should directly map to taggroup names.
             * However, some data models use taggroup names that contain spaces, etc.
             * (like 'access conditions'), therfore a client-side mapping is necessary-
             * 
             * @param {string} param
             * @returns {string} taggroup mapped to parameter
             */
            parameterToTaggroup = function (param) {
                var taggroup;
                taggroup = taggroups[param];
                return taggroup || param;
            };

            /**
             * Helper method for filtering a collection of nodes by a tag belonging 
             * to a specific tag group.
             * 
             * @param {string} taggroup
             * @param {string} tagname
             * @returns {undefined}
             */
            filterNodeCollection = function (taggroup, tagname) {
                var i, j, node;

                if (nodeCollectionCopy && nodeCollection && nodeCollectionCopy.length > 0) {

                    for (i = 0; i < nodeCollectionCopy.length; i++) {
                        node = nodeCollectionCopy[i];
                        j = nodeCollection.indexOf(node);
                        // omit node properties, start directly with object
                        if (containsTag(null, node.object, taggroup, tagname)) {
                            // filter can be applied to node!
                            // remove the node if it is not already removed
                            //console.log('tag "' + tagname + '" of taggroup "' + taggroup + ' filtered in nodeCollection[' + nodeCollection.length + '] (total nodes:' + nodeCollectionCopy.length + ')');
                            if (j !== -1) {
                                //console.log('removing tag "' + tagname + '" of taggroup "' + taggroup + '" from nodeCollection[' + nodeCollection.length + '] (total nodes:' + nodeCollectionCopy.length + ') at position ' + j);
                                nodeCollection.splice(j, 1);
                            }
                        }
                    }
                    //
                    //FIXME: TEMP DISABLED, method not tested
                    //updateFilterTags();
                }
            };

            /**
             * Locally updates the array of post search filters and sets the cardinality
             * of the individual tags based on the locally filtered result set.
             * 
             * FIXME: This method is not tested nor currently used!
             * 
             * @returns {undefined}
             */
            updateFilterTags = function () {
                var i, j, k, filterGroup, tagGroupName, tagGroupTags,
                    node, tagName, cardinality;

                // restore
                filterTags = filterTagsCopy.slice();

                for (i = 0; i < filterTags.length; ++i) {
                    filterGroup = filterTags[i];
                    if (filterGroup && filterGroup.value && filterGroup.value.length > 0) {
                        // e.g. download or access-conditions
                        tagGroupName = filterGroup.key;
                        // tags belonging to the group, including their cardinality
                        tagGroupTags = filterGroup.value;

                        for (j = 0; j < tagGroupTags.length; j++) {
                            tagName = tagGroupTags[j].key;
                            cardinality = 0;

                            for (k = 0; k < nodeCollection.length; k++) {
                                node = nodeCollection[k];
                                if (containsTag(null, node.object, tagGroupName, tagName)) {
                                    cardinality++;
                                }
                            }

                            tagGroupTags[j].value = cardinality;
                        }
                    }
                }
            };

            /**
             * Helper method for tag-based filtering that checks whether an
             * (cids)object is associated with a tag of a specific tag group.
             * 
             * @param {object} parentObject
             * @param {object} childObject
             * @param {string} taggroup
             * @param {string} tagname
             * @returns {Boolean} true if the child object contains the tag
             */
            containsTag = function (parentObject, childObject, taggroup, tagname) {
                var propertyName, propertyValue;
                if (parentObject && childObject && childObject.hasOwnProperty('taggroup')) {
                    // we found a tag. check  group and value
                    if (childObject.taggroup.name === taggroup && childObject.name === tagname) {
                        return true;
                    }
                } else if (childObject && typeof childObject === 'object') {
                    // object is not a tag. iterate sub objects
                    for (propertyName in childObject) {
                        if (childObject.hasOwnProperty(propertyName)) {
                            propertyValue = childObject[propertyName];
                            if (propertyValue && typeof childObject === 'object') {
                                if (containsTag(childObject, propertyValue, taggroup, tagname)) {
                                    return true;
                                }
                            }
                        }
                    }
                }

                return false;
            };


            return {
                setResultSet: setResultSetFunction,
                getTotalResourcesNumber: function () { return totalResources; },
                getFilteredResourcesNumber: function () { return nodeCollectionCopy.length - nodeCollection.length; },
                getLoadedResourcesNumber: function () { return nodeCollectionCopy.length; },
                isCompleteResult: function () { return nodeCollectionCopy && nodeCollectionCopy.length > 0 && nodeCollectionCopy.length ===  totalResources; },
                filterResultSet: filterResultSetFunction
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.services'
).factory(
    'eu.water-switch-on.sip.services.masterToolbarService',
    [
        function () {
            'use strict';

            var canShow, isShowing, getCanShow, setCanShow, showing, toggleVisibility;

            canShow = false;
            showing = false;

            toggleVisibility = function (visible) {
                if (canShow) {
                    if (visible) {
                        showing = visible;
                    } else {
                        showing = !showing;
                    }
                } else {
                    showing = false;
                }

                return showing;
            };

            getCanShow = function () {
                return canShow;
            };

            setCanShow = function (can) {
                canShow = can;
            };
            
            isShowing = function () {
                return showing;
            };

            return {
                isShowing: isShowing,
                getCanShow: getCanShow,
                setCanShow: setCanShow,
                toggleVisibility: toggleVisibility
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.services'
).factory('eu.water-switch-on.sip.services.MockService',
    ['$resource',
        function ($resource) {
            'use strict';

            var searchService, xcuahsiKeywordsService, inspireKeywordsService,
                inspireTopicsService, keywordsService, countriesEuropeService,
                countriesWorldService, searchFunction, loadKeywordListFunction,
                loadCountriesListFunction;

            searchService = $resource('data/resultSet.json', {});

            xcuahsiKeywordsService = $resource('data/xcuahsiKeywords.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                    },
                    isArray: true
                }
            });

            inspireKeywordsService = $resource('data/inspireKeywords.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                    },
                    isArray: true
                }
            });

            inspireTopicsService = $resource('data/inspireTopics.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                    },
                    isArray: true
                }
            });

            keywordsService = $resource('data/keywords.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                    },
                    isArray: true
                }
            });

            countriesEuropeService = $resource('data/countriesEurope.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                    },
                    isArray: false
                }
            });

            countriesWorldService = $resource('data/countriesWorld.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                    },
                    isArray: false
                }
            });

            searchFunction =
                function () {
                    return searchService.get();
                };

            loadKeywordListFunction =
                function (keywordGroup) {
                    switch (keywordGroup) {
                    case 'xcuahsi_keyword':
                        return xcuahsiKeywordsService.query();
                    case 'inspire_keyword':
                        return inspireKeywordsService.query();
                    case 'inspire_topic':
                        return inspireTopicsService.query();
                    case 'keyword':
                        return keywordsService.query();
                    default:
                        return null;
                    }
                };

            loadCountriesListFunction =
                function (countryGroup) {
                    switch (countryGroup) {
                    case 'countries_world':
                        return countriesWorldService.query();
                    case 'countries_europe':
                        return countriesEuropeService.query();
                    default:
                        return null;
                    }
                };

            return {
                search: searchFunction,
                loadKeywordList: loadKeywordListFunction,
                loadCountriesList: loadCountriesListFunction
            };
        }
        ]);

angular.module(
    'eu.water-switch-on.sip.services'
).factory('eu.water-switch-on.sip.services.SearchService',
    ['$resource', 'eu.water-switch-on.sip.services.Base64',
        '$q', '$interval', 'AppConfig',
        function ($resource, Base64, $q, $interval, AppConfig) {
            'use strict';
            var config, authdata, entityResource, searchResource, searchFunction;

            config = AppConfig.searchService;
            authdata = Base64.encode(config.username + ':' + config.password);

            // remote legagy search core search
            // FIXME: limit and offset not implemented in legacy search!
            // currently, limit and offset are appended to the POST query parameter!
            searchResource = $resource(config.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results',
                {
                    limit: 20,
                    offset: 0,
                    omitNullValues: true,
                    deduplicate: true
                }, {
                    search: {
                        method: 'POST',
                        params: {
                            limit: '@limit',
                            offset: '@offset'
                        },
                        isArray: false,
                        headers: {
                            'Authorization': 'Basic ' + authdata
                        }
                    }
                });

            // TODO: the deduplicate setting should be true by default
            entityResource = $resource(
                config.host + '/SWITCHON.:classname/:objId',
                {
                    omitNullValues: true,
                    deduplicate: false
                },
                {
                    get: {
                        method: 'GET',
                        isArray: false,
                        headers: {
                            'Authorization': 'Basic ' + authdata
                        }
                    }
                }
            );

            searchFunction = function (universalSearchString, filterTagGroups, limit, offset, progressCallback) {
                var deferred, noop, queryObject, result, searchError, searchResult, searchSuccess,
                    timer, fakeProgress, filterTags, deferredFilterTags;

                noop = angular.noop;

                deferred = $q.defer();

                queryObject = {
                    'list': [{'key': 'Query', 'value': universalSearchString}]
                };

                // ensure that the mandatory $total group is requested
                // FIXME: workaround till legacy search core returns $total
                if (filterTagGroups && filterTagGroups.length > 0) {
                    if (filterTagGroups.indexOf('$total') === -1) {
                        filterTagGroups += ',$total';
                    }
                } else {
                    filterTagGroups = '$total';
                }

                // current value, max value, type, max = -1 indicates indeterminate
                (progressCallback || noop)(0, -1, 'success');

                fakeProgress = 1;
                timer = $interval(function () {
                    (progressCallback || noop)(fakeProgress, -1, 'success');
                    fakeProgress++;
                }, 100, 100);

                if (offset && limit && limit > 0 && offset > 0 && (offset %  limit !== 0)) {
                    offset = 0;
                }

                // result of this search operation
                // set a new promise 
                result = {
                    $promise: deferred.promise,
                    $resolved: false,
                    $offset: offset,
                    $limit: limit,
                    $length: 0
                };

                // result of the remote search operation (promise)
                // starting the search!
                // FIXME:   limit an offset GET parameters currently not evaluated 
                //          by the leagcy service. There we have to add them also
                //          to the queryObject.
                searchResult = searchResource.search(
                    {
                        limit: limit,
                        offset: offset
                    },
                    queryObject
                );

                // called when both search promises have been resolved
                searchSuccess = function (searchResultData) {
                    var classesError, classesSuccess, nodes;

                    // searchResult.$collection
                    nodes = searchResultData[0].$collection;

                    // classes resolved
                    classesSuccess = function (data) {
                        var allError, allSuccess, classCache, classname, i, objectId, objsQ,
                            objPromise, singleProgressF, resolvedObjsCount, fakeProgressActive;

                        classCache = [];
                        for (i = 0; i < data.$collection.length; ++i) {
                            classCache[data.$collection[i].key] = data.$collection[i].value;
                        }

                        objsQ = [];

                        resolvedObjsCount = 0;
                        // we stop fake progresss before 1st object has been resolved
                        // to minimze delay between fake and real progress steps
                        if (nodes.length > 0) {
                            fakeProgressActive = true;
                        } else {
                            $interval.cancel(timer);
                        }

                        // real progress starts at 100 and this then scaled to 200 by callback
                        (progressCallback || noop)(resolvedObjsCount, nodes.length, 'success');

                        singleProgressF = function () {
                            if (fakeProgressActive === true) {
                                fakeProgressActive = !$interval.cancel(timer);
                            }

                            (progressCallback || noop)(++resolvedObjsCount, nodes.length, 'success');
                        };

                        for (i = 0; i < nodes.length; ++i) {
                            classname = classCache[nodes[i].LEGACY_CLASS_ID];
                            objectId = nodes[i].LEGACY_OBJECT_ID;

                            objPromise = entityResource.get({
                                classname: classname,
                                objId: objectId
                            }).$promise;
                            objPromise['finally'](singleProgressF);

                            objsQ[i] = objPromise;
                        }

                        // objects resolved
                        allSuccess = function (objs) {

                            var key, tagGroup, resultFilterTags;

                            // update nodes in search result
                            for (i = 0; i < nodes.length; ++i) {
                                nodes[i].object = objs[i];
                            }

                            // doing the same as ngResource: copying the results in the already returned obj (shallow)
                            for (key in searchResult) {
                                if (searchResult.hasOwnProperty(key) &&
                                        !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
                                    result[key] = searchResult[key];
                                }
                            }

                            // FIXME: Currently the post filter search is used
                            // to return the total number of search results as
                            // a workaround till $total is set by the leagy core
                            resultFilterTags = searchResultData[1].$collection;
                            if (resultFilterTags && resultFilterTags.length > 0) {
                                for (i = 0; i < resultFilterTags.length; i++) {
                                    tagGroup = resultFilterTags[i];
                                    if (tagGroup.key === '$total' && tagGroup.value && tagGroup.value.length === 1) {
                                        // 
                                        result.$total = parseInt(tagGroup.value[0].value, 10);
                                        // $total is not valid filter tag. remove it.
                                        resultFilterTags.splice(i, 1);
                                        break;
                                    }
                                }
                            }

                            result.$length = nodes.length;
                            if (!result.$total || result.$total === 0) {
                                result.$total = nodes.length;
                            }

                            result.$filterTags =  searchResultData[1].$collection;
                            deferred.resolve(result);
                        };

                        allError = function (data) {
                            result.$error = 'cannot lookup objects';
                            result.$response = data;
                            result.$resolved = true;

                            deferred.reject(result);
                            $interval.cancel(timer);
                            (progressCallback || noop)(1, 1, 'error');
                        };

                        // combine promises of all get objects calls
                        $q.all(objsQ).then(allSuccess, allError);
                    };

                    classesError = function (data) {
                        result.$error = 'cannot lookup class names';
                        result.$response = data;
                        result.$resolved = true;

                        deferred.reject(result);
                        $interval.cancel(timer);
                        (progressCallback || noop)(1, 1, 'error');
                    };

                    $resource(
                        config.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ClassNameSearch/results',
                        {},
                        {
                            exec: {
                                method: 'POST',
                                isArray: false,
                                headers: {
                                    'Authorization': 'Basic ' + authdata
                                }
                            }
                        }
                    ).exec(
                        {
                            'list': [{'key': 'Domain', 'value': 'SWITCHON'}]
                        }
                    ).$promise.then(classesSuccess, classesError);
                };

                searchError = function (data) {
                    result.$error = 'cannot search for resources';
                    result.$response = data;
                    result.$resolved = true;
                    deferred.reject(result);
                    $interval.cancel(timer);
                    (progressCallback || noop)(1, 1, 'error');
                };

                if (filterTagGroups && filterTagGroups.length > 0) {
                    filterTags = $resource(
                        config.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.PostFilterTagsSearch/results',
                        {},
                        {
                            exec: {
                                method: 'POST',
                                isArray: false,
                                headers: {
                                    'Authorization': 'Basic ' + authdata
                                }
                            }
                        }
                    );

                    filterTags = filterTags.exec(
                        {
                            'list': [{'key': 'Query', 'value': universalSearchString },
                                {'key': 'FilterTagGroups', 'value': filterTagGroups}]
                        }
                    );
                } else {
                    // if no filter tags are requested, just return an empty collection
                    deferredFilterTags = $q.defer();
                    filterTags = {};
                    filterTags.$collection = [];
                    filterTags.$promise = deferredFilterTags.promise;
                    filterTags.$resolved = true;
                    deferredFilterTags.resolve(filterTags);
                }

                // combine search and filter tags promises
                $q.all([searchResult.$promise, filterTags.$promise]).then(searchSuccess, searchError);

                return result;
            };

            return {
                search: searchFunction,
                entityResource: entityResource
            };
        }
        ])

    .factory('eu.water-switch-on.sip.services.Base64', function () {
        /* jshint ignore:start */

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },
            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    console.error("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 !== 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 !== 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };

        /* jshint ignore:end */
    });

angular.module(
    'eu.water-switch-on.sip.services'
).factory(
    'eu.water-switch-on.sip.services.sessionService',
    [
        '$rootScope',
        function ($rootScope) {
            'use strict';

            var anonymousUsername, currentUser, getAnonymousUser, getCurrentUser, isAnonymousUser, setCurrentUser;

            anonymousUsername = 'Anonymous';

            getAnonymousUser = function () {
                return {
                    name: anonymousUsername
                };
            };

            getCurrentUser = function () {
                return currentUser;
            };

            isAnonymousUser = function (user) {
                if (user && user.name) {
                    return anonymousUsername === user.name;
                }

                return false;
            };

            setCurrentUser = function (user) {
                var oldUser;

                oldUser = currentUser;
                if (user) {
                    currentUser = user;
                    $rootScope.$broadcast('userChanged', oldUser, currentUser);
                } else {
                    throw 'invalid user: ' + user;
                }
            };

            setCurrentUser(getAnonymousUser());

            return {
                getAnonymousUser: getAnonymousUser,
                getCurrentUser: getCurrentUser,
                isAnonymousUser: isAnonymousUser
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.services'
).factory(
    'eu.water-switch-on.sip.services.shareService',
    [
        function () {
            'use strict';

            var resourceObjects;

            return {
                // TODO: move the functions to the body if they get more complex
                // TODO: consider event on set
                getResourceObjects: function () { return resourceObjects; },
                setResourceObjects: function (objs) { resourceObjects = objs; }
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.services'
).factory('eu.water-switch-on.sip.services.TagGroupService',
    ['$resource', 'eu.water-switch-on.sip.services.Base64', 'AppConfig',
        function ($resource, Base64, AppConfig) {
            'use strict';

            var tagResources, tagGroups, lazyLoadTagLists, getKeywordListFunction,
                getCountryListFunction, getCategoryListFunction, config, authdata,
                tagSearches, searchResource, searchTags;

            tagResources = {
                //'keyword-x-cuahsi': 'data/xcuahsiKeywords.json',
                //'keyword-x-cuahsi-toplevel': 'data/xcuahsiToplevelKeywords.json',
                'keyword-inspire': 'data/inspireKeywords.json',
                'topic-inspire': 'data/inspireTopics.json',
                'keyword-free': 'data/freeKeywords.json',
                'keyword-all': 'data/allKeywords.json',
                'country-world': 'data/countriesWorld.json',
                'country-europe': 'data/countriesEurope.json',
                'category-default': 'data/defaultCategories.json',
                'category-collection': 'data/collectionCategories.json'
            };

            tagSearches = {
                'keyword-x-cuahsi': 'X-CUAHSI'
            };

            // cached tag group lists
            tagGroups = {};

            config = AppConfig.searchService;
            authdata = Base64.encode(config.username + ':' + config.password);

            // remote legagy search core search
            // FIXME: limit and offset not implemented in legacy search!
            // currently, limit and offset are appended to the POST query parameter!
            searchResource = $resource(config.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ResourceTagsSearch/results',
                {
                    limit: 20,
                    offset: 0,
                    omitNullValues: true,
                    deduplicate: true
                }, {
                    search: {
                        method: 'POST',
                        params: {
                        },
                        isArray: false,
                        headers: {
                            'Authorization': 'Basic ' + authdata
                        }
                    }
                });

            searchTags = function (tagGroup) {
                var queryObject, searchResult;

                queryObject = {
                    'list': [{'key': 'taggroup', 'value': tagGroup}]
                };
                searchResult = searchResource.search(
                    {},
                    queryObject
                );
                return searchResult;
            };

            lazyLoadTagLists = function (tagGroup, array) {
                var intermetiateResult, tags, tagResource, i;
                // cached list does exist
                if (tagGroups.hasOwnProperty(tagGroup)) {
                    return tagGroups[tagGroup];
                }

                // list not cached but resource does exist
                if (tagResources.hasOwnProperty(tagGroup)) {
                    tagResource = $resource(tagResources[tagGroup], {}, {
                        query: {
                            method: 'GET',
                            params: {
                            },
                            isArray: array
                        }
                    });

                    tagGroups[tagGroup] = tagResource.query();
                    return tagGroups[tagGroup];
                }

                if (tagSearches.hasOwnProperty(tagGroup)) {
                    intermetiateResult = searchTags(tagSearches[tagGroup]);
                    tags = [];
                    tags.$resolved = false;
                    tags.$promise = intermetiateResult.$promise.then(function (resource) {
                        for (i = 0; i < resource.$collection.length; i++) {
                            tags.push(resource.$collection[i]);
                        }
                        tags.$resolved = true;
                        return tags;
                    });
                    tagGroups[tagGroup] = tags;
                    return tagGroups[tagGroup];
                }

                console.warn('unknown tag group:' + tagGroup);
                //return array ? [] : {};
                return null;
            };

            getKeywordListFunction =
                function (keywordGroup) {
                    return lazyLoadTagLists(keywordGroup, true);
                };

            getCountryListFunction =
                function (countryGroup) {
                    return lazyLoadTagLists(countryGroup, false);
                };

            getCategoryListFunction =
                function (categoryGroup) {
                    return lazyLoadTagLists(categoryGroup, true);
                };

            return {
                getKeywordList: getKeywordListFunction,
                getCountryList: getCountryListFunction,
                getCategoryList: getCategoryListFunction
            };
        }]
    );
