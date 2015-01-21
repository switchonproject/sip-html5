angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.masterController',
    [
        '$scope',
        '$state',
        'eu.water-switch-on.sip.services.SearchService',
        'eu.water-switch-on.sip.services.MockService',
        function ($scope, $state, SearchService, MockService) {
            'use strict';

            $scope.data = {};
            $scope.data.message = 'Application loaded';
            $scope.data.messageType = 'success';
            $scope.data.resources = [];
            $scope.data.query = null;

            $scope.isResultShowing = false;
            $scope.state = $state;
            
            $scope.filterExpressions = {universalSearchString: 'text:"anytext"'};
            $scope.resultSet = null;

            $scope.activateView = function (state) {
                $scope.showMessage(state + ' view showing', 'success');
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
        }
    ]
);