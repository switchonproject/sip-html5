angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.usbDirectiveController',
        [
            '$scope',
            'eu.water-switch-on.sip.services.SearchService',
            function ($scope, SearchService) {
                'use strict';

                $scope.pattern = /^(\w+:".+"\s?)+$/;

                $scope.clear = function () {
                    $scope.filterExpressions.universalSearchString = '';
                    $scope.filterExpressions.fromDate = null;
                    $scope.filterExpressions.toDate = null;
                };

                $scope.performSearch = function (searchForm)
                {
                    // If form is invalid, return and let AngularJS show validation errors.
                    if (searchForm.$invalid) {
                        $scope.notificationFunction({
                            message: 'This filter expression is not valid. Try expression:"parameter", e.g. keyword:"water quality".',
                            type: 'warning'
                        });
                        return;
                    }

                    $scope.resultSet = SearchService.search($scope.filterExpressions.universalSearchString, 100, 0);
                };


                $scope.$watch('universalSearchBox.filterExpressionInput.$error.required', function (newValue, oldValue) {

                    if (oldValue === false && newValue === true)
                    {
                        $scope.notificationFunction({
                            message: 'Please enter a filter expression,  e.g. keyword:"water quality".',
                            type: 'info'
                        });
                    }

                });

                $scope.$watch('universalSearchBox.filterExpressionInput.$invalid', function () {

                    if (!$scope.universalSearchBox.filterExpressionInput.$error.required &&
                            $scope.universalSearchBox.filterExpressionInput.$invalid)
                    {
                        $scope.notificationFunction({
                            message: 'This filter expression is not valid. Try expression:"parameter", e.g. keyword:"water quality".',
                            type: 'warning'
                        });
                    }
                });
            }
        ]
        );
