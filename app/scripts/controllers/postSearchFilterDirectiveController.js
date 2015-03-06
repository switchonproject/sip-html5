angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.postSearchFilterDirectiveController',
    [
        '$scope',
        'FilterExpression',
        function ($scope, FilterExpression) {
            'use strict';

            /**
             * This is the function that is called ehen the user clisk on the
             * X icon of the tag. In contrast to ordinary search filter tags which
             * are simply removved from thier parent filter expression by alling 
             * the tag.remove() function, the custom performRemove that is applied
             * to post search filter tags initiates a new search wherby the removed
             * post search filter tag is excluded from the search result by adding it
             * as negated search parameter to the universal search string.
             * 
             */
            this.performRemove = function (tag) {
                if (tag) {
                    var filterExpressionString;
                    filterExpressionString = tag.getFilterExpressionString();
                    // YES, this is really required as the operation was passed
                    // to the isolated scope with "&"! %o(
                    $scope.performSearch({postFilterSearchString: filterExpressionString});
                    // FIXME: avoid scope soup!
                    // see http://www.technofattie.com/2014/03/21/five-guidelines-for-avoiding-scope-soup-in-angular.html
                }
            };

            $scope.$watch('filterTags', function (filterTags, o) {
                if (filterTags && filterTags !== o && filterTags.length > 0) {
                    $scope.postSearchFilterExpressions.clear();
                    var i, j, filterExpression, filterExpressions, tagGroup, param;
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

                            for (j = 0; j < tagGroup.value.length; j++ ) {
                                filterExpression.setArrayValue(tagGroup.value[j]);
                                filterExpression.enumeratedTags = filterExpression.enumerateTags();
                            }
                        }
                    }
                    $scope.postSearchFilterExpressions.enumerateTags(false, false, false, true);
                }
            });
        }
    ]
    );
