angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.searchFilterTagDirectiveController',
    [
        '$scope',
        'FilterExpression',
        function ($scope, FilterExpression) {
            'use strict';

            if ($scope.tag.origin.isEditable()) {
                $scope.data = {};
                $scope.data.editorValue = $scope.tag.origin.value;
            }

            // Styling of Search Filters.. into CSS but how?
            /**
             * Return the icon associated with a specific filter expression.
             * 
             * @param {type} type the type (parameter) of the filter expression
             * @returns {String}
             */
            $scope.getTagIcon = function (type) {
                var plainType;
                // negated filters!
                plainType = type.substr(type.indexOf('!')+1);
                switch (plainType) {
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
                case FilterExpression.FILTER__POST_SEARCH_FILTERS:
                    return 'glyphicon glyphicon-warning-sign';
                case FilterExpression.FILTER__ACCESS_CONDITION:
                    return 'glyphicon glyphicon-euro';
                case FilterExpression.FILTER__FUNCTION:
                    return 'glyphicon glyphicon-floppy-save';
                case FilterExpression.FILTER__COLLECTION:
                    return 'glyphicon glyphicon-bookmark';
                default:
                    return 'glyphicon glyphicon-flash';
                }
            };

            // get the Filter Icon
            // FIXME: function could be put into a service
            
            
            /**
             * Returns the style (label color) associated with a specific
             * filter expression indetified by the parameter (or tag type) of the
             * filter expression. Negated expressions are treated differently: 
             * If the tag of the expression is shown in the Universal Search Box,
             * the label color is always set to red (isHighlightNegated = true).
             * @param {type} type
             * @param {type} isForCloseIcon wheter the icon is the close icon [x] or not
             * @param {type} isHighlightNegated highlight negated tags
             * @returns {String}
             */
            $scope.getTagStyle = function (type, isForCloseIcon, isHighlightNegated) {
                var prefix, plainType;
                // close icon style
                prefix = (isForCloseIcon === true) ? 'switchon-close-icon-' : '';
               
                // negated filter is RED
                if(type.indexOf('!') === 0 && isHighlightNegated === true) {
                    return prefix + 'label-danger';
                }
                
                plainType = type.substr(type.indexOf('!')+1);
                
                switch (plainType) {
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
                case FilterExpression.FILTER__POST_SEARCH_FILTERS:
                    return prefix + 'label-danger';
                case FilterExpression.FILTER__ACCESS_CONDITION:
                    return prefix + 'label-success';
                case FilterExpression.FILTER__FUNCTION:
                    return prefix + 'label-success';
                default:
                    return prefix + 'label-default';
                }
            };
        }
    ]
);