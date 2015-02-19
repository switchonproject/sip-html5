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
            $scope.data.categories = TagGroupService.getKeywordList('keyword-cuahsi-toplevel');
            // FIXME: move to categories directive -----------------------------
            $scope.isResultShowing = false;
            $scope.state = $state;

            $scope.filterExpressions = FilterExpressions; // singleton instance
            $scope.geoFilterExpression = new FilterExpression('geo');
            $scope.filterExpressions.addFilterExpression($scope.geoFilterExpression);
            // FIXME: move to categories directive ? -----------------------------
            $scope.categoriesFilterExpression = new FilterExpression('keyword-cuahsi', [], true);
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
                modalScope.searchStatus = searchStatus;

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
                $scope.data.searchStatus.max = max;
                $scope.data.searchStatus.type = type;

                // start of search (indeterminate)
                if (max === -1 && type === 'success') {
                    if ($scope.showMessage) {
                        $scope.showMessage('Search for resources is in progress.', 'info');
                    }

                    $scope.data.searchStatus.current = current;

                    // search completed
                } else if (current > 0 && current < max && type === 'success') {

                    //normalise  to 100%
                    $scope.data.searchStatus.current = (current / max * 100);

                } else if (current === max && type === 'success') {
                    if (current > 0) {
                        $scope.data.searchStatus.current = 100;
                        if ($scope.showMessage) {
                            $scope.showMessage('Search completed, ' + current +
                                    (current > 1 ? ' ressources' : ' resource') + ' found in the SWITCH-ON Meta-Data Repository',
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