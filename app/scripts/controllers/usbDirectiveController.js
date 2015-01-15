angular.module(
        'de.cismet.switchon.sipApp.controllers'
        ).controller(
        'de.cismet.switchon.sipApp.controllers.UsbDirectiveController',
        [
            '$scope',
            'de.cismet.switchon.sipApp.services.SearchService',
            function ($scope, SearchService) {
                'use strict';

                $scope.description = 'Universal Search Box';
                //$scope.info = SearchService.tellMe();

                $scope.submit = function (form)
                {

                    console.log("Search String:"+$scope.universalSearchString);

                    // If form is invalid, return and let AngularJS show validation errors.
                    if (form.$invalid) {
                        $scope.universalSearchString = "not submitted";
                        return;
                    }

                    SearchService.search({query:$scope.universalSearchString},
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
