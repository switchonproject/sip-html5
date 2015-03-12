angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.categoriesDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.TagGroupService',
        'FilterExpression',
        function ($scope, TagGroupService, FilterExpression) {
            'use strict';

            $scope.collectionFilterExpression = new FilterExpression(FilterExpression.FILTER__COLLECTION,
                [], true, true, null, 'Data Collection');
            $scope.filterExpressions.addFilterExpression($scope.collectionFilterExpression);

            $scope.getCategories = function (category) {
                return TagGroupService.getCategoryList(category);
            };
        }]
);