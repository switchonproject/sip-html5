angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.masterController',
    [
        '$scope',
        '$state',
        'FilterExpressions',
        'FilterExpression',
        function ($scope, $state, FilterExpressions, FilterExpression) {
            'use strict';

            $scope.data = {};
            $scope.data.message = 'Application loaded';
            $scope.data.messageType = 'success';

            $scope.isResultShowing = false;
            $scope.state = $state;
            $scope.filterExpressions = FilterExpressions; // singleton instance
            $scope.filterExpressions.addFilterExpression('keyword', new FilterExpression('keyword',[], true));
            $scope.filterExpressions.addFilterExpression('topic', new FilterExpression('topic'));
            $scope.filterExpressions.addFilterExpression('fromDate', new FilterExpression('fromDate'));
            $scope.filterExpressions.addFilterExpression('toDate', new FilterExpression('toDate'));
            $scope.filterExpressions.addFilterExpression('geo', new FilterExpression('geo'));
            $scope.filterExpressions.addFilterExpression('geoIntersects', new FilterExpression('geo-intersects', 'false'));
            $scope.filterExpressions.addFilterExpression('geoBuffer', new FilterExpression('geo-buffer'));
            $scope.filterExpressions.addFilterExpression('limit', new FilterExpression('limit', 20));

            $scope.data.resultSet = null;
            $scope.data.resultObjects = [];

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
                }
            });
        }
    ]
);