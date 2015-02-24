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
        'AppConfig',
        function ($scope, $filter, $modal, $rootScope, NgTableParams, TagGroupService, AppConfig) {
            'use strict';

            var initialSorting, keywordLookupLists, generateKeywordList, generateQueryKeywordList;

            $scope.$watch('tableData', function () {
                // this is the list that contains the keyywords of the current query
                generateQueryKeywordList();
                $scope.tableParams.reload();
            });

            initialSorting = {};
            initialSorting['object.name'] = 'asc';
            keywordLookupLists = {};
            generateKeywordList = function (keywordGroup) {
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
            generateKeywordList('keyword-cuahsi');

            $scope.config = AppConfig.listView;

            $scope.tableParams = new NgTableParams({
                page: 1,
                count: 2,
                sorting: initialSorting
            }, {
                counts: [],
                total: 1,
                getData: function ($defer, params) {
                    var ordered;

                    ordered = params.sorting() ? $filter('orderBy')($scope.tableData, params.orderBy()) : $scope.tableData;
                    $defer.resolve(ordered);
                }
            });

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
                if (keyword !== undefined) {
                    if (keywordLookupLists.hasOwnProperty(keywordGroup)) {
                        return keywordLookupLists[keywordGroup].indexOf(keyword.toLowerCase()) > -1;
                    }
                }
                return false;
            };
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
                setSearchGeom, wicket, config;

            config = AppConfig.mapView;

            angular.extend($scope, {
                defaults: {
                    tileLayer: config.backgroundLayer,
                    //maxZoom: 14,
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    }
                }
            });

            // ---- resize START ----
            fireResize = function (animate) {
                $scope.currentHeight = $window.innerHeight - 100;
                $scope.currentWidth = $window.innerWidth - ($scope.isResultShowing ? 250 : 0);
                leafletData.getMap('mainmap').then(function (map) {
                    map.invalidateSize(animate);
                });
            };

            // we assume that the nav and button bars are actuall 100 px high
            $scope.currentHeight = $window.innerHeight - 100;
            $scope.currentWidth = $window.innerWidth - ($scope.isResultShowing ? 250 : 0);

            $scope.$watch('isResultShowing', function () {
                $timeout(function () {
                    fireResize(true);
                }, 500);
            });

            $scope.center = config.home;

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
                    polyline: {
                        shapeOptions: {
                            color: '#800000'
                        }
                    },
                    polygon: {
                        shapeOptions: {
                            color: '#800000'
                        }
                    },
                    rectangle: {
                        shapeOptions: {
                            color: '#800000'
                        }
                    },
                    // no circles for starters as not compatible with WKT
                    circle: false,
                    marker: {
                        icon: new MapSearchIcon()
                    }
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

            internalChange = false;
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

            $scope.$watch('searchGeomWkt', function (n, o) {
                if (internalChange) {
                    internalChange = false;
                } else {
                    if (n && n !== o) {
                        try {
                            wicket.read(n);
                            internalChange = true;
                            setSearchGeom(wicket.toObject({color: '#800000', icon: new MapSearchIcon()}));
                        } catch (e) {

                            // clear on illigegal WKT
                            searchGroup.removeLayer($scope.searchGeomLayer);
                            $scope.searchGeomLayer = undefined;
                            $scope.searchGeomWkt = null;
                        }
                    } else if (n === null) {
                        searchGroup.removeLayer($scope.searchGeomLayer);
                        $scope.searchGeomLayer = undefined;
                    }
                }
            });
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc=" objects " >
            objGroup = new L.FeatureGroup();
            leafletData.getMap('mainmap').then(function (map) {
                objGroup.addTo(map);
            });

            setObjects = function (objs) {
                var i, renderer;

                objGroup.clearLayers();
                for (i = 0; i < objs.length; ++i) {
                    renderer = rendererService.getFeatureRenderer(objs[i]);
                    objGroup.addLayer(renderer);
                }
 
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

            $scope.$watch('objects', function (n, o) {
                if (n && n !== o) {
                    setObjects(n);
                }
            });

            if ($scope.objects) {
                setObjects($scope.objects);
            }

            // </editor-fold>

            $scope.$watch('selectedObject', function (n) {
                if (n !== -1 && $scope.centerObjects && objGroup.getLayers().length > n) {
                    leafletData.getMap('mainmap').then(function (map) {
                        // FIXME: probably use with layer ids?
                        // see https://github.com/Leaflet/Leaflet/issues/1805
                        var layer = objGroup.getLayers()[n];
                        layer.setStyle({fillOpacity: 0.4, fill: true, fillColor: '#1589FF'});
                        map.fitBounds(layer.getBounds(), {
                            animate: true,
                            pan: {animate: true, duration: 0.6},
                            zoom: {animate: true},
                            maxZoom: $scope.preserveZoomOnCenter ? map.getZoom() : null
                        });
                    });
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
        function ($scope, $rootScope, $modal, SearchService, $state, FilterExpressions, FilterExpression, TagGroupService, AppConfig) {
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
            $scope.isResultShowing = false;
            $scope.state = $state;

            $scope.filterExpressions = FilterExpressions; // singleton instance
            $scope.geoFilterExpression = new FilterExpression('geo', null, false, true,
                'templates/geo-editor-popup.html');
            $scope.geoFilterExpression.getDisplayValue = function (value) {
                if (value && value.indexOf('(') !== -1) {
                    return value.substring(0, value.indexOf('('));
                }

                return 'undefined';
            };
            $scope.filterExpressions.addFilterExpression($scope.geoFilterExpression);

            // FIXME: move to categories directive ? -----------------------------
            $scope.categoriesFilterExpression = new FilterExpression('category');
            $scope.filterExpressions.addFilterExpression($scope.categoriesFilterExpression);
            // FIXME: move to categories directive ? -----------------------------

            $scope.data.resultSet = null;
            $scope.data.resultObjects = [];
            $scope.data.searchStatus = {
                current: 0,
                max: 0,
                type: null
            };

            $scope.activateView = function (state) {
                //$scope.showMessage(state + ' view showing', 'success');
                $state.go(state, {});
            };

            $scope.toggleResultView = function () {
                $scope.isResultShowing = !$scope.isResultShowing;
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
                var i, objs;

                if (n && n !== o) {
                    objs = [];

                    for (i = 0; i < n.length; ++i) {
                        objs.push(n[i].object);
                    }

                    $scope.data.resultObjects = objs;
                    $scope.data.resultSet.$total = n.length;
                    $scope.data.selectedObject = -1;
                }
            });

            $scope.performSearch = function () {
                $scope.data.resultSet = SearchService.search($scope.filterExpressions.universalSearchString, 25, 0, searchProcessCallback);
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
                // the real object count
                $scope.data.searchStatus.objects = current;
                // the scaled progress: 0 <fake progress> 100 <real progress> 200
                $scope.data.searchStatus.type = type;

                // start of search (indeterminate)
                if (max === -1 && type === 'success') {
                    if ($scope.showMessage) {
                        $scope.showMessage('Search for resources is in progress.', 'info');
                    }

                    // count up fake progress to 100
                    $scope.data.searchStatus.current = current;

                    // search completed
                } else if (current > 0 && current < max && type === 'success') {

                    //normalise to 100% and count up to 200
                    $scope.data.searchStatus.current = 100 + (current / max * 100);

                } else if (current === max && type === 'success') {
                    if (current > 0) {
                        $scope.data.searchStatus.current = 200;
                        if ($scope.showMessage) {
                            $scope.showMessage('Search completed, ' + current +
                                    (current > 1 ? ' resources' : ' resource') + ' found in the SWITCH-ON Meta-Data Repository',
                                    'success');
                        }
                    } else {
                        $scope.data.searchStatus.current = 0;
                        if ($scope.showMessage) {
                            $scope.showMessage('Search completed, but no matching resources found in the SWITCH-ON Meta-Data Repository',
                                'warning');
                        }
                    }

                    if ($scope.progressModal) {
                        $scope.progressModal.close();
                    }
                    // search error   
                } else if (type === 'error') {
                    if ($scope.showMessage) {
                        $scope.showMessage('Search could not be perfomed: ' + $scope.resultSet.$error, 'danger');
                    }

                    if ($scope.progressModal) {
                        $scope.progressModal.close();
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
    'eu.water-switch-on.sip.controllers.objectDownloadModalController',
    [
        '$scope',
        '$modalInstance',
        function ($scope, $modalInstance) {
            'use strict';

            var i;

            $scope.reps = $scope.object.representation ? $scope.object.representation : [];

            for(i = 0; i < $scope.reps.length; ++i) {
                $scope.reps[i]._status = {
                    open: (i === 0 ? true : false)
                };
            }

            $scope.closeDownloadView = function () {
                $modalInstance.close();
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.objectInfoModalController',
    [
        '$scope',
        '$modalInstance',
        function ($scope, $modalInstance) {
            'use strict';
            
            $scope.closeInfoView = function () {
                $modalInstance.close();
            };
        }
    ]
);
angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.resultSetDirectiveController',
    [
        '$scope',
        function ($scope) {
            'use strict';

            $scope.$watch('selectedObject', function (n) {
                console.log(n);
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
        function ($scope, FilterExpression) {
            'use strict';

            var geoFilterExpressions, keywordsCuashiFilterExpressions, textFilterExpressions;

            $scope.keywordsFilterExpression = new FilterExpression('keyword', [], true);
            $scope.filterExpressions.addFilterExpression($scope.keywordsFilterExpression);

            $scope.topicFilterExpression = new FilterExpression('topic');
            $scope.filterExpressions.addFilterExpression($scope.topicFilterExpression);

            $scope.fromDateFilterExpression = new FilterExpression('fromDate');
            $scope.filterExpressions.addFilterExpression($scope.fromDateFilterExpression);

            $scope.toDateFilterExpression = new FilterExpression('toDate');
            $scope.filterExpressions.addFilterExpression($scope.toDateFilterExpression);

            $scope.geoIntersectsFilterExpression = new FilterExpression('geo-intersects', 'false');
            $scope.filterExpressions.addFilterExpression($scope.geoIntersectsFilterExpression);

            $scope.geoBufferFilterExpression = new FilterExpression('geo-buffer', null, false, true,
                'templates/geo-buffer-editor-popup.html');
            $scope.filterExpressions.addFilterExpression($scope.geoBufferFilterExpression);

            $scope.limitFilterExpression = new FilterExpression('limit', 5, false, true,
                'templates/limit-editor-popup.html');
            $scope.filterExpressions.addFilterExpression($scope.limitFilterExpression);

            $scope.topicFilterExpression.getDisplayValue = function (value) {
                return (value && value.length > 0) ? value[0] : value;
            };

            $scope.geoIntersectsFilterExpression.getDisplayValue = function (value) {
                return value ? 'intersect' : 'enclose';
            };

            geoFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType('geo');
            if (geoFilterExpressions && geoFilterExpressions.length > 0) {
                $scope.geoFilterExpression = geoFilterExpressions[0];
            } else {
                console.warn('geo filter expression not correctly initialized!');
                $scope.geoFilterExpression = new FilterExpression('geo', null, false, true,
                    'templates/geo-editor-popup.html');
                $scope.geoFilterExpression.getDisplayValue = function (value) {
                    if (value && value.indexOf('(') !== -1) {
                        return value.substring(0, value.indexOf('('));
                    }

                    return 'undefined';
                };
                $scope.filterExpressions.addFilterExpression($scope.geoFilterExpression);
            }

            // FIXME: move to categories directive -----------------------------
            keywordsCuashiFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType('keyword-cuahsi');
            if (keywordsCuashiFilterExpressions && keywordsCuashiFilterExpressions.length > 0) {
                $scope.keywordsCuashiFilterExpression = keywordsCuashiFilterExpressions[0];
            } else {
                console.warn('keyword-cuahsi filter expression not correctly initialized!');
                $scope.keywordsCuashiFilterExpression = new FilterExpression('keyword-cuahsi', [], true);
                $scope.filterExpressions.addFilterExpression($scope.keywordsCuashiFilterExpression);
            }
            // FIXME: move to categories directive -----------------------------

            textFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType('text');
            if (textFilterExpressions && textFilterExpressions.length > 0) {
                $scope.textFilterExpression = textFilterExpressions[0];
            } else {
                //console.warn('text filter expression not correctly initialized!');
                $scope.textFilterExpression = new FilterExpression('text', null, false, false, null);
                $scope.filterExpressions.addFilterExpression($scope.textFilterExpression);
            }

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

            if ($scope.tag.origin.isEditable()) {
                $scope.data = {};
                $scope.data.editorValue = $scope.tag.origin.value;
               
            }
            
            // Styling of Search Filters.. into CSS but how?
            $scope.getTagIcon = function (type) {
                switch (type) {
                case FilterExpression.FILTER__KEYWORD:
                    return 'glyphicon glyphicon-tags';
                case FilterExpression.FILTER__KEYWORD_CUAHSI:
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
                default:
                    return 'glyphicon glyphicon-flash';
                }
            };

            // get the Filter Icon
            // FIXME: function could be put into a service
            $scope.getTagStyle = function (type, forCloseIcon) {
                var prefix;
                prefix = (forCloseIcon === true) ? 'switchon-close-icon-' : '';

                switch (type) {
                case FilterExpression.FILTER__KEYWORD:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__KEYWORD_CUAHSI:
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
        function ($scope, FilterExpression) {
            'use strict';

            var textFilterExpressions, oldValue, newValue;

            $scope.textFilterExpression = null;
            $scope.pattern = /(^[A-Za-z_\-]+):"([\s\S]+)"$/;

            textFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType('text');
            if (textFilterExpressions && textFilterExpressions.length > 0) {
                $scope.textFilterExpression = textFilterExpressions[0];
            } else {
                //console.warn('text filter expression not correctly initialized!');
                $scope.textFilterExpression = new FilterExpression('text', null, false, false, null);
                $scope.filterExpressions.addFilterExpression($scope.textFilterExpression);
            }

            oldValue = $scope.textFilterExpression.value;

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
                newValue = $scope.textFilterExpression.value;

                //no user input in text box, recreate tags
                if (newValue === oldValue) {
                    $scope.filterExpressions.enumeratedTags = $scope.filterExpressions.enumerateTags();
                } else if (newValue) {
                    var filterExpressionString, param, value, filterExpression, filterExpressions;
                    filterExpressionString = newValue.split($scope.pattern);
                    /** @type {string} */
                    param = filterExpressionString[1];
                    value = filterExpressionString[2];
                    // user entered a valid filter expression
                    if (param && value) {
                        param = param.toLowerCase();
                        if (FilterExpression.FILTERS.indexOf(param) === -1) {
                            $scope.notificationFunction({
                                message: 'The search filter "' + param + '" is unknown. The search may deliver unexpected results.',
                                type: 'info'
                            });
                        }

                        filterExpressions = $scope.filterExpressions.getFilterExpressionsByType(param);
                        if (!filterExpressions || filterExpressions.length < 1) {
                            filterExpression = new FilterExpression(param);
                            filterExpression.value = value;
                            filterExpression.displayValue = value;
                            // triggers update
                            $scope.filterExpressions.addFilterExpression(filterExpression);
                        } else {
                            // should trigger update when comparing with angular.equals
                            // we pick the 1st array element.
                            // FIXME: what if there are multiple FE with the same param?
                            filterExpression = filterExpressions[0];
                            if (filterExpression.isMultiple()) {
                                filterExpression.setArrayValue(value);
                                // no display value for arrays!
                            } else {
                                filterExpression.value = value;
                                filterExpression.displayValue = value;
                            }

                            $scope.notificationFunction({
                                message: 'Search filter "' + param + '" successfully applied with value "' + value + '".',
                                type: 'success'
                            });
                            // reset when expression successfully parsed 
                            $scope.textFilterExpression.clear();
                        }
                    }
                }
                oldValue = $scope.textFilterExpression.value;
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
                    keywordGroup: '@'
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
                    tableData: '='
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
                    objects: '=',
                    centerObjects: '=',
                    selectedObject: '='
                },
                controller: 'eu.water-switch-on.sip.controllers.mapViewDirectiveController'
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
).directive('resultset',
    [
        function () {
            'use strict';

            return {
                restrict: 'E',
                templateUrl: 'templates/resultset-directive.html',
                scope: {
                    resultSet: '=',
                    selectedObject: '='
                },
                controller: 'eu.water-switch-on.sip.controllers.resultSetDirectiveController'
            };
        }
    ]);

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
        function () {
            'use strict';
            return {
                restrict: 'EA',
                templateUrl: 'templates/search-filter-tag-directive-template.html',
                scope: {
                    tag: '='
                },
                controller: 'eu.water-switch-on.sip.controllers.searchFilterTagDirectiveController',
                link: function (scope) {
                    if (scope.tag.origin.isEditable()) {
                        scope.$on('tooltip.hide', function () {
                            var phase;
                            //synchronise filter expression value with editor and displayed tag value
                            //console.log('synchronising ' + scope.tag.origin.value + ' to ' + scope.data.editorValue);
                            scope.tag.origin.value = scope.data.editorValue;

                            //safely apply the new changes
                            phase = scope.$root.$$phase;
                            if (phase !== '$apply' && phase !== '$digest') {
                                scope.$apply();
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

        appConfig.searchService = {};
        appConfig.searchService.username = 'admin@SWITCHON';
        appConfig.searchService.password = 'cismet';
        appConfig.searchService.host = 'http://switchon.cismet.de/legacy-rest1';

        appConfig.mapView = {};
        appConfig.mapView.backgroundLayer = 'http://{s}.opentopomap.org/{z}/{x}/{y}.png';
        appConfig.mapView.home = {};
        appConfig.mapView.home.lat = 49.245166;
        appConfig.mapView.home.lng = 6.936809;
        appConfig.mapView.home.zoom = 4;

        appConfig.gui = {};
        appConfig.gui.dev = false;

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
         * @param {string} parameter
         * @param {object} defaultValue
         * @param {boolean} multiple
         * @param {boolean} visible
         * @param {string} editor
         * @returns {FilterExpression}
         */
        function FilterExpression(parameter, defaultValue, multiple, visible, editor) {
            if (parameter === undefined || parameter === null) {
                throw 'The parameter property of a FilterExpression cannot be null!';
            }
            this.parameter = parameter;
            this.defaultValue = (defaultValue === undefined) ? null : defaultValue;
            // if default value is an object it has to be cloned!
            this.value = (defaultValue === undefined) ? null :
                    ((this.defaultValue !== null && typeof this.defaultValue === 'object') ?
                            JSON.parse(JSON.stringify(this.defaultValue)) : this.defaultValue);
            this.displayValue = null;
            this.multiple = (multiple === undefined) ? false : multiple;
            this.visible = (visible === undefined) ? true : visible;
            this.editor = (editor === undefined) ? null : editor;
        }

        // Define the common methods using the prototype
        // and standard prototypal inheritance.  
        FilterExpression.prototype.getDisplayValue = function (value) {
            return this.displayValue || (value === undefined ? this.value : value);
        };

        FilterExpression.prototype.isValid = function () {
            if (this.multiple === true) {
                return (this.value && this.value.constructor === Array && this.value.length > 0);
            }

            return this.value ? true : false;
        };

        FilterExpression.prototype.isEditable = function () {
            return this.editor ? true : false;
        };

        FilterExpression.prototype.isVisible = function () {
            return (this.visible === true) ? true : false;
        };

        FilterExpression.prototype.getFilterExpressionString = function () {
            var filterExpressionString, arrayLength, i, concatFilter;

            concatFilter = function (parameter, value) {
                var concatExpression = (parameter + ':' + '"' + value + '"');
                return concatExpression;
            };

            if (this.isValid()) {
                if (this.isMultiple()) {
                    arrayLength = this.value.length;
                    for (i = 0; i < arrayLength; i++) {
                        if (i === 0) {
                            filterExpressionString = concatFilter(this.parameter, this.value[i]);
                        } else {
                            filterExpressionString += ' ';
                            filterExpressionString += concatFilter(this.parameter, this.value[i]);
                        }
                    }
                } else {
                    filterExpressionString = concatFilter(this.parameter, this.value);
                }
            }
            return filterExpressionString;
        };

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

        FilterExpression.prototype.isMultiple = function () {
            return this.multiple === true;
        };

        FilterExpression.prototype.clear = function () {
            if (this.defaultValue !== null && typeof this.defaultValue === 'object') {
                this.value = JSON.parse(JSON.stringify(this.defaultValue));
            } else {
                this.value = this.defaultValue;
            }

            this.displayValue = null;
        };

        FilterExpression.prototype.enumerateTags = function () {
            var tags, i, arrayLength, tag;
            tags = [];

            if (this.isVisible() === true && this.isValid() === true && this.value !== this.defaultValue) {
                if (this.isMultiple()) {
                    arrayLength = this.value.length;
                    for (i = 0; i < arrayLength; i++) {
                        tag = new this.Tag(this, this.value[i]);
                        tags.push(tag);
                    }
                } else {
                    tag = new this.Tag(this);
                    tags.push(tag);
                }
            }

            return tags;
        };

        /**
         * @constructor
         * @param {FilterExpression} filterExpression
         * @param {object} arrayValue
         * @returns {FilterExpression.Tag}
         */
        FilterExpression.prototype.Tag = function (filterExpression, arrayValue) {
            if (filterExpression === undefined || filterExpression === null) {
                console.error('The filterExpression property of a FilterTag cannot be null!');
                throw 'The filterExpression property of a FilterTag cannot be null!';
            }

            this.origin = filterExpression;
            this.type = this.origin.parameter;
            this.name = this.origin.isMultiple() ? arrayValue : this.origin.getDisplayValue(this.origin.value);
            this.arrayValue = arrayValue;

            FilterExpression.prototype.Tag.prototype.remove = function () {
                if (this.origin.isMultiple()) {
                    this.origin.value.splice(this.origin.value.indexOf(this.arrayValue), 1);
                } else {
                    this.origin.value = null;
                }
            };

            FilterExpression.prototype.Tag.prototype.getFilterExpressionString = function () {
                if (this.origin.isMultiple()) {
                    console.log(this.type + ':"' + this.arrayValue + '"');
                    return this.type + ':"' + this.arrayValue + '"';
                }

                return this.origin.getFilterExpressionString();
            };
        };

        // define constants
        FilterExpression.RENDERER__TO_STRING = 'renderer_tostring';

        FilterExpression.FILTER__GEO = 'geo';
        FilterExpression.FILTER__GEO_INTERSECTS = 'geo-intersects';
        FilterExpression.FILTER__GEO_BUFFER = 'geo-buffer';
        FilterExpression.FILTER__KEYWORD = 'keyword';
        FilterExpression.FILTER__KEYWORD_CUAHSI = 'keyword-cuahsi';
        FilterExpression.FILTER__TOPIC = 'topic';
        FilterExpression.FILTER__CATEGORY = 'category';
        FilterExpression.FILTER__DATE_START = 'fromDate';
        FilterExpression.FILTER__DATE_END = 'toDate';
        FilterExpression.FILTER__OPTION_LIMIT = 'limit';
        FilterExpression.FILTER__TEXT = 'text';

        FilterExpression.FILTERS = [
            FilterExpression.FILTER__GEO,
            FilterExpression.FILTER__GEO_INTERSECTS,
            FilterExpression.FILTER__GEO_BUFFER,
            FilterExpression.FILTER__KEYWORD,
            FilterExpression.FILTER__KEYWORD_CUAHSI,
            FilterExpression.FILTER__TOPIC,
            FilterExpression.FILTER__CATEGORY,
            FilterExpression.FILTER__DATE_START,
            FilterExpression.FILTER__DATE_END,
            FilterExpression.FILTER__OPTION_LIMIT,
            FilterExpression.FILTER__OPTION_LIMIT,
            FilterExpression.FILTER__TEXT
        ];

        Object.defineProperties(FilterExpression.prototype, {
            'valid': {
                'get': function () {
                    return this.isValid();
                }
            }
        });

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

            var filterExpressions = {};
            filterExpressions.list = [];
            filterExpressions.enumeratedTags = [];

            Object.defineProperties(filterExpressions, {
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

            filterExpressions.clear = function () {
                var keys, arrayLength, i, theFilterExpression;
                keys = Object.keys(filterExpressions.list);
                arrayLength = keys.length;
                for (i = 0; i < arrayLength; i++) {
                    theFilterExpression = filterExpressions.list[keys[i]];
                    if (theFilterExpression instanceof FilterExpression) {
                        theFilterExpression.clear();
                    }
                }
                filterExpressions.enumeratedTags = [];
            };

            filterExpressions.addFilterExpression = function (filterExpression) {
                if (filterExpression instanceof FilterExpression) {
                    filterExpressions.list.push(filterExpression);
                    return true;
                }
                return false;
            };

            filterExpressions.removeFilterExpression = function (filterExpression) {
                var removed, i;
                removed = false;
                for (i = filterExpressions.list.length - 1; i >= 0; i--) {
                    if (filterExpressions.list[i] === filterExpression) {
                        filterExpressions.list.splice(i, 1);
                        removed = true;
                    }
                }
                return removed;
            };

            filterExpressions.getFilterExpressionsByType = function (type, partialMatch) {
                var i, arrayLength, filterExpressionList;
                filterExpressionList = [];
                arrayLength = filterExpressions.list.length;
                for (i = 0; i < arrayLength; i++) {
                    if (partialMatch && filterExpressions.list[i].parameter.indexOf(type) !== -1) {
                        filterExpressionList.push(filterExpressions.list[i]);
                    } else if (filterExpressions.list[i].parameter === type) {
                        filterExpressionList.push(filterExpressions.list[i]);
                    }
                }
                return filterExpressionList;
            };

            filterExpressions.enumerateTags  = function () {
                var arrayLength, i, theFilterExpression, returnTags, theTags;
                returnTags = [];
                arrayLength = filterExpressions.list.length;
                for (i = 0; i < arrayLength; i++) {
                    theFilterExpression = filterExpressions.list[i];
                    theTags = theFilterExpression.enumerateTags();
                    if (theTags.length > 0) {
                        returnTags = returnTags.concat(theTags);
                    }
                }
                return returnTags;
            };

            return filterExpressions;
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

            var getFeatureRenderer, wicket;

            wicket = new Wkt.Wkt();

            getFeatureRenderer = function (obj) {
                // this is only an indirection to hide the conrete implementation
                // however, as not specified yet, we hardcode this for now

                var ewkt, renderer;

                renderer = null;
                if (obj &&
                        obj.$self &&
                        obj.$self.substr(0, 18).toLowerCase() === '/switchon.resource' &&
                        obj.spatialcoverage &&            // this property comes from the server so ...  
                        obj.spatialcoverage.geo_field) {  // jshint ignore:line
                    ewkt = obj.spatialcoverage.geo_field; // jshint ignore:line
                    wicket.read(ewkt.substr(ewkt.indexOf(';') + 1));
                    renderer = wicket.toObject({color: '#000000', fill: false, weight: 1});
                }

                return renderer;
            };

            return {
                getFeatureRenderer: getFeatureRenderer
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

            var searchService, cuahsiKeywordsService, inspireKeywordsService,
                inspireTopicsService, keywordsService, countriesEuropeService,
                countriesWorldService, searchFunction, loadKeywordListFunction,
                loadCountriesListFunction;

            searchService = $resource('data/resultSet.json', {});

            cuahsiKeywordsService = $resource('data/cuahsiKeywords.json', {}, {
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
                    case 'cuahsi_keyword':
                        return cuahsiKeywordsService.query();
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
            //var resultSet = $resource('http://crisma.cismet.de/icmm_api/CRISMA.worldstates/:action/', 
            var config, authdata, searchResource, searchFunction;

            config = AppConfig.searchService;
            authdata = Base64.encode(config.username + ':' + config.password);

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

            searchFunction = function (universalSearchString, limit, offset, progressCallback) {
                //TODO: hardcoded request url, domain
                var deferred, noop, queryObject, result, searchError, searchResult, searchSuccess, timer, fakeProgress;

                noop = angular.noop;

                deferred = $q.defer();

                queryObject = {
                    'list': [{'key': 'Query', 'value': universalSearchString}]
                };

                // current value, max value, type, max = -1 indicates indeterminate
                (progressCallback || noop)(0, -1, 'success');

                fakeProgress = 0;
                timer = $interval (function () {
                    (progressCallback || noop)(fakeProgress, -1, 'success');
                    fakeProgress++;
                }, 100, 100);

                result = {
                    $promise: deferred.promise,
                    $resolved: false
                };

                searchResult = searchResource.search(
                    {
                        limit: limit,
                        offset: offset
                    },
                    queryObject
                );

                searchSuccess = function (data) {
                    var classesError, classesSuccess, nodes;

                    nodes = data.$collection;

                    classesSuccess = function (data) {
                        var allError, allSuccess, classCache, classname, entityResource, i, objectId, objsQ,
                            objPromise, singleProgressF, resolvedObjsCount, fakeProgressActive;

                        classCache = [];
                        for (i = 0; i < data.$collection.length; ++i) {
                            classCache[data.$collection[i].key] = data.$collection[i].value;
                        }

                        objsQ = [];
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
                            classname = classCache[nodes[i].classId];
                            objectId = nodes[i].objectId;

                            objPromise = entityResource.get({
                                classname: classname,
                                objId: objectId
                            }).$promise;
                            objPromise['finally'](singleProgressF);

                            objsQ[i] = objPromise;
                        }

                        allSuccess = function (objs) {
                            var key;

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

                searchResult.$promise.then(searchSuccess, searchError);

                return result;
            };

            return {
                search: searchFunction
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
).factory('eu.water-switch-on.sip.services.TagGroupService',
    ['$resource',
        function ($resource) {
            'use strict';

            var tagResources, tagGroups, lazyLoadTagLists, getKeywordListFunction,
                getCountryListFunction;

            tagResources = {
                'keyword-cuahsi': 'data/cuahsiKeywords.json',
                'keyword-cuahsi-toplevel': 'data/cuahsiToplevelKeywords.json',
                'keyword-inspire': 'data/inspireKeywords.json',
                'topic-inspire': 'data/inspireTopics.json',
                'keyword-free': 'data/freeKeywords.json',
                'country-world': 'data/countriesWorld.json',
                'country-europe': 'data/countriesEurope.json',
                'category-default': 'data/defaultCategories.json'
            };

            tagGroups = {};

            lazyLoadTagLists = function (tagGroup, array) {
                // cached list does exist
                if (tagGroups.hasOwnProperty(tagGroup)) {
                    return tagGroups[tagGroup];
                }

                // list not cached but resource does exist
                if (tagResources.hasOwnProperty(tagGroup)) {
                    var tagResource = $resource(tagResources[tagGroup], {}, {
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

                console.warn('unknown  tag group:' + tagGroup);
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

            return {
                getKeywordList: getKeywordListFunction,
                getCountryList: getCountryListFunction
            };
        }]
    );
