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
            $scope.isResultShowing = $scope.config.gui.dev;
            $scope.state = $state;

            $scope.filterExpressions = new FilterExpressions();
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

            $scope.postSearchFilterExpressions = new FilterExpressions();
            
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
                    $scope.data.selectedObject = -1;
                }
            });

            $scope.performSearch = function () {
                $scope.data.resultSet = SearchService.search($scope.filterExpressions.universalSearchString,
                    $scope.config.tagFilter.tagGroups, 25, 0, searchProcessCallback);
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
                        $scope.showMessage('Search could not be perfomed: ' + $scope.data.resultSet.$error, 'danger');
                    }

                    if ($scope.progressModal) {
                        $scope.progressModal.close();
                    }
                }
            };
        }
    ]
);