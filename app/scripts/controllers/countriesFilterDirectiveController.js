angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.countriesFilterDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.TagGroupService',
        'FilterExpression',
        function ($scope, TagGroupService, FilterExpression) {
            'use strict';

            if (!$scope.filterExpressions.geo) {
                $scope.filterExpressions.geo = new FilterExpression('geo');
            }

            $scope.countryList = TagGroupService.getCountryList($scope.countryGroup);

            $scope.$watch('filterExpressions.geo.selectedCountry', function (newValue, oldValue) {
                if (newValue && (newValue !== oldValue) && newValue.length > 0
                        && $scope.countryList.hasOwnProperty(newValue[0])
                        && ($scope.filterExpressions.geo.value !== $scope.countryList[newValue[0]])) {
                    $scope.filterExpressions.geo.value = $scope.countryList[newValue[0]];
                    $scope.filterExpressions.geo.displayValue = newValue[0];
                    console.log(newValue[0] + ' <- ' + oldValue);
                }
            });
        }
    ]
);
