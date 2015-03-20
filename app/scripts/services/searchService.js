angular.module(
    'eu.water-switch-on.sip.services'
).factory('eu.water-switch-on.sip.services.SearchService',
    ['$resource', 'eu.water-switch-on.sip.services.Base64',
        '$q', '$interval', 'AppConfig',
        function ($resource, Base64, $q, $interval, AppConfig) {
            'use strict';
            var config, authdata, entityResource, searchResource, searchFunction;

            config = AppConfig.searchService;
            authdata = Base64.encode(config.username + ':' + config.password);

            // remote legagy search core search
            // FIXME: limit and offset not implemented in legacy search!
            // currently, limit and offset are appended to the POST query parameter!
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

            // TODO: the deduplicate setting should be true by default
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

            searchFunction = function (universalSearchString, filterTagGroups, limit, offset, progressCallback) {
                var deferred, noop, queryObject, result, searchError, searchResult, searchSuccess,
                    timer, fakeProgress, filterTags, deferredFilterTags;

                noop = angular.noop;

                deferred = $q.defer();

                queryObject = {
                    'list': [{'key': 'Query', 'value': universalSearchString}]
                };

                // ensure that the mandatory $total group is requested
                // FIXME: workaround till legacy search core returns $total
                if (filterTagGroups && filterTagGroups.length > 0) {
                    if (filterTagGroups.indexOf('$total') === -1) {
                        filterTagGroups += ',$total';
                    }
                } else {
                    filterTagGroups = '$total';
                }

                // current value, max value, type, max = -1 indicates indeterminate
                (progressCallback || noop)(0, -1, 'success');

                fakeProgress = 1;
                timer = $interval(function () {
                    (progressCallback || noop)(fakeProgress, -1, 'success');
                    fakeProgress++;
                }, 100, 100);

                if (offset && limit && limit > 0 && offset > 0 && (offset %  limit !== 0)) {
                    offset = 0;
                }

                // result of this search operation
                // set a new promise 
                result = {
                    $promise: deferred.promise,
                    $resolved: false,
                    $offset: offset,
                    $limit: limit,
                    $length: 0
                };

                // result of the remote search operation (promise)
                // starting the search!
                // FIXME:   limit an offset GET parameters currently not evaluated 
                //          by the leagcy service. There we have to add them also
                //          to the queryObject.
                searchResult = searchResource.search(
                    {
                        limit: limit,
                        offset: offset
                    },
                    queryObject
                );

                // called when both search promises have been resolved
                searchSuccess = function (searchResultData) {
                    var classesError, classesSuccess, nodes;

                    // searchResult.$collection
                    nodes = searchResultData[0].$collection;

                    // classes resolved
                    classesSuccess = function (data) {
                        var allError, allSuccess, classCache, classname, i, objectId, objsQ,
                            objPromise, singleProgressF, resolvedObjsCount, fakeProgressActive;

                        classCache = [];
                        for (i = 0; i < data.$collection.length; ++i) {
                            classCache[data.$collection[i].key] = data.$collection[i].value;
                        }

                        objsQ = [];

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

                        // objects resolved
                        allSuccess = function (objs) {

                            var key, tagGroup, resultFilterTags;

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

                            // FIXME: Currently the post filter search is used
                            // to return the total number of search results as
                            // a workaround till $total is set by the leagy core
                            resultFilterTags = searchResultData[1].$collection;
                            if (resultFilterTags && resultFilterTags.length > 0) {
                                for (i = 0; i < resultFilterTags.length; i++) {
                                    tagGroup = resultFilterTags[i];
                                    if (tagGroup.key === '$total' && tagGroup.value && tagGroup.value.length === 1) {
                                        // 
                                        result.$total = parseInt(tagGroup.value[0].value, 10);
                                        // $total is not valid filter tag. remove it.
                                        resultFilterTags.splice(i, 1);
                                        break;
                                    }
                                }
                            }

                            result.$length = nodes.length;
                            if (!result.$total || result.$total === 0) {
                                result.$total = nodes.length;
                            }

                            result.$filterTags =  searchResultData[1].$collection;
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

                        // combine promises of all get objects calls
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

                if (filterTagGroups && filterTagGroups.length > 0) {
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

                    filterTags = filterTags.exec(
                        {
                            'list': [{'key': 'Query', 'value': universalSearchString },
                                {'key': 'FilterTagGroups', 'value': filterTagGroups}]
                        }
                    );
                } else {
                    // if no filter tags are requested, just return an empty collection
                    deferredFilterTags = $q.defer();
                    filterTags = {};
                    filterTags.$collection = [];
                    filterTags.$promise = deferredFilterTags.promise;
                    filterTags.$resolved = true;
                    deferredFilterTags.resolve(filterTags);
                }

                // combine search and filter tags promises
                $q.all([searchResult.$promise, filterTags.$promise]).then(searchSuccess, searchError);

                return result;
            };

            return {
                search: searchFunction,
                entityResource: entityResource
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
