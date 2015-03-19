angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.postSearchFilterDirectiveController',
    [
        '$scope',
        'FilterExpression',
        function ($scope, FilterExpression) {
            'use strict';
            var tempFilterExpressions, tempFilterExpression;

            // this is the USB filter expression that contains all post search filter expressions
            // that have been selected by the user.
            tempFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__POST_SEARCH_FILTERS);
            if (tempFilterExpressions && tempFilterExpressions.length > 0) {
                $scope.postSearchFiltersFilterExpression = tempFilterExpressions[0];
            } else {
                console.warn('post search filters filter expression not correctly initialized!');
                $scope.postSearchFiltersFilterExpression = new FilterExpression(FilterExpression.FILTER__POST_SEARCH_FILTERS,
                    [], true, true, null, 'POST FILTERS', 'POST FILTERS', 'POST FILTERS');
                $scope.postSearchFiltersFilterExpression.getDisplayValue = function (value) {
                    this.displayValue = value;
                    return '';
                };
                $scope.filterExpressions.addFilterExpression($scope.postSearchFiltersFilterExpression);
            }

            // create default negated filter expressions that can be populated by post filter expressions
            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__ACCESS_CONDITION),
                [], true, true, null, 'Access Condition (Excluded)');
            $scope.filterExpressions.addFilterExpression(tempFilterExpression);

            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__FUNCTION),
                [], true, true, null, 'Access Function (Excluded)');
            $scope.filterExpressions.addFilterExpression(tempFilterExpression);

            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__PROTOCOL),
                [], true, true, null, 'Access Protocol (Excluded)');
            $scope.filterExpressions.addFilterExpression(tempFilterExpression);

            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__KEYWORD_CUAHSI),
                [], true, true, null, 'CUAHSI Keyword (Excluded)');
            $scope.filterExpressions.addFilterExpression(tempFilterExpression);

            // those are the actual search-result-dependent post filter expressions 
            // that can be selected by the user. 
            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__ACCESS_CONDITION),
                [], true, true, null, 'Access Conditions');
            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);

            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__FUNCTION),
                [], true, true, null, 'Access Functions');
            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);

            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__PROTOCOL),
                [], true, true, null, 'Access Protocols');
            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);

            tempFilterExpression = new FilterExpression(('!' + FilterExpression.FILTER__KEYWORD_CUAHSI),
                [], true, true, null, 'CUAHSI Keywords');
            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);

//            tempFilterExpression = new FilterExpression(('!'+FilterExpression.FILTER__KEYWORD), 
//                [], true, true, null, 'Keywords');
//            $scope.postSearchFilterExpressions.addFilterExpression(tempFilterExpression);

            /**
             * This is the function that is called when the user clicks on the
             * X icon of the tag. In contrast to ordinary search filter tags which
             * are simply removved from thier parent filter expression by calling 
             * the tag.remove() function, the custom performRemove that is applied
             * to post search filter tags initiates a new search wherby the removed
             * post search filter tag is excluded from the search result by adding it
             * as negated search parameter to the universal search string.
             * 
             */
            this.performRemove = function (tag) {
                if (tag) {
                    var filterExpressions, filterExpression, filterExpressionString,
                        offsetFilterExpressions, offsetFilterExpression;
                    filterExpressionString = tag.getFilterExpressionString();
                    //$scope.postSearchFiltersFilterExpression.setArrayValue(filterExpressionString);

                    filterExpressions = $scope.filterExpressions.getFilterExpressionsByType(tag.getType());
                    if (!filterExpressions || filterExpressions.length === 0) {
                        filterExpression = new FilterExpression(tag.getType(), null, true);
                        $scope.filterExpressions.addFilterExpression(filterExpression);
                    } else {
                        filterExpression = filterExpressions[0];
                    }
                    filterExpression.setArrayValue(tag.getValue());

                    // reset offset!
                    offsetFilterExpressions = $scope.filterExpressions.getFilterExpressionsByType(FilterExpression.FILTER__OPTION_OFFSET);
                    if (offsetFilterExpressions && offsetFilterExpressions.length > 0) {
                        offsetFilterExpression = offsetFilterExpressions[0];
                        offsetFilterExpression.value = 0;
                    }

                    tag.remove();
                    // manually update the tag list
                    tag.origin.enumeratedTags = tag.origin.enumerateTags(true);
                    $scope.getPerformSearch()();
                }
            };

            // create the tag list
            $scope.$watch('filterTags', function (filterTags, o) {
                if (filterTags && filterTags !== o && filterTags.length > 0) {
                    $scope.postSearchFilterExpressions.clear();
                    var i, filterExpression, filterExpressions, tagGroup, param;
                    for (i = 0; i < filterTags.length; i++) {
                        tagGroup = filterTags[i];
                        if (tagGroup && tagGroup.value && tagGroup.value.length > 0) {
                            tagGroup = filterTags[i];
                            param = '!' + tagGroup.key;
                            filterExpressions = $scope.postSearchFilterExpressions.getFilterExpressionsByType(param);
                            if (!filterExpressions || filterExpressions.length === 0) {
                                filterExpression = new FilterExpression(param, null, true);
                                $scope.postSearchFilterExpressions.addFilterExpression(filterExpression);
                            } else {
                                filterExpression = filterExpressions[0];
                            }

                            filterExpression.value = tagGroup.value;
                            // enumerate tags as post filter tags explicitely!
                            filterExpression.enumeratedTags = filterExpression.enumerateTags(true);
                        }
                    }
                }
            });
        }
    ]
    );
