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

            var geoFilterExpressions, keywordsCuashiFilterExpressions, textFilterExpressions,
                limitFilterExpressions, offsetFilterExpressions;

            $scope.config = AppConfig.search;
            
            $scope.keywordsFilterExpression = new FilterExpression(FilterExpression.FILTER__KEYWORD,
                [], true, true, null, 'Keyword', 'Keyword');
            $scope.filterExpressions.addFilterExpression($scope.keywordsFilterExpression);

            $scope.topicFilterExpression = new FilterExpression(FilterExpression.FILTER__TOPIC,
                null, false, true, null, 'Topic Category', 'Topic Category');
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
                //console.warn('limit filter expression not correctly initialized!');
                $scope.limitFilterExpression = new FilterExpression(FilterExpression.FILTER__OPTION_LIMIT,
                    20, false, true, 'templates/limit-editor-popup.html', 'Results Limit', 'Results Limit');
                $scope.filterExpressions.addFilterExpression($scope.limitFilterExpression);
            }

            offsetFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__OPTION_OFFSET);
            if (offsetFilterExpressions && offsetFilterExpressions.length > 0) {
                $scope.offsetFilterExpression = offsetFilterExpressions[0];
            } else {
                //console.warn('offset filter expression not correctly initialized!');
                $scope.offsetFilterExpression = new FilterExpression(FilterExpression.FILTER__OPTION_OFFSET,
                    0, false, false, null, 'Results Offset', 'Results Offset');
                $scope.filterExpressions.addFilterExpression($scope.offsetFilterExpression);
            }

            $scope.topicFilterExpression.getDisplayValue = function (value) {
                return (value && value.length > 0) ? value[0] : value;
            };

            $scope.geoIntersectsFilterExpression.getDisplayValue = function (value) {
                return value ? 'intersect' : 'enclose';
            };

            geoFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__GEO);
            if (geoFilterExpressions && geoFilterExpressions.length > 0) {
                $scope.geoFilterExpression = geoFilterExpressions[0];
            } else {
                //console.warn('geo filter expression not correctly initialized!');
                $scope.geoFilterExpression = new FilterExpression(FilterExpression.FILTER__GEO, null, false, true,
                    'templates/geo-editor-popup.html', 'Geospatial Extent', 'Geospatial Extent');
                $scope.geoFilterExpression.getDisplayValue = function (value) {
                    if (value && value.indexOf('(') !== -1) {
                        return value.substring(0, value.indexOf('('));
                    }

                    return 'undefined';
                };
                $scope.filterExpressions.addFilterExpression($scope.geoFilterExpression);
            }

            // FIXME: move to categories directive -----------------------------
            keywordsCuashiFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__KEYWORD_CUAHSI);
            if (keywordsCuashiFilterExpressions && keywordsCuashiFilterExpressions.length > 0) {
                $scope.keywordsCuashiFilterExpression = keywordsCuashiFilterExpressions[0];
            } else {
                //console.warn('keyword-cuahsi filter expression not correctly initialized!');
                $scope.keywordsCuashiFilterExpression = new FilterExpression(FilterExpression.FILTER__KEYWORD_CUAHSI, 
                    [], true, true, 'templates/filter-expression-editor-popup.html', 'CUAHSI Keyword', 'CUAHSI Keyword');
                $scope.filterExpressions.addFilterExpression($scope.keywordsCuashiFilterExpression);
            }
            // FIXME: move to categories directive -----------------------------

            textFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__TEXT);
            if (textFilterExpressions && textFilterExpressions.length > 0) {
                $scope.textFilterExpression = textFilterExpressions[0];
            } else {
                //console.warn('text filter expression not correctly initialized!');
                $scope.textFilterExpression = new FilterExpression(FilterExpression.FILTER__TEXT, 
                    null, false, false, null, 'Fulltext', 'Fulltext');
                $scope.filterExpressions.addFilterExpression($scope.textFilterExpression);
            }

            $scope.clear = function () {
                $scope.filterExpressions.clear();
            };
        }]
);