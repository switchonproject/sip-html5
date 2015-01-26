angular.module(
    'eu.water-switch-on.sip.filters'
).filter(
    'txtLen', 
    function () {
        'use strict';

        /* filter to cut of text if it is longer than the given length. the filter has the following options
         * 
         * - input: string, the text input, if it is not a string the behaviour may not be as expected
         * - txtLen: integer, the length of the resulting string, including 'tpl'
         * - exact: boolean (default=false), if the result string should exactly match 'txtLen' or if it should try to 
         *   cut of the text after a white space character. In any case the resulting string will not exceed 'txtLen'.
         * - tpl: string (default='[...]', the string to use as indicator that the text has been cut off. If the text 
         *   is actually shorter than txtLen it will not be appended.
         * */
        return function(input, txtLen, exact, tpl) {
            var _exact, _tpl, match, out;
            
            if (!input || !txtLen) {
                throw 'Illegal filter usage: no input or txtLen';
            }

            if (txtLen >= input.length) {
                out = input;
            } else {
                if (exact === undefined || exact === null) {
                    _exact = false;
                } else {
                    _exact = exact;
                }

                if (tpl === undefined || tpl === null) {
                    _tpl = '[...]';
                } else {
                    _tpl = tpl;
                }
                
                out = input.substr(0, txtLen - _tpl.length);
                
                if (_exact) {
                    out += _tpl;
                } else {
                    match = out.match(/\s+\w*$/);
                    if (match) {
                        out = out.substr(0, match.index + 1) + _tpl;
                    } else {
                        out += _tpl;
                    }
                }
            }
            
            return out;
        };
    }
);
