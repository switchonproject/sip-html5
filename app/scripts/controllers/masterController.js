angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.masterController',
    [
        '$scope',
        '$state',
        'FilterExpressions',
        'FilterExpression',
        'eu.water-switch-on.sip.services.TagGroupService',
        function ($scope, $state, FilterExpressions, FilterExpression, TagGroupService) {
            'use strict';

            $scope.data = {};
            $scope.data.message = 'Welcome to the SWITCH-ON Spatial Information Platform!';
            $scope.data.messageType = 'success';
            $scope.data.selectedObject = -1;
            // FIXME: move to categories directive -----------------------------
            $scope.data.categories = TagGroupService.getKeywordList('keyword-cuashi-toplevel');
            // FIXME: move to categories directive -----------------------------
            $scope.isResultShowing = false;
            $scope.state = $state;

            $scope.filterExpressions = FilterExpressions; // singleton instance
            $scope.geoFilterExpression = new FilterExpression('geo');
            $scope.filterExpressions.addFilterExpression($scope.geoFilterExpression);
            // FIXME: move to categories directive ? -----------------------------
            $scope.categoriesFilterExpression = new FilterExpression('keyword-cuashi', [], true);
            $scope.filterExpressions.addFilterExpression($scope.categoriesFilterExpression);
            // FIXME: move to categories directive ? -----------------------------

            $scope.data.resultSet = null;
            $scope.data.resultObjects = [];

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
        }
    ]
);