/* 
 * ***************************************************
 * 
 * cismet GmbH, Saarbruecken, Germany
 * 
 *               ... and it just works.
 * 
 * ***************************************************
 */

/*global angular*/
/*jshint camelcase: false */

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

            var i, tag, metadata;

            $scope.config = AppConfig.objectInfo;
            $scope.object = resource;
            $scope.representations = $scope.object.representation || [];
            $scope.keywordsXcuahsi = [];
            $scope.keywords = [];
            $scope.doiBadge = null;

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
            
            if($scope.object.metadata) {
                for (i = 0; i < $scope.object.metadata.length; ++i) {
                    metadata = $scope.object.metadata[i];
                    if(metadata.type.name === 'deposition meta-data') {
                        if(metadata.content) {
                            var depositionMetadata = angular.fromJson(metadata.content);
                            if(depositionMetadata && depositionMetadata.doi && depositionMetadata.links && depositionMetadata.links.badge) {
                                $scope.doiBadge = {
                                    'src' : depositionMetadata.links.badge,
                                    'href' : depositionMetadata.doi_url,
                                    'alt' : depositionMetadata.doi
                                };
                            }
                            break;
                        }  
                    }
                }
            } 
        }
    ]
);