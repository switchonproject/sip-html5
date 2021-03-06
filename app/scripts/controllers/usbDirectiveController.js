angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.usbDirectiveController',
    [
        '$scope',
        'FilterExpression',
        'AppConfig',
        function ($scope, FilterExpression, AppConfig) {
            'use strict';

            var textFilterExpressions, oldTextValue, newTextValue;

            $scope.config = AppConfig.search;
            $scope.pattern = AppConfig.filterExpressionPattern;

            textFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__TEXT);
            if (!textFilterExpressions || textFilterExpressions.length === 0) {
                console.warn('text filter expression not correctly initialized');
                $scope.filterExpressions.addFilterExpression($scope.textFilterExpression);
            }

            oldTextValue = $scope.textFilterExpression.value;

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
                newTextValue = $scope.textFilterExpression.value;

                if (!newTextValue || newTextValue === oldTextValue) {
                    //no user input in text box or text box cleared
                    //-> recreate tags
                    if ($scope.config.combineMultileFilterExpressions === true) {
                        // get combined tags including NOT filters!
                        $scope.filterExpressions.enumeratedTags = $scope.filterExpressions.getTags(false, false, false, true);
                    } else {
                        // enumerate tags including NOT filters!
                        $scope.filterExpressions.enumeratedTags = $scope.filterExpressions.enumerateTags(false, false, false, true);
                    }
                } else if (newTextValue && newTextValue.length > 0) {
                    // text entered in box. try to parse it as filter expression
                    /**
                     * @type FilterExpression
                     */
                    if (FilterExpression.FILTER_EXPRESSION_PATTERNS.test(newTextValue)) {

                        var filterExpression, i, filterExpressionString,
                            filterExpressions, parsedTextValue;

                        parsedTextValue = newTextValue;
                        filterExpressions = newTextValue.split(FilterExpression.FILTER_EXPRESSION_PATTERNS);
                        for (i = 0; i < filterExpressions.length; ++i) {
                            filterExpressionString = filterExpressions[i];
                            filterExpression = $scope.filterExpressions.fromUniversalSearchString(filterExpressionString);
                            if (filterExpression) {
                                parsedTextValue =  parsedTextValue.replace(filterExpressionString, '');
                                parsedTextValue = parsedTextValue.trim();

                                $scope.notificationFunction({
                                    message: 'Search filter "' + filterExpression.getName() + '" successfully applied',
                                    type: 'success'
                                });
                            }
                        }

                        if (parsedTextValue.length > 0) {
                            $scope.textFilterExpression.setStringValue(parsedTextValue);
                        } else {
                            $scope.textFilterExpression.clear();
                        }
                    }
                }
                oldTextValue = $scope.textFilterExpression.value;
            }, true); // FIXME comparing with angular.equals on filter expressions might be slow
        }
    ]
);
