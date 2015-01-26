angular.module(
        'eu.water-switch-on.sip.services'
        ).factory('eu.water-switch-on.sip.services.MockService',
        ['$resource',
            function ($resource) {
                'use strict';

                var searchService = $resource('data/resultSet.json', {});
                var cuashiKeywordsService = $resource('data/cuashiKeywords.json', {}, {
                    query: {
                        method: 'GET',
                        params: {
                        },
                        isArray: true}});

                var inspireKeywordsService = $resource('data/inspireKeywords.json', {}, {
                    query: {
                        method: 'GET',
                        params: {
                        },
                        isArray: true}});

                var inspireTopicsService = $resource('data/inspireTopics.json', {}, {
                    query: {
                        method: 'GET',
                        params: {
                        },
                        isArray: true}});
              
                var keywordsService = $resource('data/keywords.json', {}, {
                    query: {
                        method: 'GET',
                        params: {
                        },
                        isArray: true}});

                var searchFunction = function ()
                {
                    return searchService.get();
                };

                var loadKeywordListFunction = function (keywordGroup)
                {
                    switch (keywordGroup) {
                        case 'cuashi_keyword':
                            return cuashiKeywordsService.query();
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

                return {
                    search: searchFunction,
                    loadKeywordList: loadKeywordListFunction
                };
            }
        ]);
