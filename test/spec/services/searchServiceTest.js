describe('Search Service Test Suite', function () {
    'use strict';
    
    describe('Search Service Tests', function () {
        var $httpBackend, $templateCache, objs, search, AppConfig;
        
        beforeEach(function () {
            module('ngResource');
            module('eu.water-switch-on.sip.services');
            module('mocks');
            module('eu.water-switch-on.sip.factories');
        });
        
        beforeEach(inject(
            [
                '$httpBackend',
                '$templateCache',
                'eu.water-switch-on.sip.services.SearchService',
                'AppConfig',
                function (httpBackend, templateCache, SearchService, appConfig) {
                    $httpBackend = httpBackend;
                    $templateCache = templateCache;
                    search = SearchService.search;
                    AppConfig = appConfig;
                }
            ]
        ));

        beforeEach(function() {
            objs = [];
            
            inject(function (_SEARCH_SERVICE_TEST_OBJ102_) {
                objs[102] = _SEARCH_SERVICE_TEST_OBJ102_;
            });
            
            inject(function (_SEARCH_SERVICE_TEST_OBJ132_) {
                objs[132] = _SEARCH_SERVICE_TEST_OBJ132_;
            });
            
            inject(function (_SEARCH_SERVICE_TEST_OBJ99_) {
                objs[99] = _SEARCH_SERVICE_TEST_OBJ99_;
            });
            
            inject(function (_SEARCH_SERVICE_TEST_OBJ51_) {
                objs[51] = _SEARCH_SERVICE_TEST_OBJ51_;
            });
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        it('SearchService - no search string - proper reject', function () {
            var result;

            runs(function () {
                $httpBackend.expectPOST(
                    AppConfig.searchService.host+'/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                    {'list':[{'key':'Query', 'value':null}]}
                ).respond(500, 'illegal query');

                $httpBackend.expectPOST(
                    AppConfig.searchService.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.PostFilterTagsSearch/results',
                    {'list': [{'key': 'Query', 'value': null },
                                {'key': 'FilterTagGroups', 'value': '$total'}]}
                ).respond(500, 'illegal query');

                result = search(null);
                $httpBackend.flush();
            });

            waitsFor(function () {
                return result.$resolved;
            }, 'not properly updated $resolved', 500);

            runs(function () {
                expect(result.$error).toBe('cannot search for resources');
                expect(result.$response.data).toBe('illegal query');
                expect(result.$response.status).toBe(500);
            });
        });

        it('SearchService - proper search string', function () {
            var result;
    
            runs(function () {
                $httpBackend.expectPOST(
                    AppConfig.searchService.host+'/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                    {'list':[{'key':'Query', 'value':'testquery'}]}
                ).respond(500);
            
                $httpBackend.expectPOST(
                    AppConfig.searchService.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.PostFilterTagsSearch/results',
                    {'list': [{'key': 'Query', 'value': 'testquery' },
                                {'key': 'FilterTagGroups', 'value': '$total'}]}
                ).respond(500, 'illegal query');
            
            
                result = search('testquery');
                $httpBackend.flush();
            });
        });
        
        it('SearchService - proper class lookup error reject', function () {
            var result;
            
            $httpBackend.whenPOST(
                AppConfig.searchService.host+'/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                {'list':[{'key':'Query', 'value':'testquery'}]}
            ).respond(200, {$collection: []});

            
            runs(function () {
                $httpBackend.expectPOST(
                    AppConfig.searchService.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.PostFilterTagsSearch/results',
                    {'list': [{'key': 'Query', 'value': 'testquery' },
                                {'key': 'FilterTagGroups', 'value': '$total'}]}
                ).respond(200, null);
                $httpBackend.expectPOST(
                    AppConfig.searchService.host+'/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ClassNameSearch/results',
                    {'list':[{'key':'Domain', 'value':'SWITCHON'}]}
                ).respond(500, 'class lookup error');
                result = search('testquery');
                $httpBackend.flush();
            });
            
            waitsFor(function () {
                return result.$resolved;
            }, 'not properly updated $resolved', 500);
            
            runs(function () {
                expect(result.$error).toBe('cannot lookup class names');
                expect(result.$response.data).toBe('class lookup error');
                expect(result.$response.status).toBe(500);
            });
        });
        
        it('SearchService - proper object lookup error reject', function () {
            var result;
            
            $httpBackend.whenPOST(
                AppConfig.searchService.host+'/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                {'list':[{'key':'Query', 'value':'testquery'}]}
            ).respond(200, {$collection: [{LEGACY_CLASS_ID: 1, LEGACY_OBJECT_ID: 1}]});
            $httpBackend.whenPOST(
                AppConfig.searchService.host+'/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ClassNameSearch/results',
                {'list':[{'key':'Domain', 'value':'SWITCHON'}]}
            ).respond(200, {$collection: [{key: 1, value: 'testclass'}]});
    
            runs(function () {

                $httpBackend.expectPOST(
                    AppConfig.searchService.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.PostFilterTagsSearch/results',
                    {'list': [{'key': 'Query', 'value': 'testquery' },
                                {'key': 'FilterTagGroups', 'value': '$total'}]}
                ).respond(200, null);
            
                $httpBackend.expectGET(
                    AppConfig.searchService.host+'/SWITCHON.testclass/1?deduplicate=false&omitNullValues=true'
                ).respond(500, 'no obj');
                result = search('testquery');
                $httpBackend.flush();
            });
            
            waitsFor(function () {
                return result.$resolved;
            }, 'not properly updated $resolved', 500);
            
            runs(function () {
                expect(result.$error).toBe('cannot lookup objects');
                expect(result.$response.data).toBe('no obj');
                expect(result.$response.status).toBe(500);
            });
        });
        
        it('SearchService - proper result - 4 obj', function () {
            var result, resultSet;
            
            inject(function (_SEARCH_SERVICE_TEST_4NODES_) {
                resultSet = _SEARCH_SERVICE_TEST_4NODES_;
            });
            
            $httpBackend.whenPOST(
                AppConfig.searchService.host+'/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                {'list':[{'key':'Query', 'value':'testquery'}]}
            ).respond(200, resultSet);
            $httpBackend.whenPOST(
                AppConfig.searchService.host+'/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ClassNameSearch/results',
                {'list':[{'key':'Domain', 'value':'SWITCHON'}]}
            ).respond(200, {$collection: [{key: 27, value: 'testclass'}]});
    
            runs(function () {
                var i, objId;
                
                $httpBackend.expectPOST(
                    AppConfig.searchService.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.PostFilterTagsSearch/results',
                    {'list': [{'key': 'Query', 'value': 'testquery' },
                                {'key': 'FilterTagGroups', 'value': '$total'}]}
                ).respond(200, null);
                
                for(i = 0; i < resultSet.$collection.length; ++i) {
                    objId = resultSet.$collection[i].LEGACY_OBJECT_ID;
                    $httpBackend.expectGET(
                        AppConfig.searchService.host+'/SWITCHON.testclass/' + objId + '?deduplicate=false&omitNullValues=true'
                    ).respond(200, objs[objId]);
                }
                result = search('testquery');
                $httpBackend.flush();
            });
            
            waitsFor(function () {
                return result.$resolved;
            }, 'not properly updated $resolved', 500);
            
            runs(function () {
                expect(result.$collection).toBeDefined();
                expect(result.$collection.length).toBe(4);
                expect(result.$collection[0].object).toBeDefined();
                expect(result.$collection[1].object).toBeDefined();
                expect(result.$collection[2].object).toBeDefined();
                expect(result.$collection[3].object).toBeDefined();
            });
        });
        
        it('SearchService - 4 obj - proper progress indication', function () {
            var progress, result, resultSet;
            
            inject(function (_SEARCH_SERVICE_TEST_4NODES_) {
                resultSet = _SEARCH_SERVICE_TEST_4NODES_;
            });
            
            progress = [];
            
            $httpBackend.whenPOST(
                AppConfig.searchService.host+'/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                {'list':[{'key':'Query', 'value':'testquery'}]}
            ).respond(200, resultSet);
            $httpBackend.whenPOST(
                AppConfig.searchService.host+'/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ClassNameSearch/results',
                {'list':[{'key':'Domain', 'value':'SWITCHON'}]}
            ).respond(200, {$collection: [{key: 27, value: 'testclass'}]});
    
            runs(function () {
                var i, objId;
                
                $httpBackend.expectPOST(
                    AppConfig.searchService.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.PostFilterTagsSearch/results',
                    {'list': [{'key': 'Query', 'value': 'testquery' },
                                {'key': 'FilterTagGroups', 'value': '$total'}]}
                ).respond(200, null);
                
                for(i = 0; i < resultSet.$collection.length; ++i) {
                    objId = resultSet.$collection[i].LEGACY_OBJECT_ID;
                    $httpBackend.expectGET(
                        AppConfig.searchService.host+'/SWITCHON.testclass/' + objId + '?deduplicate=false&omitNullValues=true'
                    ).respond(200, objs[objId]);
                }
                result = search('testquery', null, null, null, function(val, max, type) {
                    progress.push({val: val, max: max, type: type})
                });
                $httpBackend.flush();
            });
            
            waitsFor(function () {
                return result.$resolved;
            }, 'not properly updated $resolved', 500);
            
            runs(function () {
                expect(progress.length).toBe(6);
                expect(progress[0]).toEqual({val: 0, max: -1, type: 'success'});
                expect(progress[1]).toEqual({val: 0, max: 4, type: 'success'});
                expect(progress[2]).toEqual({val: 1, max: 4, type: 'success'});
                expect(progress[3]).toEqual({val: 2, max: 4, type: 'success'});
                expect(progress[4]).toEqual({val: 3, max: 4, type: 'success'});
                expect(progress[5]).toEqual({val: 4, max: 4, type: 'success'});
            });
        });
                
        it('SearchService - proper result - 400 obj', function () {
            var result, resultSet;
            
            inject(function (_SEARCH_SERVICE_TEST_400NODES_) {
                resultSet = _SEARCH_SERVICE_TEST_400NODES_;
            });
            
            $httpBackend.whenPOST(
                AppConfig.searchService.host+'/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                {'list':[{'key':'Query', 'value':'testquery'}]}
            ).respond(200, resultSet);
            $httpBackend.whenPOST(
                AppConfig.searchService.host+'/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ClassNameSearch/results',
                {'list':[{'key':'Domain', 'value':'SWITCHON'}]}
            ).respond(200, {$collection: [{key: 27, value: 'testclass'}]});
    
            runs(function () {
                var i, objId;
                
                $httpBackend.expectPOST(
                    AppConfig.searchService.host + '/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.PostFilterTagsSearch/results',
                    {'list': [{'key': 'Query', 'value': 'testquery' },
                                {'key': 'FilterTagGroups', 'value': '$total'}]}
                ).respond(200, null);
                
                for(i = 0; i < resultSet.$collection.length; ++i) {
                    objId = resultSet.$collection[i].LEGACY_OBJECT_ID;
                    $httpBackend.expectGET(
                        AppConfig.searchService.host+'/SWITCHON.testclass/' + objId + '?deduplicate=false&omitNullValues=true'
                    ).respond(200, objs[objId]);
                }
                result = search('testquery');
                $httpBackend.flush();
            });
            
            waitsFor(function () {
                return result.$resolved;
            }, 'not properly updated $resolved', 500);
            
            runs(function () {
                var i;
                
                expect(result.$collection).toBeDefined();
                expect(result.$collection.length).toBe(400);
                
                for(i = 0; i < 400; ++i) {
                    expect(result.$collection[i].object).toBeDefined();
                }
            });
        });
    });
});