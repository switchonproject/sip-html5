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
        }
    ]
);