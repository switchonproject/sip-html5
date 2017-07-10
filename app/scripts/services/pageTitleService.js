angular.module(
        'eu.water-switch-on.sip.services'
        ).service(
        'pageTitle',
        [
            function () {
                'use strict';

                var title = 'SWITCH-ON Spatial Information Platform Client (BYOD) v1.4';
                return {
                    title: function () {
                        return title;
                    },
                    setTitle: function (newTitle) {
                        title = newTitle;
                    }
                };
            }
        ]
        );