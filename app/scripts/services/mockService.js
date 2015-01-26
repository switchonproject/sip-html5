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

                var searchFunction = function ()
                {
                    return searchService.get();
                };

                var loadKeywordListFunction = function (keywordGroup)
                {
                    switch (keywordGroup) {
                        case 'cuashi':
                            return cuashiKeywordsService.query();
                        default:
                            return '[]';
                    }
                };

                return {
                    search: searchFunction,
                    loadKeywordList: loadKeywordListFunction
                };
            }
        ]);
