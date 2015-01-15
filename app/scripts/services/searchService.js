angular.module(
        'de.cismet.switchon.sipApp.services'
        ).factory('de.cismet.switchon.sipApp.services.SearchService',
        ['$resource',
            function ($resource) {
                'use strict';

                var resultSet = $resource('http://crisma.cismet.de/icmm_api/CRISMA.worldstates/:action/', {
                    limit:100,
                    offset:0,
                    omitNullValues:true,
                    deduplicate:true
                }, {
                    search: {
                        method: 'GET',
                        params: {
                            query: '@query'
                        },
                        isArray:false
                    }
                });

                return resultSet;
            }
        ]);
