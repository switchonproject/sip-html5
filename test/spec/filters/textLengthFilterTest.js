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
        
        it('filter - length 0, default tpl', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
            output = txtLen(input, 0);
            expect(output).toBe('[...]');
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
        
        it('filter - sentence true, length 0, default tpl, default sentence delim', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.';
            output = txtLen(input, 0, false, null, true);
            expect(output).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. [...]');
        });
        
        it('filter - sentence true, length 0, default tpl, default sentence delim, no delim match', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Donec a diam lectus ';
            output = txtLen(input, 0, false, null, true);
            expect(output).toBe('[...]');
        });

        it('filter - sentence true, length 80, default tpl, default sentence delim', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.';
            output = txtLen(input, 80, false, null, true);
            expect(output.length <= 80).toBeTruthy();
            expect(output).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. [...]');
        });

        it('filter - sentence true, length 90, default tpl, default sentence delim', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.';
            output = txtLen(input, 90, false, null, true);
            expect(output.length <= 90).toBeTruthy();
            expect(output).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. [...]');
        });

        it('filter - sentence true, length 83, default tpl, default sentence delim', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.';
            output = txtLen(input, 83, false, null, true);
            expect(output.length <= 83).toBeTruthy();
            expect(output).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. [...]');
        });

        it('filter - sentence true, length 82, default tpl, default sentence delim', function () {
            var input, output;
            
            input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.';
            output = txtLen(input, 82, false, null, true);
            expect(output.length <= 82).toBeTruthy();
            expect(output).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. [...]');
        });
    });
});