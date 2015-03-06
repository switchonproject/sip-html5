angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.searchFilterRibbonDirectiveController',
    [
        '$scope',
        'FilterExpression',
        function ($scope, FilterExpression) {
            'use strict';

            var geoFilterExpressions, keywordsCuashiFilterExpressions, textFilterExpressions,
                limitFilterExpressions, offsetFilterExpressions;

            $scope.keywordsFilterExpression = new FilterExpression('keyword', [], true);
            $scope.filterExpressions.addFilterExpression($scope.keywordsFilterExpression);

            $scope.topicFilterExpression = new FilterExpression('topic');
            $scope.filterExpressions.addFilterExpression($scope.topicFilterExpression);

            $scope.fromDateFilterExpression = new FilterExpression('fromDate');
            $scope.filterExpressions.addFilterExpression($scope.fromDateFilterExpression);

            $scope.toDateFilterExpression = new FilterExpression('toDate');
            $scope.filterExpressions.addFilterExpression($scope.toDateFilterExpression);

            $scope.geoIntersectsFilterExpression = new FilterExpression('geo-intersects', 'false');
            $scope.filterExpressions.addFilterExpression($scope.geoIntersectsFilterExpression);

            $scope.geoBufferFilterExpression = new FilterExpression('geo-buffer', null, false, true,
                'templates/geo-buffer-editor-popup.html');
            $scope.filterExpressions.addFilterExpression($scope.geoBufferFilterExpression);

            limitFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType('limit');
            if (limitFilterExpressions && limitFilterExpressions.length > 0) {
                $scope.limitFilterExpression = limitFilterExpressions[0];
            } else {
                console.warn('limit filter expression not correctly initialized!');
                $scope.limitFilterExpression = new FilterExpression('limit', 20, false, true,
                    'templates/limit-editor-popup.html');
                $scope.filterExpressions.addFilterExpression($scope.limitFilterExpression);
            }

            offsetFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType('offset');
            if (offsetFilterExpressions && offsetFilterExpressions.length > 0) {
                $scope.offsetFilterExpression = offsetFilterExpressions[0];
            } else {
                console.warn('offset filter expression not correctly initialized!');
                $scope.offsetFilterExpression = new FilterExpression('offset', 0, false, false);
                $scope.filterExpressions.addFilterExpression($scope.offsetFilterExpression);
            }

            $scope.topicFilterExpression.getDisplayValue = function (value) {
                return (value && value.length > 0) ? value[0] : value;
            };

            $scope.geoIntersectsFilterExpression.getDisplayValue = function (value) {
                return value ? 'intersect' : 'enclose';
            };

            geoFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType('geo');
            if (geoFilterExpressions && geoFilterExpressions.length > 0) {
                $scope.geoFilterExpression = geoFilterExpressions[0];
            } else {
                console.warn('geo filter expression not correctly initialized!');
                $scope.geoFilterExpression = new FilterExpression('geo', null, false, true,
                    'templates/geo-editor-popup.html');
                $scope.geoFilterExpression.getDisplayValue = function (value) {
                    if (value && value.indexOf('(') !== -1) {
                        return value.substring(0, value.indexOf('('));
                    }

                    return 'undefined';
                };
                $scope.filterExpressions.addFilterExpression($scope.geoFilterExpression);
            }

            // FIXME: move to categories directive -----------------------------
            keywordsCuashiFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType('keyword-cuahsi');
            if (keywordsCuashiFilterExpressions && keywordsCuashiFilterExpressions.length > 0) {
                $scope.keywordsCuashiFilterExpression = keywordsCuashiFilterExpressions[0];
            } else {
                //console.warn('keyword-cuahsi filter expression not correctly initialized!');
                $scope.keywordsCuashiFilterExpression = new FilterExpression('keyword-cuahsi', [], true);
                $scope.filterExpressions.addFilterExpression($scope.keywordsCuashiFilterExpression);
            }
            // FIXME: move to categories directive -----------------------------

            textFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType('text');
            if (textFilterExpressions && textFilterExpressions.length > 0) {
                $scope.textFilterExpression = textFilterExpressions[0];
            } else {
                //console.warn('text filter expression not correctly initialized!');
                $scope.textFilterExpression = new FilterExpression('text', null, false, false, null);
                $scope.filterExpressions.addFilterExpression($scope.textFilterExpression);
            }

            $scope.clear = function () {
                $scope.filterExpressions.clear();
            };
        }]
);