angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.usbDirectiveController',
    [
        '$scope',
        '$rootScope',
        '$modal',
        'eu.water-switch-on.sip.services.SearchService',
        function ($scope, $rootScope, $modal, SearchService) {
            'use strict';

            var processCallback, status;

            status = {
                current: 0,
                max: 0,
                type: null
            };

            $scope.status = status;

            processCallback = function (current, max, type) {
                status.max = max;
                status.type = type;

                // start of search (indeterminate)
                if (max === -1 && type === 'success') {
                    if ($scope.notificationFunction) {
                        $scope.notificationFunction({
                            message: 'Search started',
                            type: 'info'
                        });
                    }

                    status.current = current;

                    // search completed
                } else if (current > 0 && current < max && type === 'success') {

                    //normalise  to 100%
                    status.current = (current / max * 100);

                } else if (current === max && type === 'success') {


                    if (current > 0) {
                        status.current = 100;
                        if ($scope.notificationFunction) {
                            $scope.notificationFunction({
                                message: 'Search completed, ' + current + ' results found',
                                type: 'success'
                            });
                        }
                    } else {
                        status.current = 0;
                        if ($scope.notificationFunction) {
                            $scope.notificationFunction({
                                message: 'Search completed, but no results found',
                                type: 'warning'
                            });
                        }
                    }

                    if ($scope.progressModal) {
                        $scope.progressModal.close();
                    }
                    // search error   
                } else if (type === 'error') {
                    if ($scope.notificationFunction) {
                        $scope.notificationFunction({
                            message: 'Search could not be perfomed: ' + $scope.resultSet.$error,
                            type: 'danger'
                        });
                    }

                    if ($scope.progressModal) {
                        $scope.progressModal.close();
                    }
                }

            };

            $scope.pattern = /(^[A-Za-z_\-]+:"[\s\S]+"+\s?$)+/;

            $scope.clear = function () {
                $scope.filterExpressions.clear();
            };

            $scope.performSearch = function (searchForm) {
                // If form is invalid, return and let AngularJS show validation errors.
                if (searchForm.$invalid) {
                    $scope.notificationFunction({
                        message: 'This filter expression is not valid. Try expression:"parameter", e.g. keyword:"water quality".',
                        type: 'warning'
                    });
                    return;
                }

                $scope.resultSet = SearchService.search($scope.filterExpressions.universalSearchString, 25, 0, processCallback);
                
                $scope.showProgress(status);
            };

            $scope.showProgress = function (status) {
                var modalScope;

                modalScope = $rootScope.$new(true);
                modalScope.status = status;

                $scope.progressModal = $modal.open({
                    templateUrl: 'templates/search-progress-modal-template.html',
                    scope: modalScope,
                    size: 'lg',
                    backdrop: 'static'
                });
                // issue #32 - check if the eror occurred before the dialog has actually been shown
                $scope.progressModal.opened.then(function () {
                    if (status.type === 'error') {
                        $scope.progressModal.close();
                    }
                });
            };

            $scope.$watch('universalSearchBox.filterExpressionInput.$error.required', function (newValue, oldValue) {

                if (oldValue === false && newValue === true) {
                    $scope.notificationFunction({
                        message: 'Please enter a filter expression,  e.g. keyword:"water quality".',
                        type: 'info'
                    });
                }

            });

            $scope.$watch('universalSearchBox.filterExpressionInput.$invalid', function () {

                if (!$scope.universalSearchBox.filterExpressionInput.$error.required &&
                    $scope.universalSearchBox.filterExpressionInput.$invalid) {
                    $scope.notificationFunction({
                        message: 'This filter expression is not valid. Try expression:"parameter", e.g. keyword:"water quality".',
                        type: 'warning'
                    });
                }
            });
        }
    ]
    );
