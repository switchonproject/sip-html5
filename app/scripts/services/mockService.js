angular.module(
    'eu.water-switch-on.sip.services'
).factory('eu.water-switch-on.sip.services.MockService',
    ['$resource',
        function ($resource) {
            'use strict';

            var searchService, cuahsiKeywordsService, inspireKeywordsService,
                inspireTopicsService, keywordsService, countriesEuropeService,
                countriesWorldService, searchFunction, loadKeywordListFunction,
                loadCountriesListFunction;

            searchService = $resource('data/resultSet.json', {});

            cuahsiKeywordsService = $resource('data/cuahsiKeywords.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                    },
                    isArray: true
                }
            });

            inspireKeywordsService = $resource('data/inspireKeywords.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                    },
                    isArray: true
                }
            });

            inspireTopicsService = $resource('data/inspireTopics.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                    },
                    isArray: true
                }
            });

            keywordsService = $resource('data/keywords.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                    },
                    isArray: true
                }
            });

            countriesEuropeService = $resource('data/countriesEurope.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                    },
                    isArray: false
                }
            });

            countriesWorldService = $resource('data/countriesWorld.json', {}, {
                query: {
                    method: 'GET',
                    params: {
                    },
                    isArray: false
                }
            });

            searchFunction =
                function () {
                    return searchService.get();
                };

            loadKeywordListFunction =
                function (keywordGroup) {
                    switch (keywordGroup) {
                    case 'cuahsi_keyword':
                        return cuahsiKeywordsService.query();
                    case 'inspire_keyword':
                        return inspireKeywordsService.query();
                    case 'inspire_topic':
                        return inspireTopicsService.query();
                    case 'keyword':
                        return keywordsService.query();
                    default:
                        return null;
                    }
                };

            loadCountriesListFunction =
                function (countryGroup) {
                    switch (countryGroup) {
                    case 'countries_world':
                        return countriesWorldService.query();
                    case 'countries_europe':
                        return countriesEuropeService.query();
                    default:
                        return null;
                    }
                };

            return {
                search: searchFunction,
                loadKeywordList: loadKeywordListFunction,
                loadCountriesList: loadCountriesListFunction
            };
        }
        ]);
