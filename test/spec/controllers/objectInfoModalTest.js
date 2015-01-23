describe('Object Info Modal Test Suite', function () {
    'use strict';
    
    describe('Object Info Modal Tests', function () {
        var $compile, $modal, $rootScope, $templateCache;
        
        beforeEach(function () {
            module('eu.water-switch-on.sip.controllers');
            module('ui.bootstrap.modal');
            module('mocks');
            module('templates');
        });
        
        beforeEach(inject(
            [
                '$modal',
                '$rootScope',
                '$compile',
                '$templateCache',
                function (modal, rootscope, compile, templateCache) {
                    $modal = modal;
                    $rootScope = rootscope;
                    $compile = compile;
                    $templateCache = templateCache;
                }
            ]
        ));
        
        it('object info - proper title', function () {
            var compiled, elem, mockdata, rootelem, scope, template;
            
            template = $templateCache.get('app/templates/object-info-modal-template.html');
            expect(template).toBeDefined();
            compiled = $compile(template);
            
            inject(function (_OBJECT_INFO_MODAL_TEST_DATA_OBJ1_) {
                mockdata = _OBJECT_INFO_MODAL_TEST_DATA_OBJ1_;
            });
            
            expect(mockdata).toBeDefined();
            
            scope = $rootScope.$new(true);
            scope.object = mockdata;
            
            rootelem = compiled(scope);
            scope.$digest();
            elem = rootelem.children("div > h3");
            expect(elem).toBeDefined();
            expect(elem.hasClass('modal-title')).toBeTruthy();
            expect(elem.text()).toEqual('Object info of CERA Gateway');
            
            inject(function (_OBJECT_INFO_MODAL_TEST_DATA_OBJ2_) {
                mockdata = _OBJECT_INFO_MODAL_TEST_DATA_OBJ2_;
            });
            
            expect(mockdata).toBeDefined();
            
            scope = $rootScope.$new(true);
            scope.object = mockdata;
            
            rootelem = compiled(scope);
            scope.$digest();
            elem = rootelem.children("div > h3");
            expect(elem).toBeDefined();
            expect(elem.hasClass('modal-title')).toBeTruthy();
            expect(elem.text()).toEqual('Object info of Global Land Cover Product (2005 to 2006)');
            
            inject(function (_OBJECT_INFO_MODAL_TEST_DATA_OBJ3_) {
                mockdata = _OBJECT_INFO_MODAL_TEST_DATA_OBJ3_;
            });
            
            expect(mockdata).toBeDefined();
            
            scope = $rootScope.$new(true);
            scope.object = mockdata;
            
            rootelem = compiled(scope);
            scope.$digest();
            elem = rootelem.children("div > h3");
            expect(elem).toBeDefined();
            expect(elem.hasClass('modal-title')).toBeTruthy();
            expect(elem.text()).toEqual('Object info of Portugal 2013 bathing water report');
            
            inject(function (_OBJECT_INFO_MODAL_TEST_DATA_OBJ4_) {
                mockdata = _OBJECT_INFO_MODAL_TEST_DATA_OBJ4_;
            });
            
            expect(mockdata).toBeDefined();
            
            scope = $rootScope.$new(true);
            scope.object = mockdata;
            
            rootelem = compiled(scope);
            scope.$digest();
            elem = rootelem.children("div > h3");
            expect(elem).toBeDefined();
            expect(elem.hasClass('modal-title')).toBeTruthy();
            expect(elem.text()).toEqual('Object info of Malta 2013 bathing water report');
        });
    });
});