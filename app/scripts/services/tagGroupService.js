angular.module(
    'eu.water-switch-on.sip.services'
).factory('eu.water-switch-on.sip.services.TagGroupService',
    ['$resource',
        function ($resource) {
            'use strict';

            var tagResources, tagGroups, lazyLoadTagLists, getKeywordListFunction,
                getCountryListFunction;

            tagResources = {
                'cuashi-keyword': 'data/cuashiKeywords.json',
                'inspire-keyword': 'data/inspireKeywords.json',
                'inspire-topic': 'data/freeKeywords.json',
                'free-keyword': 'data/inspireTopics.json',
                'world-country': 'data/countriesWorld.json',
                'europe-country': 'data/countriesEurope.json'
            };

            tagGroups = {};

            lazyLoadTagLists = function (tagGroup, array) {
                // cached list does exist
                if (tagGroups.hasOwnProperty(tagGroup)) {
                    return tagGroups[tagGroup];
                }

                // list not cached but resource does exist
                if (tagResources.hasOwnProperty(tagGroup)) {
                    var tagResource = $resource(tagResources[tagGroup], {}, {
                        query: {
                            method: 'GET',
                            params: {
                            },
                            isArray: array
                        }
                    });

                    tagGroups[tagGroup] = tagResource.query();
                    return tagGroups[tagGroup];
                }

                console.warn('unkonow  tag group:' + tagGroup);
                //return array ? [] : {};
                return null;
            };

            getKeywordListFunction =
                function (keywordGroup) {
                    return lazyLoadTagLists(keywordGroup, true);
                };

            getCountryListFunction =
                function (countryGroup) {
                    return lazyLoadTagLists(countryGroup, false);
                };

            return {
                getKeywordList: getKeywordListFunction,
                getCountryList: getCountryListFunction
            };
        }]
    );
