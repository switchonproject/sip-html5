angular.module(
        'eu.water-switch-on.sip.controllers'
        ).controller(
        'eu.water-switch-on.sip.controllers.usbDirectiveController',
        [
            '$scope',
            'eu.water-switch-on.sip.services.SearchService',
            'eu.water-switch-on.sip.services.MockService',
            function ($scope, SearchService, MockService) {
                'use strict';

                $scope.pattern = /^(\w+:".+"\s?)+$/;

                $scope.clear = function () {
                    $scope.filterExpressions.universalSearchString = null;
                };

//                var appendFilterExpression = function (filterExpression) {
//
//                    if(this.pattern.test(filterExpression))
//                    {
//                        $scope.filterExpressions.universalSearchString += '';
//                        $scope.filterExpressions.universalSearchString += filterExpression;
//                    }
//                    else
//                    {
//                        console.error('not a valid filter expression: '+filterExpression);
//                    }
//                };

                $scope.performSearch = function (searchForm)
                {
                    // If form is invalid, return and let AngularJS show validation errors.
                    if (searchForm.$invalid) {
                        //$scope.universalSearchString = "not submitted";
                        $scope.notificationFunction({
                            message: 'This filter expression is not valid. Try expression:"parameter", e.g. keyword:"water quality".',
                            type: 'warning'
                        });
                        return;
                    }

                    $scope.notificationFunction({
                        message: 'Search is in progress ....',
                        type: 'info'
                    });


                    $scope.resultSet = MockService.search();
                };

                $scope.performRealSearch = function (searchForm)
                {
                    // If form is invalid, return and let AngularJS show validation errors.
                    if (searchForm.$invalid) {
                        $scope.notificationFunction({
                            message: 'This filter expression is not valid. Try expression:"parameter", e.g. keyword:"water quality".',
                            type: 'warning'
                        });
                        return;
                    }

                    var queryObject;

                    console.log('Search String:' + $scope.filterExpressions.universalSearchString);
                    SearchService.search({
                        //query: $scope.filterExpressions.universalSearchString,
                        limit: 100,
                        offset: 0
                    }, queryObject,
                            function (data)
                            {
                                console.log(angular.toJson(data, true));
                                $scope.resultSet = data;
                            },
                            function (data)
                            {
                                console.error(angular.toJson(data, true));
                            });
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

                    if (!$scope.universalSearchBox.filterExpressionInput.$error.required
                            && $scope.universalSearchBox.filterExpressionInput.$invalid)
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
