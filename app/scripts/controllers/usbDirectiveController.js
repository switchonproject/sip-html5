angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.usbDirectiveController',
    [
        '$scope',
        'FilterExpression',
        function ($scope, FilterExpression) {
            'use strict';

            $scope.customFilterExpression = '';
            $scope.pattern = /(^[A-Za-z_\-]+):"([\s\S]+)"$/;

// currently not needed, clear button disabled
//            $scope.clear = function () {
//                $scope.filterExpressions.clear();
//            };

            // Styling of Search Filters.. into CSS but how?
            $scope.getTagIcon = function (type) {
                switch (type) {
                case FilterExpression.FILTER__KEYWORD:
                    return 'glyphicon glyphicon-tags';
                case FilterExpression.FILTER__KEYWORD_CUAHSI:
                    return 'glyphicon glyphicon-copyright-mark';
                case FilterExpression.FILTER__TOPIC:
                    return 'glyphicon glyphicon-tag';
                case FilterExpression.FILTER__GEO:
                    return 'glyphicon glyphicon-globe';
                case FilterExpression.FILTER__DATE_START:
                    return 'glyphicon glyphicon-chevron-left';
                case FilterExpression.FILTER__DATE_END:
                    return 'glyphicon glyphicon-chevron-right';
                case FilterExpression.FILTER__TEXT:
                    return 'glyphicon glyphicon-pencil';
                case FilterExpression.FILTER__GEO_INTERSECTS:
                    return 'glyphicon glyphicon-log-out';
                case FilterExpression.FILTER__GEO_BUFFER:
                    return 'glyphicon glyphicon-record';
                case FilterExpression.FILTER__OPTION_LIMIT:
                    return 'glyphicon glyphicon-indent-right';
                case FilterExpression.FILTER__CATEGORY:
                    return 'glyphicon glyphicon-bookmark';
                default:
                    return 'glyphicon glyphicon-flash';
                }
            };

            $scope.getTagStyle = function (type, forCloseIcon) {
                var prefix;
                prefix = (forCloseIcon === true) ? 'switchon-close-icon-' : '';

                switch (type) {
                case FilterExpression.FILTER__KEYWORD:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__KEYWORD_CUAHSI:
                    return prefix + 'label-info';
                case FilterExpression.FILTER__TOPIC:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__GEO:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__DATE_START:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__DATE_END:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__TEXT:
                    return prefix + 'label-info';
                case FilterExpression.FILTER__GEO_INTERSECTS:
                    return prefix + 'label-warning';
                case FilterExpression.FILTER__GEO_BUFFER:
                    return prefix + 'label-warning';
                case FilterExpression.FILTER__OPTION_LIMIT:
                    return prefix + 'label-warning';
                case FilterExpression.FILTER__CATEGORY:
                    return prefix + 'label-success';
                default:
                    return prefix + 'label-default';
                }
            };



            // input box ist empty. Show default message. 
            // disabled since clearing the box after parsing triggers this message
//            $scope.$watch('universalSearchBox.filterExpressionInput.$error.required', function (newValue, oldValue) {
//
//                if (oldValue === false && newValue === true) {
//                    $scope.notificationFunction({
//                        message: 'Please enter a filter expression,  e.g. keyword:"water quality"',
//                        type: 'info'
//                    });
//                }
//            });

            // input is invalid according to regex pattern
            $scope.$watch('universalSearchBox.filterExpressionInput.$invalid', function () {

                if (!$scope.universalSearchBox.filterExpressionInput.$error.required &&
                        $scope.universalSearchBox.filterExpressionInput.$invalid) {
                    $scope.notificationFunction({
                        message: 'This search filter expression is not valid. Please use expression:"parameter", e.g. keyword:"water quality".',
                        type: 'warning'
                    });
                }
            });

            // FIXME comparing with angular.equals on filter expressions might be slow
            $scope.$watch('filterExpressions.list', function () {
                $scope.filterExpressions.enumeratedTags = $scope.filterExpressions.enumerateTags();
            }, true);

            $scope.$watch('customFilterExpression', function (newExpression) {
                if (newExpression) {
                    var filterExpressionString, param, value, filterExpression, filterExpressions;
                    filterExpressionString = newExpression.split($scope.pattern);
                    param = filterExpressionString[1];
                    value = filterExpressionString[2];
                    if (param && value) {
                        if (FilterExpression.FILTERS.indexOf(param) === -1) {
                            $scope.notificationFunction({
                                message: 'The search filter "' + param + '" is unknown. The search may deliver unexpected results.',
                                type: 'info'
                            });
                        }

                        filterExpressions = $scope.filterExpressions.getFilterExpressionsByType(param);
                        if (!filterExpressions || filterExpressions.length < 1) {
                            filterExpression = new FilterExpression(param);
                            filterExpression.value = value;
                            filterExpression.displayValue = value;
                            // triggers update
                            $scope.filterExpressions.addFilterExpression(filterExpression);
                        } else {
                            // should trigger update when comparing with angular.equals
                            // we pick the 1st array element.
                            // FIXME: what if there are multiple FE with the same param?
                            filterExpression = filterExpressions[0];
                            if (filterExpression.isMultiple()) {
                                filterExpression.setArrayValue(value);
                                // no display value for arrays!
                            } else {
                                filterExpression.value = value;
                                filterExpression.displayValue = value;
                            }

                            $scope.notificationFunction({
                                message: 'Search filter "' + param + '" successfully applied.',
                                type: 'success'
                            });
                        }
                    } else {
                        $scope.notificationFunction({
                            message: 'The search filter expression "' + newExpression + '" entered is not valid. Try expression:"parameter", e.g. keyword:"water quality"',
                            type: 'warning'
                        });
                    }
                    // reset when expression parsed
                    $scope.customFilterExpression = '';
                } // else: ignore
            });
        }
    ]
);
