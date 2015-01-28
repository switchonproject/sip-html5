describe('Search Service Test Suite', function () {
    'use strict';
    
    describe('Search Service Tests', function () {
        var $httpBackend, $templateCache, objs, search;
        
        beforeEach(function () {
            module('ngResource');
            module('eu.water-switch-on.sip.services');
            module('mocks');
        });
        
        beforeEach(inject(
            [
                '$httpBackend',
                '$templateCache',
                'eu.water-switch-on.sip.services.SearchService',
                function (httpBackend, templateCache, SearchService) {
                    $httpBackend = httpBackend;
                    $templateCache = templateCache;
                    search = SearchService.search;
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
                    'http://localhost:8890/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                    {'list':[{'key':'Query', 'value':null}]}
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
                    'http://localhost:8890/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                    {'list':[{'key':'Query', 'value':'testquery'}]}
                ).respond(500);
                result = search('testquery');
                $httpBackend.flush();
            });
        });
        
        it('SearchService - proper class lookup error reject', function () {
            var result;
            
            $httpBackend.whenPOST(
                'http://localhost:8890/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                {'list':[{'key':'Query', 'value':'testquery'}]}
            ).respond(200, {$collection: []});
            
    
            runs(function () {
                $httpBackend.expectPOST(
                    'http://localhost:8890/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ClassNameSearch/results',
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
                'http://localhost:8890/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                {'list':[{'key':'Query', 'value':'testquery'}]}
            ).respond(200, {$collection: [{classId: 1, objectId: 1}]});
            $httpBackend.whenPOST(
                'http://localhost:8890/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ClassNameSearch/results',
                {'list':[{'key':'Domain', 'value':'SWITCHON'}]}
            ).respond(200, {$collection: [{key: 1, value: 'testclass'}]});
    
            runs(function () {
                $httpBackend.expectGET(
                    'http://localhost:8890/SWITCHON.testclass/1?deduplicate=true&omitNullValues=true'
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
                'http://localhost:8890/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                {'list':[{'key':'Query', 'value':'testquery'}]}
            ).respond(200, resultSet);
            $httpBackend.whenPOST(
                'http://localhost:8890/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ClassNameSearch/results',
                {'list':[{'key':'Domain', 'value':'SWITCHON'}]}
            ).respond(200, {$collection: [{key: 27, value: 'testclass'}]});
    
            runs(function () {
                var i, objId;
                
                for(i = 0; i < resultSet.$collection.length; ++i) {
                    objId = resultSet.$collection[i].objectId;
                    $httpBackend.expectGET(
                        'http://localhost:8890/SWITCHON.testclass/' + objId + '?deduplicate=true&omitNullValues=true'
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
                
        it('SearchService - proper result - 400 obj', function () {
            var result, resultSet;
            
            inject(function (_SEARCH_SERVICE_TEST_400NODES_) {
                resultSet = _SEARCH_SERVICE_TEST_400NODES_;
            });
            
            $httpBackend.whenPOST(
                'http://localhost:8890/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.MetaObjectUniversalSearchStatement/results?deduplicate=true&omitNullValues=true',
                {'list':[{'key':'Query', 'value':'testquery'}]}
            ).respond(200, resultSet);
            $httpBackend.whenPOST(
                'http://localhost:8890/searches/SWITCHON.de.cismet.cids.custom.switchon.search.server.ClassNameSearch/results',
                {'list':[{'key':'Domain', 'value':'SWITCHON'}]}
            ).respond(200, {$collection: [{key: 27, value: 'testclass'}]});
    
            runs(function () {
                var i, objId;
                
                for(i = 0; i < resultSet.$collection.length; ++i) {
                    objId = resultSet.$collection[i].objectId;
                    $httpBackend.expectGET(
                        'http://localhost:8890/SWITCHON.testclass/' + objId + '?deduplicate=true&omitNullValues=true'
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