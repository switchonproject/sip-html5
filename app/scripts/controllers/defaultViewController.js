angular.module(
        'de.cismet.switchon.sipApp.controllers'
        ).controller(
        'DefaultViewController',
        [
            '$scope',
            'SearchService',
            'MockService',
            function ($scope, SearchService, MockService) {
                'use strict';

                //$scope.filterExpressions = {universalSearchString:'text:"undefined"'};     
                $scope.filterExpressions = {universalSearchString: 'text:"anytext"'};

                //var queryObject = {'list': [{'key': 'LeuchteEnabled', 'value': 'true'}, {'key': 'GeometryFromWkt', 'value': 'POLYGON ((2582375.3331009173 5681538.290594944, 2582494.6975608254 5681538.290594944, 2582494.6975608254 5681583.652933975, 2582375.3331009173 5681583.652933975, 2582375.3331009173 5681538.290594944))'}]};

                $scope.performSearch = function (searchForm)
                {
                    $scope.resultSet = MockService.search();
                };



                $scope.performRealSearch = function (searchForm)
                {
                    // If form is invalid, return and let AngularJS show validation errors.
                    if (searchForm.$invalid) {
                        //$scope.universalSearchString = "not submitted";
                        console.error("Search String not valid");
                        return;
                    }

                    console.log("Search String:" + $scope.filterExpressions.universalSearchString);
                    SearchService.search({
                        //query: $scope.filterExpressions.universalSearchString,
                        limit: 100,
                        offset: 0
                    }, queryObject,
                            //success function
                                    function (data)
                                    {
                                        console.log(angular.toJson(data, true));
                                        $scope.resultSet = data;
                                    },
                                    //error function
                                            function (data)
                                            {
                                                console.error(angular.toJson(data, true));
                                            });

                                    //$scope.universalSearchString = "submitted";
                                };
                    }

        ]
                );
