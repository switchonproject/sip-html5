angular.module(
    'eu.water-switch-on.sip.services'
).factory(
    'eu.water-switch-on.sip.services.sessionService',
    [
        '$rootScope',
        function ($rootScope) {
            'use strict';

            var anonymousUsername, currentUser, getAnonymousUser, getCurrentUser, isAnonymousUser, setCurrentUser;

            anonymousUsername = 'Anonymous';

            getAnonymousUser = function () {
                return {
                    name: anonymousUsername
                };
            };

            getCurrentUser = function () {
                return currentUser;
            };

            isAnonymousUser = function (user) {
                if (user && user.name) {
                    return anonymousUsername === user.name;
                }

                return false;
            };

            setCurrentUser = function (user) {
                var oldUser;

                oldUser = currentUser;
                if (user) {
                    currentUser = user;
                    $rootScope.$broadcast('userChanged', oldUser, currentUser);
                } else {
                    throw 'invalid user: ' + user;
                }
            };

            setCurrentUser(getAnonymousUser());

            return {
                getAnonymousUser: getAnonymousUser,
                getCurrentUser: getCurrentUser,
                isAnonymousUser: isAnonymousUser
            };
        }
    ]
);