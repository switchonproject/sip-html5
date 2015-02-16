angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.usbDirectiveController',
    [
        '$scope',
        '$rootScope',
        '$modal',
        'eu.water-switch-on.sip.services.SearchService',
        'FilterExpression',
        function ($scope, $rootScope, $modal, SearchService, FilterExpression) {
            'use strict';

            var processCallback, status;

            status = {
                current: 0,
                max: 0,
                type: null
            };

            $scope.status = status;
            $scope.customFilterExpression = '';
            $scope.pattern = /(^[A-Za-z_\-]+):"([\s\S]+)"$/;

            processCallback = function (current, max, type) {
                status.max = max;
                status.type = type;

                // start of search (indeterminate)
                if (max === -1 && type === 'success') {
                    if ($scope.notificationFunction) {
                        $scope.notificationFunction({
                            message: 'Search for resources is in progress.',
                            type: 'info'
                        });
                    }

                    status.current = current;

                    // search completed
                } else if (current > 0 && current < max && type === 'success') {

                    //normalise  to 100%
                    status.current = (current / max * 100);

                } else if (current === max && type === 'success') {


                    if (current > 0) {
                        status.current = 100;
                        if ($scope.notificationFunction) {
                            $scope.notificationFunction({
                                message: 'Search completed, ' + current +
                                    (current > 1 ? ' ressource' : ' ressources') + ' found in the SWITCH-ON Meta-Data Repository',
                                type: 'success'
                            });
                        }
                    } else {
                        status.current = 0;
                        if ($scope.notificationFunction) {
                            $scope.notificationFunction({
                                message: 'Search completed, but no matching ressources found in the SWITCH-ON Meta-Data Repository',
                                type: 'warning'
                            });
                        }
                    }

                    if ($scope.progressModal) {
                        $scope.progressModal.close();
                    }
                    // search error   
                } else if (type === 'error') {
                    if ($scope.notificationFunction) {
                        $scope.notificationFunction({
                            message: 'Search could not be perfomed: ' + $scope.resultSet.$error,
                            type: 'danger'
                        });
                    }

                    if ($scope.progressModal) {
                        $scope.progressModal.close();
                    }
                }

            };

            $scope.clear = function () {
                $scope.filterExpressions.clear();
            };

            // Styling of Search Filters.. into CSS but how?
            $scope.getTagIcon = function (type) {
                switch (type) {
                case FilterExpression.FILTER__KEYWORD:
                    return 'glyphicon glyphicon-tags';
                case FilterExpression.FILTER__KEYWORD_CUASHI:
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

            $scope.getTagStyle = function (type) {
                switch (type) {
                case FilterExpression.FILTER__KEYWORD:
                    return 'label-success';
                case FilterExpression.FILTER__KEYWORD_CUASHI:
                    return 'label-info';
                case FilterExpression.FILTER__TOPIC:
                    return 'label-success';
                case FilterExpression.FILTER__GEO:
                    return 'label-success';
                case FilterExpression.FILTER__DATE_START:
                    return 'label-success';
                case FilterExpression.FILTER__DATE_END:
                    return 'label-success';
                case FilterExpression.FILTER__TEXT:
                    return 'label-info';
                case FilterExpression.FILTER__GEO_INTERSECTS:
                    return 'label-warning';
                case FilterExpression.FILTER__GEO_BUFFER:
                    return 'label-warning';
                case FilterExpression.FILTER__OPTION_LIMIT:
                    return 'label-warning';
                case FilterExpression.FILTER__CATEGORY:
                    return 'label-success';
                default:
                    return 'label-default';
                }
            };

            $scope.performSearch = function (searchForm) {
                // If form is invalid, return and let AngularJS show validation errors.
                // Disabled since an empty form is also invalid. FIXME!
                if (searchForm.$invalid) {
//                    $scope.notificationFunction({
//                        message: 'This filter expression is not valid. Try expression:"parameter", e.g. keyword:"water quality"',
//                        type: 'warning'
//                    });
//                    return;
                    console.log('This filter expression is not valid. Try expression:"parameter", e.g. keyword:"water quality"');
                }

                $scope.resultSet = SearchService.search($scope.filterExpressions.universalSearchString, 25, 0, processCallback);

                $scope.showProgress(status);
            };

            $scope.showProgress = function (status) {
                var modalScope;

                modalScope = $rootScope.$new(true);
                modalScope.status = status;

                $scope.progressModal = $modal.open({
                    templateUrl: 'templates/search-progress-modal-template.html',
                    scope: modalScope,
                    size: 'lg',
                    backdrop: 'static'
                });
                // issue #32 - check if the eror occurred before the dialog has actually been shown
                $scope.progressModal.opened.then(function () {
                    if (status.type === 'error') {
                        $scope.progressModal.close();
                    }
                });
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
                $scope.enumeratedTags = $scope.filterExpressions.enumerateTags();
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
