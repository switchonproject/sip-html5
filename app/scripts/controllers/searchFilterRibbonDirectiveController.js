angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.searchFilterRibbonDirectiveController',
    [
        '$scope',
        'FilterExpression',
        'AppConfig',
        function ($scope, FilterExpression, AppConfig) {
            'use strict';

            var geoFilterExpressions, textFilterExpressions, topicFilterExpressions,
                limitFilterExpressions, offsetFilterExpressions;

            $scope.config = AppConfig.search;

            $scope.keywordsFilterExpression = new FilterExpression(FilterExpression.FILTER__KEYWORD,
                [], true, true, null, 'Keywords', 'Free Keywords');
            $scope.filterExpressions.addFilterExpression($scope.keywordsFilterExpression);

            $scope.keywordsCuashiFilterExpression = new FilterExpression(FilterExpression.FILTER__KEYWORD_CUAHSI,
                    [], true, true, 'templates/filter-expression-editor-popup.html', 'CUAHSI Keyword', 'CUAHSI Keyword');
            $scope.filterExpressions.addFilterExpression($scope.keywordsCuashiFilterExpression);

            $scope.topicFilterExpression = new FilterExpression(FilterExpression.FILTER__TOPIC,
                null, false, true, null, 'Topic Categories', 'INSPIRE Topic Categories');
            $scope.filterExpressions.addFilterExpression($scope.topicFilterExpression);

            $scope.fromDateFilterExpression = new FilterExpression(FilterExpression.FILTER__DATE_START,
                null, false, true, null, 'Start Date', 'Start Date');
            $scope.filterExpressions.addFilterExpression($scope.fromDateFilterExpression);

            $scope.toDateFilterExpression = new FilterExpression(FilterExpression.FILTER__DATE_END,
                null, false, true, null, 'End Date', 'End Date');
            $scope.filterExpressions.addFilterExpression($scope.toDateFilterExpression);

            $scope.geoIntersectsFilterExpression = new FilterExpression(FilterExpression.FILTER__GEO_INTERSECTS,
                'false', false, true, null, 'Geo Intersection', 'Geo Intersection');
            $scope.filterExpressions.addFilterExpression($scope.geoIntersectsFilterExpression);

            $scope.geoBufferFilterExpression = new FilterExpression(FilterExpression.FILTER__GEO_BUFFER,
                null, false, true, 'templates/geo-buffer-editor-popup.html', 'Geo Buffer', 'Geo Buffer');
            $scope.filterExpressions.addFilterExpression($scope.geoBufferFilterExpression);

            limitFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__OPTION_LIMIT);
            if (limitFilterExpressions && limitFilterExpressions.length > 0) {
                $scope.limitFilterExpression = limitFilterExpressions[0];
            } else {
                // must be initialized in master controller
                throw 'limit filter expression not correctly initialized!';
            }

            offsetFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__OPTION_OFFSET);
            if (offsetFilterExpressions && offsetFilterExpressions.length > 0) {
                $scope.offsetFilterExpression = offsetFilterExpressions[0];
            } else {
                // must be initialized in master controller
                throw 'offset filter expression not correctly initialized!';
            }

            geoFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__GEO);
            if (geoFilterExpressions && geoFilterExpressions.length > 0) {
                $scope.geoFilterExpression = geoFilterExpressions[0];
            } else {
                // must be initialized in master controller
                throw 'geo filter expression not correctly initialized!';
            }

            textFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__TEXT);
            if (textFilterExpressions && textFilterExpressions.length > 0) {
                $scope.textFilterExpression = textFilterExpressions[0];
            } else {
                // must be initialized in master controller
                throw 'text filter expression not correctly initialized!';
            }

            topicFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__TOPIC);
            if (topicFilterExpressions && topicFilterExpressions.length > 0) {
                $scope.topicFilterExpression = topicFilterExpressions[0];
            } else {
                // must be initialized in master controller
                throw 'topic category filter expression not correctly initialized!';
            }

            $scope.geoIntersectsFilterExpression.getDisplayValue = function (value) {
                return value ? 'intersect' : 'enclose';
            };

            $scope.clear = function () {
                $scope.filterExpressions.clear();
            };
        }]
);