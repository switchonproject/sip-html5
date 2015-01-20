angular.module(
        'de.cismet.switchon.sipApp.controllers'
        ).controller(
        'UsbDirectiveController',
        [
            '$scope',
            'de.cismet.switchon.sipApp.services.SearchService',
            function ($scope, SearchService) {
                'use strict';
                
                $scope.pattern = /^(\w+:".+"\s?)+$/;     

                $scope.clear = function () {
                    $scope.filterExpressions.universalSearchString = null;
                };

                var appendFilterExpression = function (filterExpression) {
                    
                    
                    if(this.pattern.test(filterExpression))
                    {
                        $scope.filterExpressions.universalSearchString += '';
                        $scope.filterExpressions.universalSearchString += filterExpression;
                    }
                    else
                    {
                        console.error('not a valid filter expression: '+filterExpression);
                    }
                };
                
                $scope.search = function (form)
                {
                    // If form is invalid, return and let AngularJS show validation errors.
                    if (form.$invalid) {
                        //$scope.universalSearchString = "not submitted";
                        console.error("Search String not valid");
                        return;
                    }
                    
                    console.log("Search String:" + $scope.filterExpressions.universalSearchString);
                    SearchService.search({query: $scope.filterExpressions.universalSearchString},
                    function (data)
                    {
                        console.log(angular.toJson(data, true));
                        $scope.resultSet = data;
                    },
                            function (data)
                            {
                                console.error(angular.toJson(data, true));
                            });

                    //$scope.universalSearchString = "submitted";
                };
            }
        ]
        );
