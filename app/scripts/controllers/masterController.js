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
            shareService
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
            $scope.isResultShowing = $scope.config.gui.dev;
            $scope.state = $state;

            // -----------------------------------------------------------------

            $scope.filterExpressions = new FilterExpressions();

            // define shared filter expressions that are used in several directives
            // GEO Filter
            $scope.geoFilterExpression = new FilterExpression(FilterExpression.FILTER__GEO, null, false, true,
                'templates/geo-editor-popup.html', 'Geography');
            $scope.geoFilterExpression.getDisplayValue = function (value) {
                if (value && value.indexOf('(') !== -1) {
                    return value.substring(0, value.indexOf('('));
                }

                return 'undefined';
            };
            $scope.filterExpressions.addFilterExpression($scope.geoFilterExpression);

            // LIMIT Filter
            $scope.limitFilterExpression = new FilterExpression(FilterExpression.FILTER__OPTION_LIMIT,
                $scope.config.searchService.defautLimit, false, true,
                'templates/limit-editor-popup.html');
            $scope.filterExpressions.addFilterExpression($scope.limitFilterExpression);

            // OFFSET Filter (not visible)
            $scope.offsetFilterExpression = new FilterExpression(FilterExpression.FILTER__OPTION_OFFSET,
                0, false, false);
            $scope.filterExpressions.addFilterExpression($scope.limitFilterExpression);

            // combined POST Search Filters
            $scope.postSearchFiltersFilterExpression = new FilterExpression(FilterExpression.FILTER__POST_SEARCH_FILTERS,
                [], true, true,
                null, 'Post Filters');
            $scope.postSearchFiltersFilterExpression.getDisplayValue = function (value) {
                this.displayValue = value;
                return '';
            };
            $scope.filterExpressions.addFilterExpression($scope.postSearchFiltersFilterExpression);

            $scope.offsetFilterExpression = new FilterExpression(FilterExpression.FILTER__OPTION_OFFSET, 0, false, false);
            $scope.filterExpressions.addFilterExpression($scope.offsetFilterExpression);

            // FIXME: move to categories directive ? -----------------------------
            $scope.categoriesFilterExpression = new FilterExpression(FilterExpression.FILTER__COLLECTION,
                    null, false, true, null, 'Categories');
            $scope.filterExpressions.addFilterExpression($scope.categoriesFilterExpression);
            // FIXME: move to categories directive ? -----------------------------

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
                    $scope.data.selectedObject = -1;

                    shareService.setResourceObjects(objs);
                }
            });

            $scope.performSearch = function (postFilterSearchString) {
                var universalSearchString, limit, offset;
                universalSearchString = $scope.filterExpressions.universalSearchString;
                limit = $scope.limitFilterExpression.value || $scope.config.searchService.defautLimit;
                offset = $scope.offsetFilterExpression.value || 0;

                if (postFilterSearchString && postFilterSearchString.length > 0) {
                    universalSearchString += (' ' + postFilterSearchString);
                }

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
                        $scope.data.message = 'Search for resources is in progress';
                        $scope.data.messageType = 'success';
                        $scope.data.searchStatus.message = $scope.data.message;
                    } else {
                        $scope.data.message = 'Search takes longer than 10 seconds, please wait.';
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
                        $scope.data.message = 'Search completed, ' + current +
                                    (current > 1 ? ' resources' : ' resource') + ' found in the SWITCH-ON Meta-Data Repository';
                        $scope.data.messageType = 'success';
                        $scope.data.searchStatus.message = $scope.data.message;
                    } else {
                        // feature request #59
                        $scope.data.searchStatus.current = 200;
                        $scope.data.message = 'Search completed, but no matching resources found in the SWITCH-ON Meta-Data Repository';
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