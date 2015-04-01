describe('Object Detail View Test Suite', function () {
    'use strict';
    
    describe('Object Detail View Tests', function () {
        var $compile, $filter, $httpBackend, $rootScope, $templateCache, fullObjs;
        
        beforeEach(function () {
            module('eu.water-switch-on.sip.controllers');
            module('mocks');
            module('templates');
        });
        
        beforeEach(inject(
            [
                '$rootScope',
                '$compile',
                '$templateCache',
                '$filter',
                '$httpBackend',
                function (rootscope, compile, templateCache, filter, httpBackend) {
                    $rootScope = rootscope;
                    $compile = compile;
                    $templateCache = templateCache;
                    $filter = filter;
                    $httpBackend = httpBackend;
                }
            ]
        ));

        beforeEach(function () {
            $httpBackend.whenGET('templates/object-representation-template.html').respond(
                200,
                $templateCache.get('app/templates/object-representation-template.html'));
        });

        beforeEach(function () {
            var i;
            
            fullObjs = [];
            
            i = 0;
            inject(function (_OBJECT_DETAIL_VIEW_TEST_DATA_OBJ1_) {
                fullObjs[i++] = _OBJECT_DETAIL_VIEW_TEST_DATA_OBJ1_;
            });

            inject(function (_OBJECT_DETAIL_VIEW_TEST_DATA_OBJ2_) {
                fullObjs[i++] = _OBJECT_DETAIL_VIEW_TEST_DATA_OBJ2_;
            });

            inject(function (_OBJECT_DETAIL_VIEW_TEST_DATA_OBJ3_) {
                fullObjs[i++] = _OBJECT_DETAIL_VIEW_TEST_DATA_OBJ3_;
            });

            inject(function (_OBJECT_DETAIL_VIEW_TEST_DATA_OBJ4_) {
                fullObjs[i++] = _OBJECT_DETAIL_VIEW_TEST_DATA_OBJ4_;
            });
        });
        
        it('object detail - proper title', function () {
            var elem, i, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];
                
                rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
                scope.$digest();
                elem = rootelem.find('h2');
                expect(elem).toBeDefined();
                expect(elem.text()).toEqual('Details of "' + fullObjs[i].name + '"');
            }
        });
        
//        it('object detail - proper name', function () {
//            var elem, i, rootelem, scope;
//            
//            for(i = 0; i < fullObjs.length; ++i) {
//                scope = $rootScope.$new(true);
//                scope.object = fullObjs[i];
//
//                rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
//                scope.$digest();
//                elem = rootelem.find(".row:nth-child(2)");
//                expect(elem).toBeDefined();
//                expect(elem.find('div label').text()).toEqual('Name:');
//                expect(elem.find('div:nth-child(2)').text().trim()).toEqual(fullObjs[i].name);
//            }
//        });
        
        it('object detail - proper description', function () {
            var elem, i, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];

                rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
                scope.$digest();
                elem = rootelem.find(".row:nth-child(2)");
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Description:');
                expect(elem.find('div:nth-child(2)').text().trim()).toEqual(fullObjs[i].description);
            }
        });
        
        it('object detail - proper keywords', function () {
            var elem, i, rootelem, scope, keywords, j, tag;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];
  
                keywords = [];
                for (j = 0; j < scope.object.tags.length; ++j ) {
                   if (scope.object.tags[j].taggroup.name.indexOf('keyword') === 0) {
                        keywords.push(scope.object.tags[j]);
                   }
                }

                rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
                scope.$digest();
                elem = rootelem.find(".row:nth-child(3)");
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Keywords:');
                expect(elem.find('div:nth-child(2) span.label.label-primary').length).toEqual(keywords.length);
            }
        });
        
        it('object detail - proper topic', function () {
            var elem, i, mockdata, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];

                rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
                scope.$digest();
                elem = rootelem.find(".row:nth-child(4)");
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Topic Category:');
                expect(elem.find('div:nth-child(2)').text().trim()).toEqual(fullObjs[i].topiccategory.name);
            }
            
            inject(function (_OBJECT_DETAIL_VIEW_TEST_DATA_OBJ_NOTOPIC_) {
                mockdata = _OBJECT_DETAIL_VIEW_TEST_DATA_OBJ_NOTOPIC_;
            });
            
//            scope = $rootScope.$new(true);
//            scope.object = mockdata;
//
//            rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
//            scope.$digest();
//            elem = rootelem.find(".row:nth-child(4)");
//            expect(elem).toBeDefined();
//            expect(elem.find('div label').text()).toEqual('Topic Category:');
//            expect(elem.find('div:nth-child(2)').text().trim()).toEqual("[none]");
        });
        
        it('object detail - proper point of contact', function () {
            var elem, i, mockdata, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];

                rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
                scope.$digest();
                elem = rootelem.find(".row:nth-child(5)");
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Point of Contact:');
                //expect(elem.find('div:nth-child(2)').text().trim()).toEqual(fullObjs[i].contact.name + ' (' + fullObjs[i].contact.organisation + ')');
            }
            
            inject(function (_OBJECT_DETAIL_VIEW_TEST_DATA_OBJ_NOCONTACTNAME_) {
                mockdata = _OBJECT_DETAIL_VIEW_TEST_DATA_OBJ_NOCONTACTNAME_;
            });
            
//            scope = $rootScope.$new(true);
//            scope.object = mockdata;
//
//            rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
//            scope.$digest();
//            elem = rootelem.find(".row:nth-child(5)");
//            expect(elem).toBeDefined();
//            expect(elem.find('div label').text()).toEqual('Point of Contact:');
//            expect(elem.find('div:nth-child(2)').text().trim()).toEqual("[none]" + ' (' + mockdata.contact.organisation + ')');
//            
//            inject(function (_OBJECT_DETAIL_VIEW_TEST_DATA_OBJ_NOORG_) {
//                mockdata = _OBJECT_DETAIL_VIEW_TEST_DATA_OBJ_NOORG_;
//            });
            
            scope = $rootScope.$new(true);
            scope.object = mockdata;

            rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
            scope.$digest();
            elem = rootelem.find(".row:nth-child(5)");
            expect(elem).toBeDefined();
            expect(elem.find('div label').text()).toEqual('Point of Contact:');
            //expect(elem.find('div:nth-child(2)').text().trim()).toEqual(mockdata.contact.name + ' (no organisation)');
            
            inject(function (_OBJECT_DETAIL_VIEW_TEST_DATA_OBJ_NOORG_NOCONTACTNAME_) {
                mockdata = _OBJECT_DETAIL_VIEW_TEST_DATA_OBJ_NOORG_NOCONTACTNAME_;
            });
            
//            scope = $rootScope.$new(true);
//            scope.object = mockdata;
//
//            rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
//            scope.$digest();
//            elem = rootelem.find(".row:nth-child(6)");
//            expect(elem).toBeDefined();
//            expect(elem.find('div label').text()).toEqual('Point of Contact:');
//            //expect(elem.find('div:nth-child(2)').text().trim()).toEqual('[none] (no organisation)');
        });
        
        it('object detail - proper temporal extent', function () {
            var elem, i, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];

                rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
                scope.$digest();
                elem = rootelem.find(".row:nth-child(6)");
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Temporal extent:');
                expect(elem.find('div:nth-child(2)').text().trim()).toEqual(
                        $filter('date')(fullObjs[i].fromdate , "dd.MM.yyyy HH:mm:ss 'GMT'Z")
                        + ' - '
                        + $filter('date')(fullObjs[i].todate , "dd.MM.yyyy HH:mm:ss 'GMT'Z"));
            }
        });
        
        it('object detail - proper last modification', function () {
            var elem, i, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];

                rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
                scope.$digest();
                elem = rootelem.find(".row:nth-child(9)");
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Last modified:');
                expect(elem.find('div:nth-child(2)').text().trim()).toEqual(
                        $filter('date')(fullObjs[i].lastmodificationdate , "dd.MM.yyyy HH:mm:ss 'GMT'Z"));
            }
        });
        
        it('object detail - proper access limitation', function () {
            var elem, i, mockdata, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];

                rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
                scope.$digest();
                elem = rootelem.find(".row:nth-child(11)");
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('Access limitations:');
                expect(elem.find('div:nth-child(2)').text().trim()).toEqual(fullObjs[i].accesslimitations.name);
            }
            
            inject(function (_OBJECT_DETAIL_VIEW_TEST_DATA_OBJ_NOACCESSLIMITATIONS_) {
                mockdata = _OBJECT_DETAIL_VIEW_TEST_DATA_OBJ_NOACCESSLIMITATIONS_;
            });
            
//            scope = $rootScope.$new(true);
//            scope.object = mockdata;
//
//            rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
//            scope.$digest();
//            elem = rootelem.find(".row:nth-child(8)");
//            expect(elem).toBeDefined();
//            expect(elem.find('div label').text()).toEqual('Access limitations:');
//            expect(elem.find('div:nth-child(2)').text().trim()).toEqual('unknown');
        });
        
        it('object detail - proper license', function () {
            var elem, i, mockdata, rootelem, scope;
            
            for(i = 0; i < fullObjs.length; ++i) {
                scope = $rootScope.$new(true);
                scope.object = fullObjs[i];

                rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
                scope.$digest();
                elem = rootelem.find(".row:nth-child(12)");
                expect(elem).toBeDefined();
                expect(elem.find('div label').text()).toEqual('License:');
                expect(elem.find('div:nth-child(2)').text().trim()).toEqual(fullObjs[i].licensestatement);
            }
            
            inject(function (_OBJECT_DETAIL_VIEW_TEST_DATA_OBJ_NOLICENSE_) {
                mockdata = _OBJECT_DETAIL_VIEW_TEST_DATA_OBJ_NOLICENSE_;
            });
            
//            scope = $rootScope.$new(true);
//            scope.object = mockdata;
//
//            rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
//            scope.$digest();
//            elem = rootelem.find(".row:nth-child(10)");
//            expect(elem).toBeDefined();
//            expect(elem.find('div label').text()).toEqual('License:');
//            expect(elem.find('div:nth-child(2)').text().trim()).toEqual('unknown');
        });
        
        
        
//        it('object detail - proper representation title', function () {
//            var elem, i, rootelem, scope;
//            
//            for(i = 0; i < fullObjs.length; ++i) {
//                scope = $rootScope.$new(true);
//                scope.object = fullObjs[i];
//
//                rootelem = $compile($templateCache.get('app/views/object-detail-view.html'))(scope);
//                scope.$digest();
//                elem = rootelem.find("h3");
//                expect(elem).toBeDefined();
//                expect(elem.text()).toEqual('Representations');
//            }
//        });
    });
});