angular.module(
        'eu.water-switch-on.sip.services'
        ).factory('eu.water-switch-on.sip.services.MockService',
        ['$resource',
            function ($resource) {
                'use strict';

                var searchService = $resource('data/resultSet.json', {});
                var cuashiKeywordsService = $resource('data/resultSet.json', {});

                var searchFunction = function ()
                {
                    return searchService.get();
                };

                var loadKeywordListFunction = function (keywordGroup)
                {
                    switch (keywordGroup) {
                        case 'cuashi':
                            return cuashiKeywordsService.get();
                        default:
                            return '[]';
                    }
                };

                return {
                    search: searchFunction,
                    loadKeywordList :loadKeywordListFunction
                };
            }
        ]);
