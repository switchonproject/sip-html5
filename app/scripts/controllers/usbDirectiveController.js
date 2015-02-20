angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.usbDirectiveController',
    [
        '$scope',
        'FilterExpression',
        function ($scope, FilterExpression) {
            'use strict';

            var textFilterExpressions, oldValue, newValue;

            $scope.textFilterExpression = null;
            $scope.pattern = /(^[A-Za-z_\-]+):"([\s\S]+)"$/;

            textFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType('text');
            if (textFilterExpressions && textFilterExpressions.length > 0) {
                $scope.textFilterExpression = textFilterExpressions[0];
            } else {
                //console.warn('text filter expression not correctly initialized!');
                $scope.textFilterExpression = new FilterExpression('text', null, false, false, null);
                $scope.filterExpressions.addFilterExpression($scope.textFilterExpression);
            }

            oldValue = $scope.textFilterExpression.value;

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

            // get the Filter Icon
            // FIXME: function could be put into a service
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

            // Show info message when input box ist empty and no filters have been defined. 
            $scope.$watch('universalSearchBox.filterExpressionInput.$error.required', function (newValue, oldValue) {
                if (oldValue === false && newValue === true && $scope.filterExpressions.enumeratedTags.length < 1) {
                    $scope.notificationFunction({
                        message: 'Please define a Filter Expression or enter a query to search for resources in the SIP Meta-Data Repository',
                        type: 'info'
                    });
                }
            });

            // input is invalid according to regex pattern
            // Disabled: User is allowed to enter $whatever that is used for fulltext search! -> text:"$whatever"
//            $scope.$watch('universalSearchBox.filterExpressionInput.$invalid', function () {
//
//                if (!$scope.universalSearchBox.filterExpressionInput.$error.required &&
//                        $scope.universalSearchBox.filterExpressionInput.$invalid) {
//                    $scope.notificationFunction({
//                        message: 'This search filter expression is not valid. Please use expression:"parameter", e.g. keyword:"water quality".',
//                        type: 'warning'
//                    });
//                }
//            });

            $scope.$watch('filterExpressions.list', function () {
                newValue = $scope.textFilterExpression.value;

                //no user input in text box, recreate tags
                if (newValue === oldValue) {
                    $scope.filterExpressions.enumeratedTags = $scope.filterExpressions.enumerateTags();
                } else if (newValue) {
                    var filterExpressionString, param, value, filterExpression, filterExpressions;
                    filterExpressionString = newValue.split($scope.pattern);
                    /** @type {string} */
                    param = filterExpressionString[1];
                    value = filterExpressionString[2];
                    // user entered a valid filter expression
                    if (param && value) {
                        param = param.toLowerCase();
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
                                message: 'Search filter "' + param + '" successfully applied with value "' + value + '".',
                                type: 'success'
                            });
                            // reset when expression successfully parsed 
                            $scope.textFilterExpression.clear();
                        }
                    }
                }
                oldValue = $scope.textFilterExpression.value;
            }, true); // FIXME comparing with angular.equals on filter expressions might be slow
        }
    ]
);
