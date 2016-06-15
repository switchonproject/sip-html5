angular.module(
    'eu.water-switch-on.sip.controllers'
).controller(
    'eu.water-switch-on.sip.controllers.objectDetailController',
    [
        '$scope',
        // the router resolves this resource object
        'resource',
        'AppConfig',
        function ($scope, resource, AppConfig) {
            'use strict';

            var i, tag;

            $scope.config = AppConfig.objectInfo;
            $scope.object = resource;
            $scope.representations = $scope.object.representation || [];
            $scope.keywordsXcuahsi = [];
            $scope.keywords = [];

            for (i = 0; i < $scope.representations.length; ++i) {
                $scope.representations[i]._status = { // jshint ignore:line
                    open: (i === 0 ? true : false)
                };
            }

            if ($scope.object.tags) {
                for (i = 0; i < $scope.object.tags.length; ++i) {
                    tag = $scope.object.tags[i];
                    if (tag.taggroup.name.indexOf('keyword') === 0) {
                        if (tag.taggroup.name.indexOf('X-CUAHSI') !== -1) {
                            $scope.keywordsXcuahsi.push(tag);
                        } else {
                            $scope.keywords.push(tag);
                        }
                    }
                }
            }
        }
    ]
);