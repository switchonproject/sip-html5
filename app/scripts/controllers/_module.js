// module initialiser for the controllers, shall always be named like that so that concat will pick it up first!
// however, the actual controller implementations shall be put in their own files
angular.module(
    'de.cismet.myAngularApp.controllers',
    [
        'de.cismet.myAngularApp.services'
    ]
);