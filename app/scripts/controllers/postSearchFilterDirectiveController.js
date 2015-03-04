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
                    var i, j, filterExpression, tagGroup, param;
                    for (i = 0; i < filterTags.length; i++) {
                        tagGroup = filterTags[i];
                        if (tagGroup && tagGroup.value && tagGroup.value.length > 0) {
                            tagGroup = filterTags[i];
                            param = '!' + tagGroup;
                            filterExpression = $scope.filterExpressions.getFilterExpressionsByType(param);
                            if (!filterExpression || filterExpression.length === 0) {
                                filterExpression = new FilterExpression('!' + tagGroup.key, null, true);
                                $scope.filterExpressions.addFilterExpression(filterExpression);
                            }

                            for (j = 0; j < tagGroup.value.length; j++ ) {
                                filterExpression.setArrayValue(tagGroup.value[j]);
                            }
                        }
                    }
                }
            });
        }
    ]
    );
