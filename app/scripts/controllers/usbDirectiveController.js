angular.module(
        'de.cismet.switchon.sipApp.controllers'
        ).controller(
        'UsbDirectiveController',
        [
            '$scope',
            'de.cismet.switchon.sipApp.services.SearchService',
            function ($scope, SearchService) {
                'use strict';

                this.egal="controller";
                //$scope.egal="scope";
                this.pattern = /\w+:[^\s]+\s?$/;                
                $scope.description = 'Universal Search Box';
                //$scope.info = SearchService.tellMe();

                this.clear = function () {
                    $scope.universalSearchString = null;
                };

                this.appendFilterExpression = function (filterExpression) {
                    
                    
                    if(this.pattern.test(filterExpression))
                    {
                        $scope.universalSearchString += '';
                        $scope.universalSearchString += filterExpression;
                    }
                    else
                    {
                        console.error('not a valid filter expression: '+filterExpression);
                    }
                };
                
                this.getSearchString = function()
                {
                    return $scope.universalSearchString;
                };
                
                this.setSearchString = function(universalSearchString)
                {
                    $scope.universalSearchString = universalSearchString;
                };

                this.search = function (form)
                {

                   

                    // If form is invalid, return and let AngularJS show validation errors.
                    if (form.$invalid) {
                        //$scope.universalSearchString = "not submitted";
                        console.error("Search String not valid");
                        return;
                    }
                    
                    console.log("Search String:" + $scope.universalSearchString);
                    SearchService.search({query: $scope.universalSearchString},
                    function (data)
                    {
                        console.log(angular.toJson(data, true));
                        $scope.resultSet = data;
                    },
                            function (data)
                            {
                                console.error(angular.toJson(data, true));
                            });

                    $scope.universalSearchString = "submitted";

                };
            }
        ]
        );
