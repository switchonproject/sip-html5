angular.module(
    'eu.water-switch-on.sip.directives'
).directive('searchFilterTag',
    [
        'FilterExpression',
        function (FilterExpression) {
            'use strict';
            return {
                restrict: 'EA',
                templateUrl: 'templates/search-filter-tag-directive-template.html',
                scope: {
                    tag: '=',
                    highlightNegated: '=?',
                    removeThreshold: '='
                },
                controller: 'eu.water-switch-on.sip.controllers.searchFilterTagDirectiveController',
                link: function (scope) {
                    if (scope.tag.isEditable() && !(scope.tag instanceof FilterExpression.prototype.CollectionTag)) {
                        // the value is saved or reset when the popup is closed
                        scope.$on('tooltip.hide', function () {
                            var phase;
                            //synchronise filter expression value with editor and displayed tag value
                            //if the tag is editable, the template shows data.editorValue instead of
                            //tag.origin.value in order to be able to update displayed tag value in USB 
                            //without th eneed to change the actual value of the filter expression
                            //console.log('synchronising ' + scope.tag.origin.value + ' to ' + scope.data.editorValue);
                            if (scope.tag.origin.value !== scope.data.editorValue) {
                                // check if changes shall be applied. otherwise reset.
                                if (scope.data.applyChangesOnClose) {
                                    scope.tag.origin.value = scope.data.editorValue;
                                } else {
                                    // reset
                                    scope.data.editorValue = scope.tag.origin.value;
                                }

                                //safely apply the new changes
                                phase = scope.$root.$$phase;
                                if (phase !== '$apply' && phase !== '$digest') {
                                    scope.$apply();
                                }
                            }
                        });
                    }
                }
            };
        }
    ]);
