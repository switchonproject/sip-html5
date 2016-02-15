describe('Object Representation Test Suite', function () {
    'use strict';
    
    // the controller is really the object detail controller, maybe we should join the files to avoid confusion
    describe('Object Representation Controller Tests', function () {
        var $controller, $rootScope, AppConfig;
        
        beforeEach(function () {
            module('eu.water-switch-on.sip.controllers');
            module('eu.water-switch-on.sip.factories');
            module('mocks');
            module("ngSanitize");
        });
        
        beforeEach(inject(
            [
                '$controller',
                '$rootScope',
                function (controller, rootscope) {
                    $controller = controller;
                    $rootScope = rootscope;
                }
            ]
        ));
        
        it('ensure only first item is opened on init', function () {
            var mockdata, scope;
            
            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ1_) {
                mockdata = _OBJECT_REPRESENTATION_TEST_DATA_OBJ1_;
            });
            
            scope = $rootScope.$new(true);
            
            $controller(
                'eu.water-switch-on.sip.controllers.objectDetailController',
                {
                    $scope: scope,
                    resource: mockdata
                }
            );
    
            expect(scope.reps).toBeDefined();
            expect(scope.reps.length).toEqual(1);
            expect(scope.reps[0]._status).toBeDefined();
            expect(scope.reps[0]._status.open).toBeDefined();
            expect(scope.reps[0]._status.open).toEqual(true);
            
            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ_4REPS_) {
                mockdata = _OBJECT_REPRESENTATION_TEST_DATA_OBJ_4REPS_;
            });
            
            scope = $rootScope.$new(true);
            
            $controller(
                'eu.water-switch-on.sip.controllers.objectDetailController',
                {
                    $scope: scope,
                    resource: mockdata
                }
            );
    
            expect(scope.reps).toBeDefined();
            expect(scope.reps.length).toEqual(4);
            expect(scope.reps[0]._status).toBeDefined();
            expect(scope.reps[0]._status.open).toBeDefined();
            expect(scope.reps[0]._status.open).toEqual(true);
            expect(scope.reps[1]._status).toBeDefined();
            expect(scope.reps[1]._status.open).toBeDefined();
            expect(scope.reps[1]._status.open).toEqual(false);
            expect(scope.reps[2]._status).toBeDefined();
            expect(scope.reps[2]._status.open).toBeDefined();
            expect(scope.reps[2]._status.open).toEqual(false);
            expect(scope.reps[3]._status).toBeDefined();
            expect(scope.reps[3]._status.open).toBeDefined();
            expect(scope.reps[3]._status.open).toEqual(false);
            
            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ_NOREPS_) {
                mockdata = _OBJECT_REPRESENTATION_TEST_DATA_OBJ_NOREPS_;
            });
            
            scope = $rootScope.$new(true);
            
            $controller(
                'eu.water-switch-on.sip.controllers.objectDetailController',
                {
                    $scope: scope,
                    resource: mockdata
                }
            );
    
            expect(scope.reps).toBeDefined();
            expect(scope.reps.length).toEqual(0);
        });
    });
    
    describe('Object Download Modal Template Tests', function () {
        var $compile, $rootScope, $templateCache, fullObjs;
        
        beforeEach(function () {
            module('eu.water-switch-on.sip.controllers');
            module('ui.bootstrap.tpls');
            module('ui.bootstrap.modal');
            module('ui.bootstrap.accordion');
            module('mocks');
            module('templates');
        });
        
        beforeEach(inject(
            [
                '$rootScope',
                '$compile',
                '$templateCache',
                function (rootscope, compile, templateCache) {
                    $rootScope = rootscope;
                    $compile = compile;
                    $templateCache = templateCache;
                }
            ]
        ));

        beforeEach(function () {
            var i;
            
            fullObjs = [];
            
            i = 0;
            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ1_) {
                fullObjs[i++] = _OBJECT_REPRESENTATION_TEST_DATA_OBJ1_;
            });

            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ2_) {
                fullObjs[i++] = _OBJECT_REPRESENTATION_TEST_DATA_OBJ2_;
            });

            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ3_) {
                fullObjs[i++] = _OBJECT_REPRESENTATION_TEST_DATA_OBJ3_;
            });

            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ4_) {
                fullObjs[i++] = _OBJECT_REPRESENTATION_TEST_DATA_OBJ4_;
            });
        });

        it('object download - proper accordion heading', function () {
            var elem, i, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];
                scope.reps = fullObjs[i].representation;
                
                rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
                scope.$digest();
                // this is the generated accordion heading html
                elem = rootelem.find('*[accordion-transclude="heading"]');
                expect(elem).toBeDefined();
                expect(elem.html()).toContain(fullObjs[i].representation[0].name);
            }
        });
        
        it('object download - proper temporal resolution', function () {
            var elem, i, mockdata, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];
                scope.reps = scope.object.representation;

                rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
                scope.$digest();
                elem = rootelem.find('.row:eq(0)');
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Temporal resolution:');
                expect(elem.find('div:nth-child(2)').text().trim()).toEqual(fullObjs[i].representation[0].temporalresolution);
            }
            
            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ_NOTEMPORALRESOLUTION_) {
                mockdata = _OBJECT_REPRESENTATION_TEST_DATA_OBJ_NOTEMPORALRESOLUTION_;
            });
            
//            scope = $rootScope.$new(true);
//            scope.object = mockdata;
//            scope.reps = scope.object.representation;
//
//            rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
//            scope.$digest();
//            elem = rootelem.find('.row:eq(0)');
//            expect(elem).toBeDefined();
//            expect(elem.find('div label').text()).toEqual('Temporal resolution:');
//            expect(elem.find('div:nth-child(2)').text().trim()).toEqual('n/a');
        });
        
        it('object download - proper spatial resolution', function () {
            var elem, i, mockdata, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];
                scope.reps = scope.object.representation;

                rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
                scope.$digest();
                elem = rootelem.find('.row:eq(1)');
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Spatial resolution:');
                expect(elem.find('div:nth-child(2)').text().trim()).toEqual(fullObjs[i].representation[0].spatialresolution);
            }
            
            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ_NOSPATIALRESOLUTION_) {
                mockdata = _OBJECT_REPRESENTATION_TEST_DATA_OBJ_NOSPATIALRESOLUTION_;
            });
            
//            scope = $rootScope.$new(true);
//            scope.object = mockdata;
//            scope.reps = scope.object.representation;
//
//            rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
//            scope.$digest();
//            elem = rootelem.find('.row:eq(1)');
//            expect(elem).toBeDefined();
//            expect(elem.find('div label').text()).toEqual('Spatial resolution:');
//            expect(elem.find('div:nth-child(2)').text().trim()).toEqual('n/a');
        });
        
        it('object download - proper spatial scale', function () {
            var elem, i, mockdata, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];
            scope.reps = scope.object.representation;

                rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
                scope.$digest();
                elem = rootelem.find('.row:eq(2)');
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Spatial scale:');
                expect(elem.find('div:nth-child(2)').text().trim()).toEqual(fullObjs[i].representation[0].spatialscale);
            }
            
            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ_NOSPATIALSCALE_) {
                mockdata = _OBJECT_REPRESENTATION_TEST_DATA_OBJ_NOSPATIALSCALE_;
            });
            
//            scope = $rootScope.$new(true);
//            scope.object = mockdata;
//            scope.reps = scope.object.representation;
//
//            rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
//            scope.$digest();
//            elem = rootelem.find('.row:eq(2)');
//            expect(elem).toBeDefined();
//            expect(elem.find('div label').text()).toEqual('Spatial scale:');
//            expect(elem.find('div:nth-child(2)').text().trim()).toEqual('n/a');
        });
        
        it('object download - proper mime type', function () {
            var elem, i, mockdata, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];
                scope.reps = scope.object.representation;

                rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
                scope.$digest();
                elem = rootelem.find('.row:eq(3)');
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Mime type:');
                expect(elem.find('div:nth-child(2)').text().trim()).toEqual(fullObjs[i].representation[0].contenttype.name);
            }
            
            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ_NOMIMETYPE_) {
                mockdata = _OBJECT_REPRESENTATION_TEST_DATA_OBJ_NOMIMETYPE_;
            });
            
//            scope = $rootScope.$new(true);
//            scope.object = mockdata;
//            scope.reps = scope.object.representation;
//
//            rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
//            scope.$digest();
//            elem = rootelem.find('.row:eq(3)');
//            expect(elem).toBeDefined();
//            expect(elem.find('div label').text()).toEqual('Mime type:');
//            expect(elem.find('div:nth-child(2)').text().trim()).toEqual('n/a');
        });
        
        it('object download - proper data access function', function () {
            var elem, i, mockdata, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];
                scope.reps = scope.object.representation;

                rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
                scope.$digest();
                elem = rootelem.find('.row:eq(4)');
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Data access function:');
                expect(elem.find('div:nth-child(2)').text().trim()).toEqual(fullObjs[i].representation[0].function.name);
            }
            
            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ_NODATAACCESSFUNCTION_) {
                mockdata = _OBJECT_REPRESENTATION_TEST_DATA_OBJ_NODATAACCESSFUNCTION_;
            });
            
//            scope = $rootScope.$new(true);
//            scope.object = mockdata;
//            scope.reps = scope.object.representation;
//
//            rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
//            scope.$digest();
//            elem = rootelem.find('.row:eq(4)');
//            expect(elem).toBeDefined();
//            expect(elem.find('div label').text()).toEqual('Data access function:');
//            expect(elem.find('div:nth-child(2)').text().trim()).toEqual('n/a');
        });
        
        it('object download - proper data access link', function () {
            var elem, i, mockdata, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];
                scope.reps = scope.object.representation;

                rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
                scope.$digest();
                elem = rootelem.find('.row:eq(5)');
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Data access link:');
                //expect(elem.find('div:nth-child(2) a').text().trim()).toEqual(fullObjs[i].representation[0].contentlocation);
                expect(elem.find('div:nth-child(2) a').attr('href').trim()).toEqual(fullObjs[i].representation[0].contentlocation);
            }
            
            inject(function (_OBJECT_REPRESENTATION_TEST_DATA_OBJ_NODATAACCESSLINK_) {
                mockdata = _OBJECT_REPRESENTATION_TEST_DATA_OBJ_NODATAACCESSLINK_;
            });
            
//            scope = $rootScope.$new(true);
//            scope.object = mockdata;
//            scope.reps = scope.object.representation;
//
//            rootelem = $compile($templateCache.get('app/templates/object-representation-template.html'))(scope);
//            scope.$digest();
//            elem = rootelem.find('.row:eq(5)');
//            expect(elem).toBeDefined();
//            expect(elem.find('div label').text()).toEqual('Data access link:');
//            expect(elem.find('div:nth-child(2) a').text().trim()).toEqual('n/a');
        });
    });
});