angular.module(
    'eu.water-switch-on.sip.services'
    ).factory('eu.water-switch-on.sip.services.SearchService',
    ['$resource', 'eu.water-switch-on.sip.services.Base64',
        '$q', '$interval', 'AppConfig',
        function ($resource, Base64, $q, $interval, AppConfig) {
            'use strict';
            //var resultSet = $resource('http://crisma.cismet.de/icmm_api/CRISMA.worldstates/:action/', 
            var config, authdata, searchResource, searchFunction;

            config = AppConfig.searchService;
            authdata = Base64.encode(config.username + ':' + config.password);

            searchResource = $resource(config.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results',
                {
                    limit: 20,
                    offset: 0,
                    omitNullValues: true,
                    deduplicate: true
                }, {
                    search: {
                        method: 'POST',
                        params: {
                            limit: '@limit',
                            offset: '@offset'
                        },
                        isArray: false,
                        headers: {
                            'Authorization': 'Basic ' + authdata
                        }
                    }
                });

            searchFunction = function (universalSearchString, limit, offset, progressCallback) {
                //TODO: hardcoded request url, domain
                var deferred, noop, queryObject, result, searchError, searchResult, searchSuccess,
                    timer, fakeProgress, filterTags, filterTagsSuccess, filterTagsError;

                noop = angular.noop;

                deferred = $q.defer();

                queryObject = {
                    'list': [{'key': 'Query', 'value': universalSearchString}]
                };

                // current value, max value, type, max = -1 indicates indeterminate
                (progressCallback || noop)(0, -1, 'success');

                fakeProgress = 0;
                timer = $interval (function () {
                    (progressCallback || noop)(fakeProgress, -1, 'success');
                    fakeProgress++;
                }, 100, 100);

                // result of this search operation
                result = {
                    $promise: deferred.promise,
                    $resolved: false
                };

                // result of the remote search operation (promise)
                searchResult = searchResource.search(
                    {
                        limit: limit,
                        offset: offset
                    },
                    queryObject
                );

                searchSuccess = function (data) {
                    var classesError, classesSuccess, nodes;

                    // searchResult.$collection
                    nodes = data.$collection;

                    classesSuccess = function (data) {
                        var allError, allSuccess, classCache, classname, entityResource, i, objectId, objsQ,
                            objPromise, singleProgressF, resolvedObjsCount, fakeProgressActive;

                        classCache = [];
                        for (i = 0; i < data.$collection.length; ++i) {
                            classCache[data.$collection[i].key] = data.$collection[i].value;
                        }

                        objsQ = [];
                        entityResource = $resource(
                            config.host + '/SWITCHON.:classname/:objId',
                            {
                                omitNullValues: true,
                                deduplicate: false
                            },
                            {
                                get: {
                                    method: 'GET',
                                    isArray: false,
                                    headers: {
                                        'Authorization': 'Basic ' + authdata
                                    }
                                }
                            }
                        );

                        if (!filterTags.$resolved) {
                            console.warn("filterTags not resolved");
                        }

                        resolvedObjsCount = 0;
                        // we stop fake progresss before 1st object has been resolved
                        // to minimze delay between fake and real progress steps
                        if (nodes.length > 0) {
                            fakeProgressActive = true;
                        } else {
                            $interval.cancel(timer);
                        }

                        // real progress starts at 100 and this then scaled to 200 by callback
                        (progressCallback || noop)(resolvedObjsCount, nodes.length, 'success');

                        singleProgressF = function () {
                            if (fakeProgressActive === true) {
                                fakeProgressActive = !$interval.cancel(timer);
                            }

                            (progressCallback || noop)(++resolvedObjsCount, nodes.length, 'success');
                        };

                        for (i = 0; i < nodes.length; ++i) {
                            classname = classCache[nodes[i].classId];
                            objectId = nodes[i].objectId;

                            objPromise = entityResource.get({
                                classname: classname,
                                objId: objectId
                            }).$promise;
                            objPromise['finally'](singleProgressF);

                            objsQ[i] = objPromise;
                        }

                        allSuccess = function (objs) {
                            var key;

                            // update nodes in search result
                            for (i = 0; i < nodes.length; ++i) {
                                nodes[i].object = objs[i];
                            }

                            // doing the same as ngResource: copying the results in the already returned obj (shallow)
                            for (key in searchResult) {
                                if (searchResult.hasOwnProperty(key) &&
                                        !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
                                    result[key] = searchResult[key];
                                }
                            }
                            
                            deferred.resolve(result);
                        };

                        allError = function (data) {
                            result.$error = 'cannot lookup objects';
                            result.$response = data;
                            result.$resolved = true;

                            deferred.reject(result);
                            $interval.cancel(timer);
                            (progressCallback || noop)(1, 1, 'error');
                        };

                        $q.all(objsQ).then(allSuccess, allError);
                    };

                    classesError = function (data) {
                        result.$error = 'cannot lookup class names';
                        result.$response = data;
                        result.$resolved = true;

                        deferred.reject(result);
                        $interval.cancel(timer);
                        (progressCallback || noop)(1, 1, 'error');
                    };

                    $resource(
                        config.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ClassNameSearch/results',
                        {},
                        {
                            exec: {
                                method: 'POST',
                                isArray: false,
                                headers: {
                                    'Authorization': 'Basic ' + authdata
                                }
                            }
                        }
                    ).exec(
                        {
                            'list': [{'key': 'Domain', 'value': 'SWITCHON'}]
                        }
                    ).$promise.then(classesSuccess, classesError);
                };

                searchError = function (data) {

                    result.$error = 'cannot search for resources';
                    result.$response = data;
                    result.$resolved = true;
                    deferred.reject(result);
                    $interval.cancel(timer);
                    (progressCallback || noop)(1, 1, 'error');
                };

                filterTagsSuccess = function (data) {
                    result.$tags = data;
                };

                filterTagsError = function (data) {
                    result.$error = 'cannot lookup filter tags';
                    result.$response = data;
                    result.$resolved = true;

                    deferred.reject(result);
                    $interval.cancel(timer);
                    (progressCallback || noop)(1, 1, 'error');
                };

                filterTags = $resource(
                    config.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.PostFilterTagsSearch/results',
                    {},
                    {
                        exec: {
                            method: 'POST',
                            isArray: false,
                            headers: {
                                'Authorization': 'Basic ' + authdata
                            }
                        }
                    }
                );

//                filterTags.exec(
//                    {
//                        'list': [{'key': 'Query', 'value': universalSearchString },
//                            {'key': 'FilterTagGroup', 'value': 'keyword'}]
//                    }
//                );
//
//                filterTags.$promise.then(filterTagsSuccess, filterTagsError);
                searchResult.$promise.then(searchSuccess, searchError);

                return result;
            };

            return {
                search: searchFunction
            };
        }
        ])

    .factory('eu.water-switch-on.sip.services.Base64', function () {
        /* jshint ignore:start */

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },
            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    console.error("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 !== 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 !== 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };

        /* jshint ignore:end */
    });
