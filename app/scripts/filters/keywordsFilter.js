/* 
 * ***************************************************
 * 
 * cismet GmbH, Saarbruecken, Germany
 * 
 *               ... and it just works.
 * 
 * ***************************************************
 */

angular.module('eu.water-switch-on.sip.filters').
        filter('keywordsString', function () {
            'use strict';
            return function (keywords) {
                var keywordString = '';
                
                if(keywords && keywords.length > 0) {
                    var arrayLength = keywords.length;
                    for (var i = 0; i < arrayLength; i++) {
                        keywordString += keywords[i].name;  
                        if(i < (arrayLength - 1)) {
                            keywordString += ', ';
                        }
                    }
                }

                return keywordString;
            };
        }
        );