angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.searchFilterRibbonDirectiveController',
    [
        '$scope',
        'FilterExpression',
        function ($scope, FilterExpression) {
            'use strict';

            var geoFilterExpressions, keywordsCuashiFilterExpression;

            $scope.keywordsFilterExpression = new FilterExpression('keyword', [], true);
            $scope.filterExpressions.addFilterExpression($scope.keywordsFilterExpression);
//            $scope.keywordsCuashiFilterExpression = new FilterExpression('keyword-cuashi', [], true);
//            $scope.filterExpressions.addFilterExpression($scope.keywordsCuashiFilterExpression);
            $scope.topicFilterExpression = new FilterExpression('topic');
            $scope.filterExpressions.addFilterExpression($scope.topicFilterExpression);
            $scope.fromDateFilterExpression = new FilterExpression('fromDate');
            $scope.filterExpressions.addFilterExpression($scope.fromDateFilterExpression);
            $scope.toDateFilterExpression = new FilterExpression('toDate');
            $scope.filterExpressions.addFilterExpression($scope.toDateFilterExpression);
            $scope.geoIntersectsFilterExpression = new FilterExpression('geo-intersects', 'false');
            $scope.filterExpressions.addFilterExpression($scope.geoIntersectsFilterExpression);
            $scope.geoBufferFilterExpression = new FilterExpression('geo-buffer', null);
            $scope.filterExpressions.addFilterExpression($scope.geoBufferFilterExpression);
            $scope.limitFilterExpression = new FilterExpression('limit', 20);
            $scope.filterExpressions.addFilterExpression($scope.limitFilterExpression);

            $scope.topicFilterExpression.getDisplayValue = function () {
                return (this.value && this.value.length > 0) ? this.value[0] : this.value;
            };

            $scope.geoIntersectsFilterExpression.getDisplayValue = function () {
                return this.value ? 'intersect' : 'enclose';
            };

            $scope.geoBufferFilterExpression.getDisplayValue = function () {
                return this.value ? (
                    this.value < 1000 ? this.value + 'm' :
                            this.value / 1000 + 'km'
                ) : '0m';
            };

            geoFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType('geo');
            if (geoFilterExpressions && geoFilterExpressions.length > 0) {
                $scope.geoFilterExpression = geoFilterExpressions[0];
            } else {
                console.warn('geo filter expression not correctly initialized!');
                $scope.geoFilterExpression = new FilterExpression('geo', [], true);
                $scope.filterExpressions.addFilterExpression($scope.geoFilterExpression);
            }

            // FIXME: move to categories directive -----------------------------
            keywordsCuashiFilterExpression = $scope.filterExpressions.getFilterExpressionsByType('keyword-cuashi');
            if (keywordsCuashiFilterExpression && keywordsCuashiFilterExpression.length > 0) {
                $scope.keywordsCuashiFilterExpression = keywordsCuashiFilterExpression[0];
            } else {
                console.warn('keyword-cuashi filter expression not correctly initialized!');
                $scope.keywordsCuashiFilterExpression = new FilterExpression('keyword-cuashi', [], true);
                $scope.filterExpressions.addFilterExpression($scope.keywordsCuashiFilterExpression);
            }
            // FIXME: move to categories directive -----------------------------

            $scope.clear = function () {
                $scope.filterExpressions.clear();
                $scope.filterExpressions.fromDate = null;
                $scope.filterExpressions.toDate = null;
            };
        }]
);