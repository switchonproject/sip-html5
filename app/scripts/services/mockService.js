angular.module(
        'eu.water-switch-on.sip.services'
        ).factory('eu.water-switch-on.sip.services.MockService',
        ['$resource',
            function ($resource) {
                'use strict';

                var service = $resource('data/resultSet.json', {});

                var searchFunction = function ()
                {
                    return service.get();
                };

                return {
                    search: searchFunction
                };
            }
        ]);
