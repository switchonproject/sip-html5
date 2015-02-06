angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.keywordFilterDirectiveController',
    [
        '$scope',
        'eu.water-switch-on.sip.services.TagGroupService',
        'FilterExpression',
        function ($scope, TagGroupService) {
            'use strict';
            $scope.keywordGroup = $scope.keywordGroup || 'keyword-free';
            $scope.keywordList = TagGroupService.getKeywordList($scope.keywordGroup);
        }
    ]
);