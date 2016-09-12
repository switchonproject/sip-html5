angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.masterController',
        [
            '$scope',
            '$rootScope',
            '$modal',
            '$cookies',
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
                    $cookies,
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
                            // 
                            // doesn't work anymore?!
                            // 
//                        setTimeout(function () {
//                            $scope.progressModal.close();
//                        }, 100);

                            $scope.progressModal.close();
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

                if (!$cookies.hideByodWelcomeMessage ||
                        $cookies.hideByodWelcomeMessage === 'false') {
                    var welcomeInstance = $modal.open({
                        templateUrl: 'templates/welcome-message.html',
                        size: 'md',
                        backdrop: 'static',
                        controller: 'welcomeMessageController'
                    });

                    welcomeInstance.result.then(function (hideWelcomeMessage) {
                        $cookies.hideByodWelcomeMessage = hideWelcomeMessage;
                    });
                }
            }
        ]
        );