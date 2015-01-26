describe('Text length filter Test Suite', function () {
    'use strict';
    
    describe('Text length filter Tests', function () {
        var txtLen;
        
        beforeEach(function () {
            module('eu.water-switch-on.sip.filters');
        });
        
        beforeEach(inject(
            [
                '$filter',
                function (filter) {
                    txtLen = filter('txtLen');
                }
            ]
        ));

        it('filter - no input', function () {
            try {
                txtLen(null);
                // fail if no exception
                expect(false).toBe(true);
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
        
        it('filter - no length', function () {
            try {
                txtLen('', null);
                // fail if no exception
                expect(false).toBe(true);
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
        
        it('filter - input = length', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
            output = txtLen(input, input.length);
            expect(output).toBe(input);
        });
        
        it('filter - input < length', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
            output = txtLen(input, input.length + 1);
            expect(output).toBe(input);
        });
        
        it('filter - exact true, default tpl', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
            output = txtLen(input, 15, true);
            expect(output.length).toBe(15);
            expect(output).toBe('Lorem ipsu[...]');
        });
        
        it('filter - exact true, custom tpl', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
            output = txtLen(input, 15, true, '..');
            expect(output.length).toBe(15);
            expect(output).toBe('Lorem ipsum d..');
        });
        
        it('filter - exact false, default tpl', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
            output = txtLen(input, 15, false);
            expect(output).toBe('Lorem [...]');
        });
        
        it('filter - exact false, custom tpl', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
            output = txtLen(input, 15, false, '..');
            expect(output).toBe('Lorem ipsum ..');
        });
        
        it('filter - exact false, custom tpl, no whitespace', function () {
            var input, output;
            
            input = 'Loremipsumdolorsitamet,consecteturadipiscingelit.';
            output = txtLen(input, 15, false, '..');
            expect(output).toBe('Loremipsumdol..');
        });
    });
});