angular.module(
    'eu.water-switch-on.sip.services'
).factory('eu.water-switch-on.sip.services.TagGroupService',
    ['$resource', 'eu.water-switch-on.sip.services.Base64', 'AppConfig',
        function ($resource, Base64, AppConfig) {
            'use strict';

            var tagResources, tagGroups, lazyLoadTagLists, getKeywordListFunction,
                getCountryListFunction, getCategoryListFunction, config, authdata,
                tagSearches, searchResource, searchTags;

            tagResources = {
                //'keyword-x-cuahsi': 'data/xcuahsiKeywords.json',
                //'keyword-x-cuahsi-toplevel': 'data/xcuahsiToplevelKeywords.json',
                'keyword-inspire': 'data/inspireKeywords.json',
                'topic-inspire': 'data/inspireTopics.json',
                'keyword-free': 'data/freeKeywords.json',
                'keyword-all': 'data/allKeywords.json',
                'country-world': 'data/countriesWorld.json',
                'country-europe': 'data/countriesEurope.json',
                'category-default': 'data/defaultCategories.json',
                'category-collection': 'data/collectionCategories.json'
            };

            tagSearches = {
                'keyword-x-cuahsi': 'X-CUAHSI'
            };

            // cached tag group lists
            tagGroups = {};

            config = AppConfig.searchService;
            authdata = Base64.encode(config.username + ':' + config.password);

            // remote legagy search core search
            // FIXME: limit and offset not implemented in legacy search!
            // currently, limit and offset are appended to the POST query parameter!
            searchResource = $resource(config.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ResourceTagsSearch/results',
                {
                    limit: 20,
                    offset: 0,
                    omitNullValues: true,
                    deduplicate: true
                }, {
                    search: {
                        method: 'POST',
                        params: {
                        },
                        isArray: false,
                        headers: {
                            'Authorization': 'Basic ' + authdata
                        }
                    }
                });

            searchTags = function (tagGroup) {
                var queryObject, searchResult;

                queryObject = {
                    'list': [{'key': 'taggroup', 'value': tagGroup}]
                };
                searchResult = searchResource.search(
                    {},
                    queryObject
                );
                return searchResult;
            };

            lazyLoadTagLists = function (tagGroup, array) {
                var intermetiateResult, tags, tagResource, i;
                // cached list does exist
                if (tagGroups.hasOwnProperty(tagGroup)) {
                    return tagGroups[tagGroup];
                }

                // list not cached but resource does exist
                if (tagResources.hasOwnProperty(tagGroup)) {
                    tagResource = $resource(tagResources[tagGroup], {}, {
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

                if (tagSearches.hasOwnProperty(tagGroup)) {
                    intermetiateResult = searchTags(tagSearches[tagGroup]);
                    tags = [];
                    tags.$resolved = false;
                    tags.$promise = intermetiateResult.$promise.then(function (resource) {
                        for (i = 0; i < resource.$collection.length; i++) {
                            tags.push(resource.$collection[i]);
                        }
                        tags.$resolved = true;
                        return tags;
                    });
                    tagGroups[tagGroup] = tags;
                    return tagGroups[tagGroup];
                }

                console.warn('unknown tag group:' + tagGroup);
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

            getCategoryListFunction =
                function (categoryGroup) {
                    return lazyLoadTagLists(categoryGroup, true);
                };

            return {
                getKeywordList: getKeywordListFunction,
                getCountryList: getCountryListFunction,
                getCategoryList: getCategoryListFunction
            };
        }]
    );
