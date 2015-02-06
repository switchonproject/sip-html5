angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.countriesFilterDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.TagGroupService',
        function ($scope, TagGroupService) {
            'use strict';

            $scope.filterExpression.selectedCountry = null;
            $scope.countryList = TagGroupService.getCountryList($scope.countryGroup);

            $scope.$watch('filterExpression.selectedCountry', function (newValue, oldValue) {
                if (newValue && (newValue !== oldValue) && newValue.length > 0
                        && $scope.countryList.hasOwnProperty(newValue[0])
                        && ($scope.filterExpression.value !== $scope.countryList[newValue[0]])) {
                    $scope.filterExpression.value = $scope.countryList[newValue[0]];
                    $scope.filterExpression.displayValue = newValue[0];
                }
            });
        }
    ]
);
