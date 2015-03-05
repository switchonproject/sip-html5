angular.module(
    'eu.water-switch-on.sip.controllers'
    ).controller(
    'eu.water-switch-on.sip.controllers.postSearchFilterDirectiveController',
    [
        '$scope',
        'FilterExpression',
        function ($scope, FilterExpression) {
            'use strict';

            $scope.$watch('filterTags', function (filterTags, o) {
                if (filterTags && filterTags !== o && filterTags.length > 0) {
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
