angular.module(
    'eu.water-switch-on.sip.services'
).factory(
    'eu.water-switch-on.sip.services.masterToolbarService',
    [
        function () {
            'use strict';

            var canShow, isShowing, getCanShow, setCanShow, showing, toggleVisibility;

            canShow = false;
            showing = false;

            toggleVisibility = function (visible) {
                if (canShow) {
                    if (visible) {
                        showing = visible;
                    } else {
                        showing = !showing;
                    }
                } else {
                    showing = false;
                }

                return showing;
            };
            
            getCanShow = function () {
                return canShow;
            };
            
            setCanShow = function (can) {
                canShow = can;
            };
            
            isShowing = function () {
                return showing;
            };

            return {
                isShowing: isShowing,
                getCanShow: getCanShow,
                setCanShow: setCanShow,
                toggleVisibility: toggleVisibility
            };
        }
    ]
);